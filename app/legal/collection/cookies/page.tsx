import type { Metadata } from 'next';

import Content from '@/content/legal/cookies';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about how we store and use browser cookies.'
};

export default function Page() {
  return <Content />;
}
