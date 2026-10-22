import { NextResponse } from 'next/server';

import { getRecentPublicPastes } from '@/lib/pastes';

export async function GET() {
  const pastes = await getRecentPublicPastes(8);
  return NextResponse.json({ pastes });
}
