import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-28 text-center">
      <p className="text-accent font-mono text-sm">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="text-muted mt-2">
        Whatever you're looking for has moved or no longer exists.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        <ArrowLeft className="size-4" /> Back home
      </Link>
    </div>
  );
}
