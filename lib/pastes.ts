import 'server-only';

import { timeAgo } from './format';
import { normalizeLanguage } from './languages';
import supabase from './supabase';
import type {
  PasteListItem,
  PasteRow,
  PasteSummary,
  Visibility
} from './types';

const TABLE = 'Pastes';
const SUMMARY_COLUMNS =
  'pasteId, title, description, language, public, private, pastePassword, createdAt, userId';

type SummaryRow = Pick<
  PasteRow,
  | 'pasteId'
  | 'title'
  | 'description'
  | 'language'
  | 'public'
  | 'private'
  | 'pastePassword'
  | 'createdAt'
  | 'userId'
>;

export function visibilityOf(
  row: Pick<PasteRow, 'public' | 'private'>
): Visibility {
  if (row.private) return 'private';
  if (row.public) return 'public';
  return 'unlisted';
}

export function toSummary(row: SummaryRow): PasteSummary {
  return {
    pasteId: row.pasteId,
    title: row.title?.trim() || '',
    description: row.description?.trim() || '',
    language: normalizeLanguage(row.language),
    visibility: visibilityOf(row),
    hasPassword: !!row.pastePassword,
    createdAt: row.createdAt,
    userId: row.userId
  };
}

export function toListItem(row: SummaryRow): PasteListItem {
  return { ...toSummary(row), timeAgo: timeAgo(row.createdAt) };
}

export async function getRecentPublicPastes(
  limit = 8
): Promise<PasteListItem[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select(SUMMARY_COLUMNS)
    .eq('public', true)
    .order('createdAt', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to load public pastes', error);
    return [];
  }
  return (data as SummaryRow[]).map(toListItem);
}

export async function getPastesByUser(
  userId: string,
  { publicOnly }: { publicOnly: boolean }
): Promise<PasteListItem[]> {
  let query = supabase
    .from(TABLE)
    .select(SUMMARY_COLUMNS)
    .eq('userId', userId)
    .order('createdAt', { ascending: false });

  if (publicOnly) query = query.eq('public', true);

  const { data, error } = await query;
  if (error) {
    console.error('Failed to load user pastes', error);
    return [];
  }
  return (data as SummaryRow[]).map(toListItem);
}

export async function getPaste(pasteId: string): Promise<PasteRow | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('pasteId', pasteId)
    .limit(1);

  if (error) {
    console.error('Failed to load paste', error);
    return null;
  }
  return (data?.[0] as PasteRow | undefined) ?? null;
}

export async function isPasteIdTaken(pasteId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from(TABLE)
    .select('id', { count: 'exact', head: true })
    .eq('pasteId', pasteId);

  if (error) throw error;
  return (count ?? 0) > 0;
}

export type NewPaste = Omit<PasteRow, 'id' | 'createdAt'>;

export async function insertPaste(paste: NewPaste) {
  const { error } = await supabase.from(TABLE).insert(paste);
  if (error) throw error;
}

export async function updatePasteRow(
  pasteId: string,
  fields: Partial<Omit<PasteRow, 'id' | 'pasteId' | 'createdAt' | 'userId'>>
) {
  const { error } = await supabase
    .from(TABLE)
    .update(fields)
    .eq('pasteId', pasteId);
  if (error) throw error;
}

export async function deletePasteRow(pasteId: string) {
  const { error } = await supabase.from(TABLE).delete().eq('pasteId', pasteId);
  if (error) throw error;
}
