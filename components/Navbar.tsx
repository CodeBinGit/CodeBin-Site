import Image from 'next/image';
import Link from 'next/link';

import { Show } from '@clerk/nextjs';
import { Files, Plus } from 'lucide-react';

import { DiscordIcon, GitHubIcon } from './BrandIcons';
import UserMenu from './UserMenu';

export default function Navbar() {
  return (
    <header className="border-line/70 bg-bg/75 sticky top-0 z-40 border-b backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="mr-3 flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <Image src="/logo.png" alt="" width={28} height={28} priority />
          <span className="text-[15px]">Code Bin</span>
        </Link>

        <Link href="/" className="btn btn-ghost btn-sm hidden sm:inline-flex">
          <Plus className="size-4" /> New paste
        </Link>
        <Show when="signed-in">
          <Link
            href="/my-pastes"
            className="btn btn-ghost btn-sm hidden sm:inline-flex"
          >
            <Files className="size-4" /> My pastes
          </Link>
        </Show>

        <div className="ml-auto flex items-center gap-1">
          <a
            href="/github"
            className="btn btn-ghost btn-icon hidden sm:inline-flex"
            aria-label="Code Bin on GitHub"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <a
            href="/discord"
            className="btn btn-ghost btn-icon hidden sm:inline-flex"
            aria-label="Code Bin Discord server"
          >
            <DiscordIcon className="size-[18px]" />
          </a>
          <div className="bg-line mx-2 hidden h-5 w-px sm:block" />

          <Show when="signed-out">
            <Link href="/sign-in" className="btn btn-ghost btn-sm">
              Sign in
            </Link>
            <Link href="/sign-up" className="btn btn-primary btn-sm">
              Sign up
            </Link>
          </Show>
          <Show when="signed-in">
            <UserMenu />
          </Show>
        </div>
      </nav>
    </header>
  );
}
