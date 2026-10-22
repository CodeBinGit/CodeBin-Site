import type { Metadata } from 'next';

import { UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Update your Code Bin profile.'
};

export default async function UserProfilePage() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <div className="flex justify-center px-4 py-12">
      <UserProfile path="/user" />
    </div>
  );
}
