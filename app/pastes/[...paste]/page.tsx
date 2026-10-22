import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { Lock, UserRound } from 'lucide-react';

import {
  formatBytes,
  fullDate,
  pasteIdFromSegments,
  timeAgo
} from '@/lib/format';
import { highlight } from '@/lib/highlight';
import { getLanguage } from '@/lib/languages';
import { getPaste, visibilityOf } from '@/lib/pastes';
import { getAccess } from '@/lib/security';
import { getAuthor } from '@/lib/users';

import {
  LanguageChip,
  PasswordChip,
  VisibilityChip
} from '@/components/paste/Badges';
import PasswordGate from '@/components/paste/PasswordGate';
import PasteActions from '@/components/paste/PasteActions';

type Params = { params: Promise<{ paste: string[] }> };

async function load(params: Params['params']) {
  const { paste: segments } = await params;
  const pasteId = pasteIdFromSegments(segments);
  return getPaste(pasteId);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const paste = await load(params);
  if (!paste) return { title: 'Paste not found' };
  if (paste.private)
    return { title: 'Private paste', robots: { index: false } };

  const title = paste.title?.trim() || 'Untitled paste';
  const description =
    paste.description?.trim() ||
    `A ${getLanguage(paste.language).label} paste on Code Bin.`;
  return {
    title,
    description,
    openGraph: { title, description },
    robots: { index: visibilityOf(paste) === 'public' }
  };
}

export default async function PastePage({ params }: Params) {
  const paste = await load(params);
  if (!paste) notFound();

  const { userId } = await auth();
  const access = await getAccess(paste, userId);

  if (access === 'private') {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="card p-8">
          <div className="bg-surface-2 mx-auto mb-4 grid size-12 place-items-center rounded-xl">
            <Lock className="text-muted size-6" />
          </div>
          <h1 className="text-xl font-semibold">This paste is private</h1>
          <p className="text-muted mt-1 text-sm">Only its owner can view it.</p>
          {!userId && (
            <Link href="/sign-in" className="btn btn-primary mt-6">
              Sign in
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (access === 'locked') {
    return (
      <div className="px-4 py-24">
        <PasswordGate pasteId={paste.pasteId} />
      </div>
    );
  }

  const language = getLanguage(paste.language);
  const displayCode = paste.code.replace(/\n+$/, '');
  const [html, author] = await Promise.all([
    highlight(displayCode, paste.language),
    paste.userId ? getAuthor(paste.userId) : null
  ]);
  const title = paste.title?.trim() || 'Untitled paste';
  const lines = displayCode.split('\n').length;
  const filename = `${(paste.title?.trim() || paste.pasteId).replace(/[^\w.-]+/g, '_')}.${language.ext}`;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight break-words sm:text-3xl">
          {title}
        </h1>
        {paste.description?.trim() && (
          <p className="text-muted mt-2 max-w-3xl leading-relaxed whitespace-pre-line">
            {paste.description}
          </p>
        )}
        <div className="text-muted mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {author ? (
            <Link
              href={`/user/pastes/${author.id}`}
              className="hover:text-fg flex items-center gap-2 transition-colors"
            >
              {author.imageUrl ? (
                <Image
                  src={author.imageUrl}
                  alt=""
                  width={22}
                  height={22}
                  className="rounded-full"
                />
              ) : (
                <UserRound className="size-4" />
              )}
              {author.name}
            </Link>
          ) : (
            <span className="flex items-center gap-2">
              <UserRound className="size-4" /> Anonymous
            </span>
          )}
          <time dateTime={paste.createdAt} title={fullDate(paste.createdAt)}>
            {timeAgo(paste.createdAt)}
          </time>
          <div className="flex flex-wrap gap-1.5">
            <LanguageChip language={paste.language ?? 'text'} />
            <VisibilityChip visibility={visibilityOf(paste)} />
            {paste.pastePassword && <PasswordChip />}
          </div>
        </div>
      </header>

      <section className="card overflow-hidden">
        <div className="border-line bg-surface-2/60 flex flex-wrap items-center gap-x-3 gap-y-1 border-b py-1.5 pr-1.5 pl-4">
          <span className="text-muted truncate font-mono text-xs">
            {filename}
          </span>
          <span className="text-subtle font-mono text-xs">
            {lines} {lines === 1 ? 'line' : 'lines'} ·{' '}
            {formatBytes(Buffer.byteLength(paste.code))}
          </span>
          <div className="ml-auto">
            <PasteActions
              pasteId={paste.pasteId}
              code={paste.code}
              filename={filename}
              isOwner={!!userId && paste.userId === userId}
            />
          </div>
        </div>
        <div className="code-view" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </div>
  );
}
