'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Eye, EyeOff, KeyRound, LockKeyhole } from 'lucide-react';

import { unlockPaste } from '@/app/actions';

export default function PasswordGate({ pasteId }: { pasteId: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    startTransition(async () => {
      const result = await unlockPaste(pasteId, password);
      if (result.ok) router.refresh();
      else setError(result.error);
    });
  };

  return (
    <div className="card mx-auto max-w-md p-6 text-center sm:p-8">
      <div className="bg-accent-soft text-accent mx-auto mb-4 grid size-12 place-items-center rounded-xl">
        <LockKeyhole className="size-6" />
      </div>
      <h1 className="text-xl font-semibold">
        This paste is password protected
      </h1>
      <p className="text-muted mt-1 text-sm">Enter the password to view it.</p>

      <form onSubmit={submit} className="mt-6 space-y-3 text-left">
        <div className="relative">
          <KeyRound className="text-subtle pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <input
            type={show ? 'text' : 'password'}
            className="input h-11 pr-10 pl-9"
            placeholder="Password"
            autoFocus
            autoComplete="off"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setError(null);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? 'password-error' : undefined}
          />
          <button
            type="button"
            className="text-subtle hover:text-fg absolute top-1/2 right-2 -translate-y-1/2 p-1"
            onClick={() => setShow(s => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {error && (
          <p id="password-error" className="text-danger text-sm">
            {error}
          </p>
        )}
        <button
          className="btn btn-primary btn-lg w-full"
          disabled={pending || !password}
        >
          {pending ? 'Checking…' : 'Unlock paste'}
        </button>
      </form>
    </div>
  );
}
