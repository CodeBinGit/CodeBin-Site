import Link from 'next/link';

import { ArrowLeft, FileQuestion, Plus } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[65vh] items-center justify-center overflow-hidden px-4 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(50%_60%_at_50%_0%,rgb(154_107_245/0.14),transparent_70%)]"
      />
      <section className="w-full max-w-lg text-center">
        <div
          aria-hidden
          className="border-line bg-surface mx-auto grid size-16 place-items-center rounded-2xl border shadow-[0_12px_40px_-16px_rgb(154_107_245/0.5)]"
        >
          <FileQuestion className="text-accent size-7" />
        </div>
        <p className="text-accent mt-6 font-mono text-sm tracking-[0.2em]">
          ERROR 404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page is missing.
        </h1>
        <p className="text-muted mx-auto mt-3 max-w-sm leading-relaxed">
          The link may be outdated, or the paste you’re looking for may no
          longer exist.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <Plus className="size-4" /> Create a paste
          </Link>
          <Link href="/" className="btn btn-secondary">
            <ArrowLeft className="size-4" /> Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
