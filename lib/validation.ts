import { Filter } from 'bad-words';
import { z } from 'zod';

import { normalizeLanguage } from './languages';

export const LIMITS = {
  title: 120,
  description: 1000,
  code: 500_000,
  password: 128
};

export const CUSTOM_URL_PATTERN = /^[A-Za-z0-9_-]{3,64}$/;
const RESERVED_IDS = new Set(['edit', 'new', 'raw', 'api']);

const filter = new Filter();

export function cleanText(text: string) {
  // Strip zero-width spaces people use to dodge the filter.
  const stripped = text.replace(/​/g, '').trim();
  if (!stripped) return '';
  try {
    return filter.clean(stripped);
  } catch {
    return stripped;
  }
}

export function isProfane(text: string) {
  try {
    return filter.isProfane(text.replace(/[-_]/g, ' '));
  } catch {
    return false;
  }
}

export const PasteInputSchema = z.object({
  title: z.string().max(LIMITS.title, 'Title is too long.').default(''),
  description: z
    .string()
    .max(LIMITS.description, 'Description is too long.')
    .default(''),
  code: z
    .string()
    .max(LIMITS.code, 'Paste is too large (500 KB max).')
    .refine(v => v.trim().length > 0, 'Code cannot be blank.'),
  language: z.string().transform(normalizeLanguage),
  visibility: z.enum(['public', 'unlisted', 'private']),
  customUrl: z
    .string()
    .trim()
    .optional()
    .transform(v => v || undefined)
    .refine(v => !v || CUSTOM_URL_PATTERN.test(v), {
      message: 'Use 3–64 letters, numbers, dashes or underscores.'
    })
    .refine(v => !v || !RESERVED_IDS.has(v.toLowerCase()), {
      message: 'That URL is reserved.'
    }),
  password: z
    .string()
    .max(LIMITS.password, 'Password is too long.')
    .optional()
    .transform(v => (v && v.trim() ? v : undefined)),
  removePassword: z.boolean().optional()
});

export type PasteInput = z.input<typeof PasteInputSchema>;
