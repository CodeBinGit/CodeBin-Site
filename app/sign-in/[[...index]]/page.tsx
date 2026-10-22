import type { Metadata } from 'next';

import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Code Bin account.'
};

export default function SignInPage() {
  return (
    <div className="flex justify-center px-4 py-16">
      <SignIn path="/sign-in" />
    </div>
  );
}
