export type Visibility = 'public' | 'unlisted' | 'private';

/** A row of the `Pastes` table. Never send this to the browser. */
export interface PasteRow {
  id: number;
  code: string;
  title: string | null;
  description: string | null;
  language: string | null;
  public: boolean | null;
  private: boolean | null;
  createdAt: string;
  userId: string | null;
  pasteId: string;
  pastePassword: string | null;
  hasVanity: boolean | null;
}

/** Safe, code-free view of a paste for lists. */
export interface PasteSummary {
  pasteId: string;
  title: string;
  description: string;
  language: string;
  visibility: Visibility;
  hasPassword: boolean;
  createdAt: string;
  userId: string | null;
}

export interface PasteListItem extends PasteSummary {
  timeAgo: string;
}
