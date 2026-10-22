import Link from 'next/link';

import { FileCode2, Plus } from 'lucide-react';

export default function EmptyState({
  title = 'Nothing here yet',
  message = "Why don't you go make a new paste?",
  action = true
}: {
  title?: string;
  message?: string;
  action?: boolean;
}) {
  return (
    <div className="card flex flex-col items-center px-6 py-16 text-center">
      <div className="bg-accent-soft text-accent mb-4 grid size-12 place-items-center rounded-xl">
        <FileCode2 className="size-6" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted mt-1 max-w-sm text-sm">{message}</p>
      {action && (
        <Link href="/" className="btn btn-primary mt-6">
          <Plus className="size-4" /> New paste
        </Link>
      )}
    </div>
  );
}
