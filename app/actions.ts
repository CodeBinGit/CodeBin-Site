'use server';

import { auth } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';

import {
  deletePasteRow,
  getPaste,
  insertPaste,
  isPasteIdTaken,
  updatePasteRow
} from '@/lib/pastes';
import {
  grantUnlock,
  hashPassword,
  isBcryptHash,
  verifyPassword
} from '@/lib/security';
import {
  type PasteInput,
  PasteInputSchema,
  cleanText,
  isProfane
} from '@/lib/validation';

type Field =
  'title' | 'description' | 'code' | 'customUrl' | 'password' | 'visibility';

export type ActionResult =
  { ok: true; pasteId: string } | { ok: false; error: string; field?: Field };

function parse(input: PasteInput) {
  const result = PasteInputSchema.safeParse(input);
  if (result.success) return { data: result.data } as const;
  const issue = result.error.issues[0];
  return {
    error: {
      ok: false,
      error: issue.message,
      field: issue.path[0] as Field
    } satisfies ActionResult
  } as const;
}

export async function createPaste(input: PasteInput): Promise<ActionResult> {
  const parsed = parse(input);
  if (parsed.error) return parsed.error;
  const data = parsed.data;
  const { userId } = await auth();

  if (data.visibility === 'private' && !userId) {
    return {
      ok: false,
      error: 'Sign in to create private pastes.',
      field: 'visibility'
    };
  }

  let pasteId = nanoid(8);
  if (data.customUrl) {
    if (!userId) {
      return {
        ok: false,
        error: 'Sign in to use a custom URL.',
        field: 'customUrl'
      };
    }
    if (isProfane(data.customUrl)) {
      return {
        ok: false,
        error: 'Please choose a different URL.',
        field: 'customUrl'
      };
    }
    if (await isPasteIdTaken(data.customUrl)) {
      return {
        ok: false,
        error: 'That URL is already taken.',
        field: 'customUrl'
      };
    }
    pasteId = data.customUrl;
  }

  try {
    await insertPaste({
      pasteId,
      userId: userId ?? null,
      title: cleanText(data.title),
      description: cleanText(data.description),
      code: data.code,
      language: data.language,
      public: data.visibility === 'public',
      private: data.visibility === 'private',
      pastePassword: data.password ? await hashPassword(data.password) : null,
      hasVanity: !!data.customUrl
    });
  } catch (error) {
    console.error('Failed to create paste', error);
    return { ok: false, error: 'Something went wrong saving your paste.' };
  }

  return { ok: true, pasteId };
}

async function getOwnedPaste(pasteId: string) {
  const { userId } = await auth();
  if (!userId) return { error: 'You need to be signed in.' } as const;
  const paste = await getPaste(pasteId);
  if (!paste) return { error: 'Paste not found.' } as const;
  if (paste.userId !== userId)
    return { error: "You can't change this paste." } as const;
  return { paste } as const;
}

export async function updatePaste(
  pasteId: string,
  input: PasteInput
): Promise<ActionResult> {
  const owned = await getOwnedPaste(pasteId);
  if (owned.error) return { ok: false, error: owned.error };

  const parsed = parse(input);
  if (parsed.error) return parsed.error;
  const data = parsed.data;

  let pastePassword = owned.paste.pastePassword;
  if (data.removePassword) pastePassword = null;
  else if (data.password) pastePassword = await hashPassword(data.password);

  try {
    await updatePasteRow(pasteId, {
      title: cleanText(data.title),
      description: cleanText(data.description),
      code: data.code,
      language: data.language,
      public: data.visibility === 'public',
      private: data.visibility === 'private',
      pastePassword
    });
  } catch (error) {
    console.error('Failed to update paste', error);
    return { ok: false, error: 'Something went wrong saving your changes.' };
  }

  return { ok: true, pasteId };
}

export async function deletePaste(pasteId: string): Promise<ActionResult> {
  const owned = await getOwnedPaste(pasteId);
  if (owned.error) return { ok: false, error: owned.error };

  try {
    await deletePasteRow(pasteId);
  } catch (error) {
    console.error('Failed to delete paste', error);
    return { ok: false, error: 'Something went wrong deleting this paste.' };
  }
  return { ok: true, pasteId };
}

export async function unlockPaste(
  pasteId: string,
  password: string
): Promise<ActionResult> {
  const paste = await getPaste(pasteId);
  if (!paste?.pastePassword || paste.private) {
    return { ok: false, error: 'Paste not found.' };
  }

  if (!(await verifyPassword(password, paste.pastePassword))) {
    return { ok: false, error: 'Incorrect password.', field: 'password' };
  }

  // Upgrade passwords the old site stored in plain text.
  if (!isBcryptHash(paste.pastePassword)) {
    paste.pastePassword = await hashPassword(password);
    await updatePasteRow(pasteId, { pastePassword: paste.pastePassword });
  }

  await grantUnlock(paste);
  return { ok: true, pasteId };
}
