import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';

import { pasteIdFromSegments } from '@/lib/format';
import { normalizeLanguage } from '@/lib/languages';
import { getPaste, visibilityOf } from '@/lib/pastes';

import PasteForm from '@/components/editor/PasteForm';

export const metadata: Metadata = {
  title: 'Edit paste',
  robots: { index: false }
};

export default async function EditPastePage({
  params
}: {
  params: Promise<{ paste: string[] }>;
}) {
  const { paste: segments } = await params;
  const pasteId = pasteIdFromSegments(segments);
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const paste = await getPaste(pasteId);

  // Treat other people's pastes as missing so their existence isn't leaked.
  if (!paste || paste.userId !== userId) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <Link
        href={`/pastes/${paste.pasteId}`}
        className="text-muted hover:text-fg mb-4 inline-flex items-center gap-1.5 text-sm"
      >
        <ArrowLeft className="size-4" /> Back to paste
      </Link>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        Edit paste
      </h1>
      <PasteForm
        mode="edit"
        signedIn
        pasteId={paste.pasteId}
        hasPassword={!!paste.pastePassword}
        initial={{
          title: paste.title ?? '',
          description: paste.description ?? '',
          code: paste.code,
          language: normalizeLanguage(paste.language),
          visibility: visibilityOf(paste)
        }}
      />
    </div>
  );
}
