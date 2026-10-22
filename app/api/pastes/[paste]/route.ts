import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';

import { getPaste, toSummary } from '@/lib/pastes';
import { getAccess } from '@/lib/security';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ paste: string }> }
) {
  const paste = await getPaste((await params).paste);
  if (!paste)
    return NextResponse.json({ error: 'Paste not found' }, { status: 404 });

  const { userId } = await auth();
  const access = await getAccess(paste, userId);
  if (access === 'private') {
    return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
  }

  return NextResponse.json({
    paste: { ...toSummary(paste), code: access === 'ok' ? paste.code : null }
  });
}
