import type { Metadata } from 'next';

import Content from '@/content/legal/license';

export const metadata: Metadata = {
  title: 'Use License',
  description: 'The Code Bin source code is open source under the MIT License.'
};

export default function Page() {
  return <Content />;
}
