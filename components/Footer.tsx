import Image from 'next/image';
import Link from 'next/link';

import { DiscordIcon, GitHubIcon, XIcon } from './BrandIcons';
import CookieSettingsButton from './CookieSettingsButton';

const SUPPORT_REPO = 'https://github.com/CodeBinGit/Support/issues/new';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'New paste', href: '/' },
      { label: 'My pastes', href: '/my-pastes' },
      { label: 'Service status', href: '/status' }
    ]
  },
  {
    title: 'Support',
    links: [
      {
        label: 'Report an issue',
        href: `${SUPPORT_REPO}?template=bug_report.md`
      },
      {
        label: 'Request a feature',
        href: `${SUPPORT_REPO}?template=feature_request.md`
      },
      { label: 'Security disclosure', href: '/legal/disclosures/security' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Cookie Policy', href: '/legal/collection/cookies' },
      { label: 'Use License', href: '/legal/license' },
      { label: 'Request Guidelines', href: '/legal/guidelines/requests' }
    ]
  }
];

const socials = [
  { label: 'GitHub', href: '/github', icon: GitHubIcon },
  { label: 'Discord', href: '/discord', icon: DiscordIcon },
  { label: 'X (Twitter)', href: '/twitter', icon: XIcon }
];

export default function Footer() {
  return (
    <footer className="border-line/70 mt-24 border-t">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 sm:grid-cols-3 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="col-span-2 space-y-4 sm:col-span-3 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <Image src="/logo.png" alt="" width={30} height={30} />
            Code Bin
          </Link>
          <p className="text-muted max-w-xs text-sm leading-relaxed">
            Create, edit, customize and share your code snippets with friends,
            family and co-workers in just a few clicks.
          </p>
          <div className="flex gap-1">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="btn btn-ghost btn-icon"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {columns.map(col => (
          <div key={col.title}>
            <h3 className="text-fg mb-3 text-sm font-semibold">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-fg text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {col.title === 'Legal' && (
                <li>
                  <CookieSettingsButton className="text-muted hover:text-fg cursor-pointer text-sm transition-colors" />
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-line/70 border-t">
        <p className="text-subtle mx-auto max-w-7xl px-4 py-5 text-xs sm:px-6">
          © {new Date().getFullYear()} Code Bin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
