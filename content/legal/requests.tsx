import { Email, Updated } from './shared';

export default function RequestsContent() {
  return (
    <>
      <h1>
        Legal Request Guidelines
        <Updated />
      </h1>

      <p>
        This page explains how Code Bin handles requests for user data from law
        enforcement and other authorities, and what data we hold. If you want a
        copy of your own data, see “Your rights” in our{' '}
        <a href="/legal/privacy">Privacy Policy</a> instead.
      </p>

      <h2>Our principles</h2>

      <ul>
        <li>
          We only disclose user data when we’re legally required to, or in an
          emergency where someone’s life or safety is at risk.
        </li>
        <li>
          We check every request is valid and ask for it to be narrowed if it’s
          too broad.
        </li>
        <li>
          We tell affected users about a request before disclosing their data,
          unless the law or a court order prevents us, or telling them would put
          someone at risk or harm an investigation.
        </li>
      </ul>

      <hr />

      <h2>What data we hold</h2>

      <h3>Visible to anyone</h3>
      <ul>
        <li>public and unlisted pastes;</li>
        <li>
          the display name and profile picture of signed-in users who created
          them.
        </li>
      </ul>

      <h3>Not public</h3>
      <ul>
        <li>
          account details: email address, name, username, and connected sign-in
          services;
        </li>
        <li>
          sign-in records, such as times, IP addresses and devices, held by our
          authentication provider;
        </li>
        <li>
          paste details: contents of private pastes, creation dates and the
          account that created each paste;
        </li>
        <li>request logs held by our hosting provider for a short period.</li>
      </ul>
      <p>
        We don’t keep previous versions of edited pastes, and we don’t log who
        views a paste. We only have the passwords of password-protected pastes
        as one-way hashes, so we can’t provide them. Pastes created without an
        account aren’t linked to any user.
      </p>

      <hr />

      <h2>Making a request</h2>

      <p>
        We’re based in the United Kingdom. We respond to requests made under UK
        law, such as production orders, warrants, and requests under the Data
        Protection Act 2018 (Schedule 2, paragraph 2) for preventing or
        detecting crime. Authorities outside the UK should make requests through
        the appropriate international process, such as a mutual legal assistance
        request.
      </p>
      <p>
        Send requests to <Email subject="Legal request" /> from an official
        email address, including:
      </p>
      <ul>
        <li>
          the name of your organisation and the legal basis for the request;
        </li>
        <li>your name, role, official email address and phone number;</li>
        <li>the links to the specific pastes or accounts involved;</li>
        <li>the specific data you need, and the time period; and</li>
        <li>
          any deadline, and whether the request must be kept confidential.
        </li>
      </ul>
      <p>
        Please allow up to 14 days for a response to non-emergency requests.
      </p>

      <h3>Preserving data</h3>
      <p>
        We can preserve specific data for up to 90 days while you obtain the
        legal authority needed to request it.
      </p>

      <h3>Emergencies</h3>
      <p>
        If there’s an immediate risk of death or serious harm, put “Emergency”
        in the subject line and explain the risk. We may disclose limited data
        without a formal order where we believe it’s necessary to prevent that
        harm.
      </p>

      <hr />

      <h2>Removing content</h2>

      <p>
        To report illegal content or ask us to remove a paste, see “Reporting,
        moderation and complaints” in our{' '}
        <a href="/legal/terms#safety">Terms of Service</a>. For copyright
        complaints, see <a href="/legal/terms#copyright">section 6</a>.
      </p>
    </>
  );
}
