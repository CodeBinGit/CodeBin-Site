'use client';

import { useEffect, useState, useTransition } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
  KeyRound,
  Link2,
  Lock,
  Settings2
} from 'lucide-react';
import { toast } from 'sonner';

import { cn, formatBytes } from '@/lib/format';
import { LANGUAGES } from '@/lib/languages';
import type { Visibility } from '@/lib/types';
import { LIMITS } from '@/lib/validation';

import { type ActionResult, createPaste, updatePaste } from '@/app/actions';

const CodeEditor = dynamic(() => import('./CodeEditor'), {
  ssr: false,
  loading: () => <div className="bg-surface/40 h-[420px] animate-pulse" />
});

const LANGUAGE_KEY = 'cb-language';

export interface PasteFormValues {
  title: string;
  description: string;
  code: string;
  language: string;
  visibility: Visibility;
}

interface Props {
  mode: 'create' | 'edit';
  signedIn: boolean;
  initial?: Partial<PasteFormValues>;
  /** Edit mode only. */
  pasteId?: string;
  hasPassword?: boolean;
}

const VISIBILITY: {
  value: Visibility;
  label: string;
  hint: string;
  icon: typeof Globe;
}[] = [
  {
    value: 'public',
    label: 'Public',
    hint: 'Listed on the home page',
    icon: Globe
  },
  {
    value: 'unlisted',
    label: 'Unlisted',
    hint: 'Only people with the link',
    icon: Link2
  },
  { value: 'private', label: 'Private', hint: 'Only you', icon: Lock }
];

export default function PasteForm({
  mode,
  signedIn,
  initial,
  pasteId,
  hasPassword
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [code, setCode] = useState(initial?.code ?? '');
  const [language, setLanguage] = useState(initial?.language ?? 'text');
  const [visibility, setVisibility] = useState<Visibility>(
    initial?.visibility ?? 'public'
  );
  const [customUrl, setCustomUrl] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [removePassword, setRemovePassword] = useState(false);
  const [errorField, setErrorField] = useState<string | undefined>();

  // Remember the last language used for new pastes.
  useEffect(() => {
    if (mode !== 'create' || initial?.language) return;
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring a browser-only preference
      if (saved && LANGUAGES.some(l => l.id === saved)) setLanguage(saved);
    } catch {}
  }, [mode, initial?.language]);

  const changeLanguage = (value: string) => {
    setLanguage(value);
    if (mode === 'create') {
      try {
        localStorage.setItem(LANGUAGE_KEY, value);
      } catch {}
    }
  };

  const submit = () => {
    if (pending) return;
    if (!code.trim()) {
      setErrorField('code');
      toast.error('Add some code before saving.');
      return;
    }
    setErrorField(undefined);

    startTransition(async () => {
      const input = {
        title,
        description,
        code,
        language,
        visibility,
        customUrl: mode === 'create' ? customUrl : undefined,
        password,
        removePassword
      };
      let result: ActionResult;
      try {
        result =
          mode === 'create'
            ? await createPaste(input)
            : await updatePaste(pasteId!, input);
      } catch {
        result = { ok: false, error: 'Could not reach the server. Try again.' };
      }

      if (!result.ok) {
        setErrorField(result.field);
        toast.error(result.error);
        return;
      }
      toast.success(mode === 'create' ? 'Paste created' : 'Changes saved');
      router.push(`/pastes/${result.pasteId}`);
      router.refresh();
    });
  };

  const lines = code ? code.split('\n').length : 0;
  const bytes = new TextEncoder().encode(code).length;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
      className="space-y-4"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            className="input h-11 sm:text-[15px]"
            placeholder="Untitled paste"
            value={title}
            maxLength={LIMITS.title}
            onChange={e => setTitle(e.target.value)}
            aria-invalid={errorField === 'title'}
          />
        </div>
        <div>
          <label htmlFor="language" className="sr-only">
            Language
          </label>
          <select
            id="language"
            className="input h-11"
            value={language}
            onChange={e => changeLanguage(e.target.value)}
          >
            {LANGUAGES.map(l => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          id="description"
          className="input min-h-[44px] resize-y"
          rows={1}
          placeholder="Add a description (optional)"
          value={description}
          maxLength={LIMITS.description}
          onChange={e => setDescription(e.target.value)}
          aria-invalid={errorField === 'description'}
        />
      </div>

      <div
        className={cn(
          'card overflow-hidden transition-colors',
          errorField === 'code' && 'border-danger/60'
        )}
      >
        <div className="border-line bg-surface-2/60 flex items-center gap-3 border-b px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="text-muted truncate font-mono text-xs">
            {title.trim() || 'untitled'}.
            {LANGUAGES.find(l => l.id === language)?.ext}
          </span>
          <span className="text-subtle ml-auto shrink-0 font-mono text-xs">
            {lines} {lines === 1 ? 'line' : 'lines'} · {formatBytes(bytes)}
          </span>
        </div>
        <CodeEditor
          value={code}
          onChange={setCode}
          language={language}
          onSubmit={submit}
        />
      </div>

      <div className="card grid gap-5 p-4 sm:p-5 lg:grid-cols-[auto_1fr_1fr]">
        <fieldset>
          <legend className="label">Visibility</legend>
          <div className="bg-bg border-line flex rounded-lg border p-1 sm:inline-flex">
            {VISIBILITY.map(({ value, label, hint, icon: Icon }) => {
              const disabled = value === 'private' && !signedIn;
              const active = visibility === value;
              return (
                <label
                  key={value}
                  title={disabled ? 'Sign in to create private pastes' : hint}
                  className={cn(
                    'flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5 text-sm transition-colors sm:h-8 sm:flex-none sm:px-3',
                    active
                      ? 'bg-surface-3 text-fg shadow-sm'
                      : 'text-muted hover:text-fg',
                    disabled && 'cursor-not-allowed opacity-40 hover:text-muted'
                  )}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value={value}
                    checked={active}
                    disabled={disabled}
                    onChange={() => setVisibility(value)}
                    className="sr-only"
                  />
                  <Icon className="size-3.5" />
                  {label}
                </label>
              );
            })}
          </div>
          <p className="text-subtle mt-2 text-xs">
            {VISIBILITY.find(v => v.value === visibility)?.hint}
          </p>
        </fieldset>

        {mode === 'create' ? (
          <div>
            <label htmlFor="custom-url" className="label">
              Custom URL
            </label>
            <div
              className={cn(
                'input flex items-center gap-0 p-0 focus-within:ring-4',
                'focus-within:border-accent/70 focus-within:ring-accent/20',
                errorField === 'customUrl' && 'border-danger/70',
                !signedIn && 'opacity-50'
              )}
            >
              <span className="text-subtle border-line flex h-full items-center border-r pr-2 pl-3 text-sm whitespace-nowrap">
                /pastes/
              </span>
              <input
                id="custom-url"
                className="placeholder:text-subtle h-full w-full min-w-0 bg-transparent px-2.5 text-base outline-none sm:text-sm"
                placeholder={signedIn ? 'my-snippet' : 'Sign in to customize'}
                disabled={!signedIn}
                value={customUrl}
                maxLength={64}
                onChange={e => setCustomUrl(e.target.value.replace(/\s/g, '-'))}
              />
            </div>
            {!signedIn && (
              <p className="text-subtle mt-2 text-xs">
                <Link href="/sign-in" className="text-accent hover:underline">
                  Sign in
                </Link>{' '}
                to pick your own link and create private pastes.
              </p>
            )}
          </div>
        ) : (
          <div className="hidden lg:block" />
        )}

        <div>
          <label htmlFor="password" className="label">
            {mode === 'edit' && hasPassword ? 'Change password' : 'Password'}
          </label>
          <div className="relative">
            <KeyRound className="text-subtle pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="input pr-10 pl-9"
              placeholder={
                mode === 'edit' && hasPassword
                  ? 'Leave blank to keep current'
                  : 'Optional'
              }
              value={password}
              maxLength={LIMITS.password}
              disabled={removePassword}
              onChange={e => setPassword(e.target.value)}
              aria-invalid={errorField === 'password'}
            />
            <button
              type="button"
              className="text-subtle hover:text-fg absolute top-1/2 right-2 -translate-y-1/2 p-1"
              onClick={() => setShowPassword(s => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {mode === 'edit' && hasPassword && (
            <label className="text-muted mt-2 flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={removePassword}
                onChange={e => setRemovePassword(e.target.checked)}
                className="accent-accent-strong"
              />
              Remove password protection
            </label>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-subtle hidden items-center gap-1.5 text-xs sm:flex">
          <Settings2 className="size-3.5" />
          Press <kbd className="kbd">Ctrl</kbd>+<kbd className="kbd">Enter</kbd>{' '}
          in the editor to {mode === 'create' ? 'create' : 'save'}
        </p>
        <div className="flex gap-2 sm:ml-auto">
          {mode === 'edit' && (
            <Link
              href={`/pastes/${pasteId}`}
              className="btn btn-secondary btn-lg flex-1 sm:flex-none"
            >
              Cancel
            </Link>
          )}
          <button
            type="submit"
            className="btn btn-primary btn-lg flex-1 sm:flex-none"
            disabled={pending}
          >
            {pending
              ? mode === 'create'
                ? 'Creating…'
                : 'Saving…'
              : mode === 'create'
                ? 'Create paste'
                : 'Save changes'}
            {!pending && <ArrowRight className="size-4" />}
          </button>
        </div>
      </div>
    </form>
  );
}
