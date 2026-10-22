import type { Metadata } from 'next';

import Content from '@/content/legal/privacy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'View the Code Bin Privacy Policy and data collection info.'
};

export default function Page() {
  return <Content />;
}
