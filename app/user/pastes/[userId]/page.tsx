import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { UserRound } from 'lucide-react';

import { getPastesByUser } from '@/lib/pastes';
import { getAuthor } from '@/lib/users';

import PasteList from '@/components/paste/PasteList';

type Params = { params: Promise<{ userId: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const author = await getAuthor((await params).userId);
  if (!author) return { title: 'User not found' };
  return {
    title: `Pastes by ${author.name}`,
    description: `View all pastes by ${author.name}.`
  };
}

export default async function UserPastesPage({ params }: Params) {
  const { userId: profileId } = await params;
  const { userId } = await auth();
  if (userId === profileId) redirect('/my-pastes');

  const author = await getAuthor(profileId);
  if (!author) notFound();
  const pastes = await getPastesByUser(author.id, { publicOnly: true });

  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <header className="mb-8 flex items-center gap-4">
        {author.imageUrl ? (
          <Image
            src={author.imageUrl}
            alt=""
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className="bg-surface-2 grid size-12 place-items-center rounded-full">
            <UserRound className="text-muted size-6" />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">
            {author.name}
          </h1>
          <p className="text-muted text-sm">
            {pastes.length} public {pastes.length === 1 ? 'paste' : 'pastes'}
          </p>
        </div>
      </header>
      <PasteList pastes={pastes} />
    </div>
  );
}
