import Link from 'next/link';

const pages = [
  { href: '/legal/terms', label: 'Terms of Service' },
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/collection/cookies', label: 'Cookie Policy' },
  { href: '/legal/license', label: 'Use License' },
  { href: '/legal/disclosures/security', label: 'Security Disclosure' },
  { href: '/legal/guidelines/requests', label: 'Request Guidelines' }
];

export default function LegalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-8 px-4 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      <nav aria-label="Legal" className="lg:sticky lg:top-24 lg:self-start">
        <p className="label">Legal</p>
        <ul className="flex flex-wrap gap-1 lg:flex-col">
          {pages.map(p => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="text-muted hover:bg-surface-2 hover:text-fg block rounded-md px-2.5 py-1.5 text-sm transition-colors"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <article className="legal">{children}</article>
    </div>
  );
}
