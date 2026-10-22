import type { Metadata } from 'next';

import Content from '@/content/legal/requests';

export const metadata: Metadata = {
  title: 'Request Guidelines',
  description: 'Guidelines to follow when sending us a legal request.'
};

export default function Page() {
  return <Content />;
}
