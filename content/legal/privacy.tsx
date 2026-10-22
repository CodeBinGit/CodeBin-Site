import Link from 'next/link';

import { Email, Updated } from './shared';

export default function PrivacyContent() {
  return (
    <>
      <h1>
        Privacy Policy
        <Updated />
      </h1>

      <p>
        This policy explains what personal data Code Bin collects when you use
        codebin.site, why we collect it, who we share it with and the rights you
        have over it. It is written to meet the UK General Data Protection
        Regulation (UK GDPR) and the Data Protection Act 2018.
      </p>

      <h2>The short version</h2>

      <ul>
        <li>
          We collect only what we need to run Code Bin: your account details if
          you sign up, the pastes you create, and basic technical data needed to
          keep the site secure.
        </li>
        <li>
          We only use analytics cookies if you agree to them, and you can change
          your mind at any time.
        </li>
        <li>We don’t sell your data and we don’t show adverts.</li>
        <li>
          Public and unlisted pastes can be seen by anyone with the link, so
          don’t put personal or sensitive information in them.
        </li>
      </ul>

      <hr />

      <h2>Who we are</h2>

      <p>
        Code Bin (“we”, “us”) is the controller of the personal data described
        in this policy. Code Bin is run from the United Kingdom. You can contact
        us about anything in this policy at <Email subject="Privacy" />.
      </p>

      <hr />

      <h2>What we collect</h2>

      <h3>Account information</h3>
      <p>
        Accounts are optional. If you create one, our authentication provider,
        Clerk, collects and stores on our behalf:
      </p>
      <ul>
        <li>your email address and, if you choose one, your password;</li>
        <li>
          your username, first and last name, and profile picture, if given;
        </li>
        <li>
          if you sign in with another service (such as GitHub, Google or
          Discord), the basic profile details that service shares with us, such
          as your name, email address and avatar;
        </li>
        <li>
          sign-in and session records, such as the time, IP address, browser and
          device used, which are used to keep your account secure.
        </li>
      </ul>

      <h3>Pastes</h3>
      <p>
        When you create a paste we store its contents, title, description,
        language, visibility setting, creation date, its URL and, if you’re
        signed in, your account ID. If you set a password on a paste, we store
        only a one-way hash of it, never the password itself.
      </p>

      <h3>Technical data</h3>
      <p>
        Like most websites, our hosting provider records basic request
        information, such as IP address, browser type, the page requested and
        the time of the request. We use this only to run the site, investigate
        errors and protect against abuse.
      </p>

      <h3>Analytics (only with your consent)</h3>
      <p>
        If you accept analytics cookies, we use Google Analytics to understand
        how the site is used in aggregate, such as which pages are visited and
        roughly where visitors come from. Google Analytics does not log or store
        IP addresses, and we don’t use it to identify you or link it to your
        account. If you choose “Essential only”, Google Analytics is never
        loaded. See our <a href="/legal/collection/cookies">Cookie Policy</a>{' '}
        for details.
      </p>

      <h3>When you contact us</h3>
      <p>
        If you email us or report content, we keep your message and email
        address so we can reply and keep a record of the issue.
      </p>

      <hr />

      <h2>Why we use it, and our lawful basis</h2>

      <div className="not-prose overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-fg">
            <tr className="border-line border-b">
              <th className="py-2 pr-4 font-semibold">Purpose</th>
              <th className="py-2 font-semibold">Lawful basis (UK GDPR)</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-line/60 border-b">
              <td className="py-2 pr-4 align-top">
                Creating and running your account, storing and showing your
                pastes
              </td>
              <td className="py-2 align-top">
                Performance of a contract (our{' '}
                <a className="text-accent" href="/legal/terms">
                  Terms of Service
                </a>
                ) — Article 6(1)(b)
              </td>
            </tr>
            <tr className="border-line/60 border-b">
              <td className="py-2 pr-4 align-top">
                Keeping the site secure, preventing spam and abuse, fixing
                errors
              </td>
              <td className="py-2 align-top">
                Legitimate interests in running a safe, reliable service —
                Article 6(1)(f)
              </td>
            </tr>
            <tr className="border-line/60 border-b">
              <td className="py-2 pr-4 align-top">
                Reviewing reported content and handling complaints
              </td>
              <td className="py-2 align-top">
                Legal obligation (including the Online Safety Act 2023) and
                legitimate interests — Article 6(1)(c) and (f)
              </td>
            </tr>
            <tr className="border-line/60 border-b">
              <td className="py-2 pr-4 align-top">Analytics</td>
              <td className="py-2 align-top">
                Consent — Article 6(1)(a). You can withdraw it at any time.
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 align-top">
                Replying to you and responding to lawful requests
              </td>
              <td className="py-2 align-top">
                Legitimate interests and legal obligation — Article 6(1)(f) and
                (c)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        We don’t use your data for automated decision-making or profiling that
        has legal or similarly significant effects on you, and we don’t send
        marketing emails.
      </p>

      <hr />

      <h2>Who we share it with</h2>

      <p>
        We don’t sell or rent your personal data. We share it only with service
        providers who process it on our behalf under written agreements, and
        only as needed to run Code Bin:
      </p>
      <ul>
        <li>
          <strong>Clerk</strong> — sign-up, sign-in and account management.
        </li>
        <li>
          <strong>Supabase</strong> — database that stores pastes.
        </li>
        <li>
          <strong>Our hosting provider</strong> — serves the website and keeps
          request logs.
        </li>
        <li>
          <strong>Google</strong> — Google Analytics, only if you consent.
        </li>
      </ul>
      <p>
        We may also disclose data if the law requires it, for example in
        response to a valid court order, or where it’s necessary to protect
        someone’s safety. Our{' '}
        <a href="/legal/guidelines/requests">Legal Request Guidelines</a>{' '}
        explain how we handle these requests. If Code Bin is ever transferred to
        a new owner, your data would pass to them under this policy, and we
        would tell you first.
      </p>

      <hr />

      <h2>International transfers</h2>

      <p>
        Some of our service providers store or process data outside the UK,
        including in the United States and the European Economic Area. Where
        data leaves the UK, we rely on UK adequacy regulations, the UK Extension
        to the EU–US Data Privacy Framework, or the UK International Data
        Transfer Agreement or Addendum, so that your data stays protected to the
        standard UK law requires. Contact us if you’d like more detail.
      </p>

      <hr />

      <h2>How long we keep it</h2>

      <ul>
        <li>
          <strong>Account data</strong> is kept while your account exists and
          removed when you delete it.
        </li>
        <li>
          <strong>Pastes</strong> are kept until you delete them, or until we
          remove them for breaking our Terms. You can delete your pastes at any
          time from <a href="/my-pastes">My pastes</a>. Pastes created without
          an account can’t be linked to you, so contact us if you need one
          removed.
        </li>
        <li>
          <strong>Request logs</strong> are kept by our hosting provider for a
          short period and then deleted automatically.
        </li>
        <li>
          <strong>Analytics data</strong> is kept by Google for no more than 14
          months.
        </li>
        <li>
          <strong>Emails and reports</strong> are kept for as long as needed to
          deal with the issue, and for up to two years afterwards in case it
          comes up again.
        </li>
      </ul>
      <p>
        We may keep specific data for longer if we’re legally required to, or if
        it’s needed for an ongoing investigation or legal claim.
      </p>

      <hr />

      <h2>Your rights</h2>

      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you;</li>
        <li>have inaccurate data corrected;</li>
        <li>have your data erased;</li>
        <li>restrict or object to how we use your data;</li>
        <li>
          receive your data in a portable format, or have it sent to another
          service;
        </li>
        <li>
          withdraw your consent at any time, where we rely on consent (this
          doesn’t affect anything we did before you withdrew it).
        </li>
      </ul>
      <p>
        You can update your account details and delete your account from your{' '}
        <Link href="/user">profile page</Link>. For anything else, email{' '}
        <Email subject="Data protection request" />. We’ll respond within one
        month, and we may ask you to confirm your identity first. Exercising
        your rights is free.
      </p>
      <p>
        If you’re unhappy with how we’ve handled your data, please contact us
        first so we can try to put it right. You also have the right to complain
        to the Information Commissioner’s Office (ICO) at{' '}
        <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk</a> or on 0303
        123 1113.
      </p>

      <hr />

      <h2>Public content</h2>

      <p>
        Public pastes are listed on our home page and can be seen, copied and
        indexed by search engines. Unlisted pastes don’t appear in lists, but
        anyone with the link can open them. If you sign in, your display name
        and profile picture are shown on your pastes and on your public profile
        page. Please don’t post anyone’s personal information, including your
        own, in a paste you wouldn’t want made public.
      </p>

      <hr />

      <h2>Security</h2>

      <p>
        All traffic to Code Bin is encrypted with HTTPS, our database is only
        accessible from our servers, and access to personal data is limited to
        the people who need it to run the service. No system is perfectly
        secure, but if a breach affects your data and puts you at risk, we’ll
        tell you and the ICO as the law requires. See our{' '}
        <a href="/legal/disclosures/security">Security Disclosure</a> for more.
      </p>

      <hr />

      <h2>Children</h2>

      <p>
        You must be at least 13 to use Code Bin. We don’t knowingly collect
        personal data from children under 13. If you believe a child under 13
        has given us their data, contact us and we’ll delete it.
      </p>

      <hr />

      <h2>Changes to this policy</h2>

      <p>
        We’ll update the date at the top of this page whenever this policy
        changes. If we make a significant change, we’ll tell signed-in users by
        email or with a notice on the site before it takes effect.
      </p>

      <hr />

      <h2>Contact us</h2>

      <p>
        Email <Email subject="Privacy" /> with any questions about this policy
        or your data.
      </p>
    </>
  );
}
