import { Code2, Globe, Link2, Lock, ShieldCheck } from 'lucide-react';

import { getLanguage } from '@/lib/languages';
import type { Visibility } from '@/lib/types';

const VISIBILITY = {
  public: { label: 'Public', icon: Globe },
  unlisted: { label: 'Unlisted', icon: Link2 },
  private: { label: 'Private', icon: Lock }
} as const;

export function LanguageChip({ language }: { language: string }) {
  return (
    <span className="chip chip-accent">
      <Code2 className="size-3" />
      {getLanguage(language).label}
    </span>
  );
}

export function VisibilityChip({ visibility }: { visibility: Visibility }) {
  const { label, icon: Icon } = VISIBILITY[visibility];
  return (
    <span className="chip">
      <Icon className="size-3" />
      {label}
    </span>
  );
}

export function PasswordChip() {
  return (
    <span className="chip">
      <ShieldCheck className="size-3" />
      Password
    </span>
  );
}
