import Link from 'next/link';

import { auth } from '@clerk/nextjs/server';
import { Globe, Sparkles } from 'lucide-react';

import { normalizeLanguage } from '@/lib/languages';
import { getPaste, getRecentPublicPastes } from '@/lib/pastes';
import { getAccess } from '@/lib/security';

import PasteForm, { type PasteFormValues } from '@/components/editor/PasteForm';
import { LanguageChip } from '@/components/paste/Badges';

async function getForkValues(
  forkId: string | undefined,
  userId: string | null
): Promise<Partial<PasteFormValues> | undefined> {
  if (!forkId) return undefined;
  const paste = await getPaste(forkId);
  if (!paste || (await getAccess(paste, userId)) !== 'ok') return undefined;
  return {
    title: paste.title ? `Fork of ${paste.title}`.slice(0, 120) : '',
    description: paste.description ?? '',
    code: paste.code,
    language: normalizeLanguage(paste.language),
    visibility: 'public'
  };
}

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ fork?: string }>;
}) {
  const { fork } = await searchParams;
  const { userId } = await auth();
  const [recent, forkValues] = await Promise.all([
    getRecentPublicPastes(8),
    getForkValues(fork, userId)
  ]);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-14 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(154_107_245/0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {forkValues ? 'Fork a paste' : 'Share code in seconds.'}
          </h1>
          <p className="text-muted mt-2 text-[15px] leading-relaxed">
            Create, edit, customize and share your code snippets with friends,
            family and co-workers in just a few clicks.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <PasteForm
            key={fork ?? 'new'}
            mode="create"
            signedIn={!!userId}
            initial={forkValues}
          />

          <aside className="space-y-4">
            <section className="card overflow-hidden">
              <h2 className="border-line flex items-center gap-2 border-b px-4 py-3 text-sm font-semibold">
                <Globe className="text-accent size-4" /> Latest public pastes
              </h2>
              {recent.length === 0 ? (
                <p className="text-muted px-4 py-6 text-sm">
                  No public pastes yet. Be the first!
                </p>
              ) : (
                <ul className="divide-line divide-y">
                  {recent.map(paste => (
                    <li key={paste.pasteId}>
                      <Link
                        href={`/pastes/${paste.pasteId}`}
                        className="hover:bg-surface-2/70 group block px-4 py-3 transition-colors"
                      >
                        <p className="group-hover:text-accent truncate text-sm font-medium transition-colors">
                          {paste.title || 'Untitled paste'}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <LanguageChip language={paste.language} />
                          <span className="text-subtle text-xs">
                            {paste.timeAgo}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {!userId && (
              <section className="card bg-[linear-gradient(160deg,rgb(154_107_245/0.14),transparent_60%)] p-5">
                <Sparkles className="text-accent size-5" />
                <h2 className="mt-3 font-semibold">Do more with an account</h2>
                <ul className="text-muted mt-2 space-y-1 text-sm">
                  <li>• Private pastes only you can see</li>
                  <li>• Custom paste URLs</li>
                  <li>• Edit and manage your pastes</li>
                </ul>
                <div className="mt-4 flex gap-2">
                  <Link href="/sign-up" className="btn btn-primary btn-sm">
                    Create account
                  </Link>
                  <Link href="/sign-in" className="btn btn-secondary btn-sm">
                    Sign in
                  </Link>
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
