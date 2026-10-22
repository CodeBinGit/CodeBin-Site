'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { ChevronRight, Search } from 'lucide-react';

import { cn } from '@/lib/format';
import { getLanguage } from '@/lib/languages';
import type { PasteListItem, Visibility } from '@/lib/types';

import { LanguageChip, PasswordChip, VisibilityChip } from './Badges';
import EmptyState from './EmptyState';

type Filter = 'all' | Visibility;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'public', label: 'Public' },
  { value: 'unlisted', label: 'Unlisted' },
  { value: 'private', label: 'Private' }
];

export default function PasteList({
  pastes,
  showFilters = false
}: {
  pastes: PasteListItem[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: pastes.length,
      public: 0,
      unlisted: 0,
      private: 0
    };
    for (const p of pastes) c[p.visibility]++;
    return c;
  }, [pastes]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pastes.filter(p => {
      if (filter !== 'all' && p.visibility !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.pasteId.toLowerCase().includes(q) ||
        getLanguage(p.language).label.toLowerCase().includes(q)
      );
    });
  }, [pastes, filter, query]);

  if (pastes.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="bg-surface border-line inline-flex overflow-x-auto rounded-lg border p-1">
            {FILTERS.map(f => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={cn(
                  'flex h-8 items-center gap-2 rounded-md px-3 text-sm whitespace-nowrap transition-colors',
                  filter === f.value
                    ? 'bg-surface-3 text-fg'
                    : 'text-muted hover:text-fg'
                )}
              >
                {f.label}
                <span className="text-subtle text-xs tabular-nums">
                  {counts[f.value]}
                </span>
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto sm:w-72">
            <Search className="text-subtle pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <input
              className="input pl-9"
              placeholder="Search pastes"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search pastes"
            />
          </div>
        </div>
      )}

      {visible.length === 0 ? (
        <EmptyState
          title="No matching pastes"
          message="Try a different filter or search term."
          action={false}
        />
      ) : (
        <ul className="card divide-line divide-y overflow-hidden">
          {visible.map(paste => (
            <li key={paste.pasteId}>
              <Link
                href={`/pastes/${paste.pasteId}`}
                className="group hover:bg-surface-2/70 flex items-center gap-4 px-5 py-4 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="group-hover:text-accent truncate font-medium transition-colors">
                      {paste.title || 'Untitled paste'}
                    </p>
                  </div>
                  {paste.description && (
                    <p className="text-muted mt-0.5 truncate text-sm">
                      {paste.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <LanguageChip language={paste.language} />
                    {showFilters && (
                      <VisibilityChip visibility={paste.visibility} />
                    )}
                    {paste.hasPassword && <PasswordChip />}
                    <span className="text-subtle ml-1 text-xs">
                      {paste.timeAgo}
                    </span>
                  </div>
                </div>
                <ChevronRight className="text-subtle group-hover:text-fg size-4 shrink-0 transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
