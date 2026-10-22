import type { Metadata } from 'next';

import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    'Create a Code Bin account or continue with one of our auth providers.'
};

export default function SignUpPage() {
  return (
    <div className="flex justify-center px-4 py-16">
      <SignUp path="/sign-up" />
    </div>
  );
}
