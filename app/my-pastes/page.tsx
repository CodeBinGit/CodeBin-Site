import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { auth, currentUser } from '@clerk/nextjs/server';
import { Plus } from 'lucide-react';

import { getPastesByUser } from '@/lib/pastes';

import PasteList from '@/components/paste/PasteList';

export const metadata: Metadata = {
  title: 'My pastes',
  description: 'View your public, private and unlisted pastes.'
};

export default async function MyPastesPage() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const [user, pastes] = await Promise.all([
    currentUser(),
    getPastesByUser(userId, { publicOnly: false })
  ]);
  const name =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.username ||
    'You';

  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <header className="mb-8 flex items-center gap-4">
        {user?.imageUrl && (
          <Image
            src={user.imageUrl}
            alt=""
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">
            My pastes
          </h1>
          <p className="text-muted text-sm">
            {name} · {pastes.length} {pastes.length === 1 ? 'paste' : 'pastes'}
          </p>
        </div>
        <Link
          href="/"
          className="btn btn-primary ml-auto"
          aria-label="New paste"
        >
          <Plus className="size-4" />{' '}
          <span className="hidden sm:inline">New paste</span>
        </Link>
      </header>
      <PasteList pastes={pastes} showFilters />
    </div>
  );
}
