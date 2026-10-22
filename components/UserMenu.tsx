'use client';

import { UserButton } from '@clerk/nextjs';
import { Files, Plus } from 'lucide-react';

// Clerk detects UserButton's custom children by component identity, which only
// survives when they're rendered from a client component.
export default function UserMenu() {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="My pastes"
          href="/my-pastes"
          labelIcon={<Files className="size-4" />}
        />
        <UserButton.Link
          label="New paste"
          href="/"
          labelIcon={<Plus className="size-4" />}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
