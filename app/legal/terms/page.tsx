import type { Metadata } from 'next';

import Content from '@/content/legal/terms';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'View the Code Bin Terms of Service.'
};

export default function Page() {
  return <Content />;
}
