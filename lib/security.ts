import { cookies } from 'next/headers';

import bcrypt from 'bcryptjs';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import 'server-only';

import type { PasteRow } from './types';

const HASH_ROUNDS = 12;
const UNLOCK_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function hashPassword(password: string) {
  return bcrypt.hash(password, HASH_ROUNDS);
}

export function isBcryptHash(value: string) {
  return /^\$2[aby]\$\d{2}\$/.test(value);
}

function safeEqual(a: string, b: string) {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Checks a password against the stored value. Older pastes may hold the
 * password in plain text, so those are compared directly.
 */
export async function verifyPassword(password: string, stored: string) {
  if (isBcryptHash(stored)) return bcrypt.compare(password, stored);
  return safeEqual(password, stored);
}

function secret() {
  const value = process.env.PASTE_UNLOCK_SECRET ?? process.env.CLERK_SECRET_KEY;
  if (!value)
    throw new Error('Set PASTE_UNLOCK_SECRET to sign unlock cookies.');
  return value;
}

function cookieName(pasteId: string) {
  return `cb_unlock_${createHash('sha256').update(pasteId).digest('hex').slice(0, 20)}`;
}

// Tied to the stored password, so changing it invalidates old unlocks.
function unlockToken(paste: Pick<PasteRow, 'pasteId' | 'pastePassword'>) {
  return createHmac('sha256', secret())
    .update(`${paste.pasteId}\0${paste.pastePassword ?? ''}`)
    .digest('base64url');
}

export async function grantUnlock(
  paste: Pick<PasteRow, 'pasteId' | 'pastePassword'>
) {
  const jar = await cookies();
  jar.set(cookieName(paste.pasteId), unlockToken(paste), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: UNLOCK_MAX_AGE
  });
}

export async function hasUnlock(
  paste: Pick<PasteRow, 'pasteId' | 'pastePassword'>
) {
  const jar = await cookies();
  const value = jar.get(cookieName(paste.pasteId))?.value;
  return !!value && safeEqual(value, unlockToken(paste));
}

export type Access = 'ok' | 'private' | 'locked';

export async function getAccess(
  paste: PasteRow,
  userId: string | null
): Promise<Access> {
  const isOwner = !!userId && paste.userId === userId;
  if (isOwner) return 'ok';
  if (paste.private) return 'private';
  if (paste.pastePassword && !(await hasUnlock(paste))) return 'locked';
  return 'ok';
}
