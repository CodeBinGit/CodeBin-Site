import { cache } from 'react';

import { clerkClient } from '@clerk/nextjs/server';
import 'server-only';

export interface Author {
  id: string;
  name: string;
  imageUrl: string | null;
}

export const getAuthor = cache(
  async (userId: string): Promise<Author | null> => {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const name =
        [user.firstName, user.lastName].filter(Boolean).join(' ') ||
        user.username ||
        'Code Bin user';
      return { id: user.id, name, imageUrl: user.imageUrl || null };
    } catch {
      return null;
    }
  }
);
