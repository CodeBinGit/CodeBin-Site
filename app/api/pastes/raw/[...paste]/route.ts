import { auth } from '@clerk/nextjs/server';

import { pasteIdFromSegments } from '@/lib/format';
import { getPaste } from '@/lib/pastes';
import { getAccess } from '@/lib/security';

const text = (body: string, status = 200) =>
  new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'private, no-store'
    }
  });

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ paste: string[] }> }
) {
  const paste = await getPaste(pasteIdFromSegments((await params).paste));
  if (!paste) return text('Paste not found', 404);

  const { userId } = await auth();
  const access = await getAccess(paste, userId);
  if (access === 'private') return text('Paste not found', 404);
  if (access === 'locked') return text('This paste is password protected', 401);

  return text(paste.code);
}
