import { Email, Updated } from './shared';

export default function SecurityContent() {
  return (
    <>
      <h1>
        Security Disclosure
        <Updated />
      </h1>

      <p>
        This page explains how we protect Code Bin and the data you store in it,
        and how to report a security problem to us.
      </p>

      <hr />

      <h2>Report a vulnerability</h2>

      <p>
        If you think you’ve found a security vulnerability, please email{' '}
        <Email subject="Security vulnerability" /> with:
      </p>
      <ul>
        <li>a description of the issue and where it is;</li>
        <li>the steps needed to reproduce it; and</li>
        <li>what an attacker could do with it, if you know.</li>
      </ul>
      <p>
        Please don’t report security issues in public places such as GitHub
        issues or Discord. We’ll acknowledge your report within five working
        days and keep you updated while we fix it. With your permission, we’re
        happy to credit you once it’s fixed. We don’t currently offer paid
        rewards.
      </p>

      <h3>Good-faith research</h3>
      <p>
        We won’t take legal action against you or ask anyone else to, for
        research that follows these rules:
      </p>
      <ul>
        <li>
          only test with your own accounts and pastes, and don’t access, change
          or delete other people’s data. If you come across someone else’s data
          by accident, stop and tell us;
        </li>
        <li>
          don’t run denial-of-service attacks, spam, social engineering or
          physical attacks;
        </li>
        <li>
          give us a reasonable time to fix the issue before you tell anyone else
          about it.
        </li>
      </ul>
      <p>
        Our services are hosted by third parties such as Clerk and Supabase.
        Vulnerabilities in their platforms should be reported to them.
      </p>

      <hr />

      <h2>How we protect your data</h2>

      <ul>
        <li>
          <strong>Encryption in transit.</strong> All traffic to Code Bin uses
          HTTPS.
        </li>
        <li>
          <strong>Accounts.</strong> Sign-in is handled by Clerk, a specialist
          authentication provider. Code Bin never sees or stores your account
          password.
        </li>
        <li>
          <strong>Paste passwords</strong> are stored as bcrypt hashes. Paste
          passwords set on our previous version of the site are converted to
          hashes when the paste is next unlocked.
        </li>
        <li>
          <strong>Database access.</strong> The database can only be reached
          from our servers, and its access keys are never sent to your browser.
        </li>
        <li>
          <strong>Private pastes</strong> can only be viewed by their owner. Our
          access to them is limited to the situations described in our{' '}
          <a href="/legal/terms#private-pastes">Terms of Service</a>.
        </li>
      </ul>

      <p>
        No system is perfectly secure. If a data breach puts your rights at
        risk, we’ll tell you and the Information Commissioner’s Office as
        required by UK data protection law.
      </p>

      <hr />

      <h2>Contact</h2>

      <p>
        Security reports: <Email subject="Security vulnerability" />. For
        questions about your personal data, see our{' '}
        <a href="/legal/privacy">Privacy Policy</a>.
      </p>
    </>
  );
}
