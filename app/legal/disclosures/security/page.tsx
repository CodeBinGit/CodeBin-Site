import type { Metadata } from 'next';

import Content from '@/content/legal/security';

export const metadata: Metadata = {
  title: 'Security Disclosure',
  description: 'How we protect your data and how to report a vulnerability.'
};

export default function Page() {
  return <Content />;
}
