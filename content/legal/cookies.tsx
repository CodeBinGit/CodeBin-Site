import CookieSettingsButton from '@/components/CookieSettingsButton';

import { Email, Updated } from './shared';

const essential = [
  {
    name: '__session',
    provider: 'Clerk',
    purpose: 'Keeps you signed in. Short-lived and refreshed automatically.',
    duration: 'Session'
  },
  {
    name: '__client_uat',
    provider: 'Clerk',
    purpose:
      'Records when you last signed in or out, so sessions stay in sync.',
    duration: 'Up to 1 year'
  },
  {
    name: '__client',
    provider: 'Clerk',
    purpose:
      'Identifies your signed-in device to our authentication provider. Set on Clerk’s domain.',
    duration: 'Up to 1 year'
  },
  {
    name: 'cb_unlock_…',
    provider: 'Code Bin',
    purpose:
      'Remembers that you entered the right password for a protected paste, so you don’t have to enter it again.',
    duration: '7 days'
  },
  {
    name: 'cb-cookie-consent',
    provider: 'Code Bin',
    purpose:
      'Remembers your cookie choice. Stored in your browser’s local storage, not sent to us.',
    duration: 'Until you clear it'
  }
];

const analytics = [
  {
    name: '_ga',
    provider: 'Google Analytics',
    purpose: 'Distinguishes visitors so we can count them.',
    duration: '2 years'
  },
  {
    name: '_ga_<ID>',
    provider: 'Google Analytics',
    purpose: 'Keeps track of the current visit.',
    duration: '2 years'
  }
];

function CookieTable({ rows }: { rows: typeof essential }) {
  return (
    <div className="not-prose my-6">
      {/* Stacked cards on phones, where four columns don't fit. */}
      <ul className="divide-line border-line divide-y rounded-xl border text-sm sm:hidden">
        {rows.map(row => (
          <li key={row.name} className="space-y-1 p-3">
            <p className="text-fg font-mono text-xs break-all">{row.name}</p>
            <p className="text-muted">{row.purpose}</p>
            <p className="text-subtle text-xs">
              {row.provider} · {row.duration}
            </p>
          </li>
        ))}
      </ul>
      <table className="hidden w-full text-left text-sm sm:table">
        <thead className="text-fg">
          <tr className="border-line border-b">
            <th className="py-2 pr-4 font-semibold">Name</th>
            <th className="py-2 pr-4 font-semibold">Set by</th>
            <th className="py-2 pr-4 font-semibold">Purpose</th>
            <th className="py-2 font-semibold">Lasts</th>
          </tr>
        </thead>
        <tbody className="text-muted">
          {rows.map(row => (
            <tr
              key={row.name}
              className="border-line/60 border-b last:border-0"
            >
              <td className="text-fg py-2 pr-4 align-top font-mono text-xs">
                {row.name}
              </td>
              <td className="py-2 pr-4 align-top whitespace-nowrap">
                {row.provider}
              </td>
              <td className="py-2 pr-4 align-top">{row.purpose}</td>
              <td className="py-2 align-top whitespace-nowrap">
                {row.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiesContent() {
  return (
    <>
      <h1>
        Cookie Policy
        <Updated />
      </h1>

      <p>
        Cookies are small files a website stores in your browser. Similar
        technologies, such as local storage, work in the same way. This page
        lists everything Code Bin stores on your device and explains how to
        control it, as required by the Privacy and Electronic Communications
        Regulations (PECR) and the UK GDPR.
      </p>

      <hr />

      <h2>Strictly necessary</h2>

      <p>
        These are needed for the site to work, for example to keep you signed in
        or to remember a paste you’ve unlocked. The law doesn’t require your
        consent for them, and they can’t be switched off on Code Bin, but you
        can block them in your browser. If you do, you won’t be able to sign in.
      </p>

      <CookieTable rows={essential} />

      <h2>Analytics (optional)</h2>

      <p>
        These are only set if you click “Accept” on our cookie banner. They let
        Google Analytics tell us how many people visit and which pages they use,
        so we can improve Code Bin. We don’t use them to identify you or for
        advertising. Google’s use of this data is described in{' '}
        <a href="https://policies.google.com/technologies/partner-sites">
          How Google uses information from sites that use its services
        </a>
        .
      </p>

      <CookieTable rows={analytics} />

      <p>We don’t use advertising or social media tracking cookies.</p>

      <hr />

      <h2>Changing your choice</h2>

      <p>
        You can change or withdraw your consent at any time. Use the button
        below, or the “Cookie settings” link at the bottom of every page, to
        bring the cookie banner back. If you withdraw consent, we stop loading
        Google Analytics and delete its cookies.
      </p>

      <p>
        <CookieSettingsButton className="btn btn-secondary btn-sm not-prose" />
      </p>

      <p>
        You can also block or delete cookies in your browser settings. The{' '}
        <a href="https://ico.org.uk/for-the-public/online/cookies/">
          ICO’s guide to cookies
        </a>{' '}
        explains how.
      </p>

      <hr />

      <h2>Contact us</h2>

      <p>
        Questions about cookies can be sent to <Email subject="Cookies" />. For
        more about how we handle personal data, see our{' '}
        <a href="/legal/privacy">Privacy Policy</a>.
      </p>
    </>
  );
}
