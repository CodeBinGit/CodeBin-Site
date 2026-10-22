import Link from 'next/link';

import { Email, Updated } from './shared';

const sections = [
  { id: 'about', label: 'About these terms' },
  { id: 'accounts', label: 'Your account' },
  { id: 'content', label: 'Your content' },
  { id: 'acceptable-use', label: 'Acceptable use' },
  { id: 'safety', label: 'Reporting, moderation and complaints' },
  { id: 'copyright', label: 'Copyright complaints' },
  { id: 'private-pastes', label: 'Private and password-protected pastes' },
  { id: 'api', label: 'Using our API' },
  { id: 'ending', label: 'Suspending and closing accounts' },
  { id: 'service', label: 'The service' },
  { id: 'liability', label: 'Our responsibility to you' },
  { id: 'changes', label: 'Changes to these terms' },
  { id: 'law', label: 'Law and disputes' },
  { id: 'contact', label: 'Contact us' }
];

export default function TermsContent() {
  return (
    <>
      <h1>
        Terms of Service
        <Updated />
      </h1>

      <p>
        These terms set out the rules for using Code Bin at codebin.site,
        including creating pastes and using an account. Please read them
        carefully. By using Code Bin you agree to them. If you don’t agree,
        please don’t use the site.
      </p>

      <ol>
        {sections.map(s => (
          <li key={s.id}>
            <a href={`#${s.id}`}>{s.label}</a>
          </li>
        ))}
      </ol>

      <hr />

      <h2 id="about">1. About these terms</h2>

      <p>
        Code Bin (“we”, “us”) is a free service, run from the United Kingdom,
        for creating and sharing code snippets (“pastes”). “You” means anyone
        who uses the site, with or without an account.
      </p>
      <p>
        These terms work alongside our{' '}
        <a href="/legal/privacy">Privacy Policy</a> and{' '}
        <a href="/legal/collection/cookies">Cookie Policy</a>, which explain how
        we handle your personal data. If you use Code Bin on behalf of an
        organisation, you confirm that you’re allowed to accept these terms for
        it.
      </p>

      <hr />

      <h2 id="accounts">2. Your account</h2>

      <ul>
        <li>
          You must be at least 13 years old to use Code Bin. If you’re under 18,
          please check these terms with a parent or guardian.
        </li>
        <li>
          Accounts are for people. Don’t create accounts using bots or other
          automated means, and don’t create accounts to get around a suspension.
        </li>
        <li>
          Give accurate information when you sign up, and keep your sign-in
          details secure. You’re responsible for what happens on your account,
          unless it’s caused by our failure to keep the service secure.
        </li>
        <li>
          Tell us straight away at <Email subject="Account security" /> if you
          think someone else has accessed your account.
        </li>
      </ul>

      <hr />

      <h2 id="content">3. Your content</h2>

      <h3>You own your pastes</h3>
      <p>
        You keep ownership of everything you post. You’re responsible for it,
        and you confirm that you have the right to post it, including under any
        licence that applies to code you didn’t write.
      </p>

      <h3>What you allow us to do</h3>
      <p>
        So that we can run Code Bin, you give us a worldwide, non-exclusive,
        royalty-free licence to store, copy, format and display your pastes, as
        needed to provide the service. This includes showing public pastes in
        our lists and syntax highlighting your code. The licence ends when you
        delete the paste, apart from copies in backups that are removed in the
        normal course of things, and copies we must keep by law.
      </p>

      <h3>Who can see your pastes</h3>
      <ul>
        <li>
          <strong>Public</strong> pastes are listed on Code Bin and can be seen
          by anyone, including search engines.
        </li>
        <li>
          <strong>Unlisted</strong> pastes aren’t listed, but anyone with the
          link can see them.
        </li>
        <li>
          <strong>Private</strong> pastes can only be seen by you when you’re
          signed in.
        </li>
      </ul>
      <p>
        Other people can view and copy public and unlisted pastes using the
        site’s features. Posting a paste doesn’t give them any other rights to
        your code. If they want to reuse it, they need your permission or a
        licence you’ve included with it.
      </p>
      <p>
        Never post passwords, API keys, personal data or other secrets in a
        public or unlisted paste.
      </p>

      <hr />

      <h2 id="acceptable-use">4. Acceptable use</h2>

      <p>You must not use Code Bin to post, share or link to content that:</p>
      <ul>
        <li>
          is illegal in the UK, including child sexual abuse material, terrorist
          content, content that encourages or assists suicide or serious
          self-harm, and fraud;
        </li>
        <li>
          contains malware, or is used to control or deliver malware, phishing
          or other attacks;
        </li>
        <li>
          contains stolen data, credentials or other people’s personal
          information without their permission (“doxxing”);
        </li>
        <li>
          threatens, harasses, or incites hatred or violence against any person
          or group;
        </li>
        <li>is sexually explicit;</li>
        <li>
          infringes anyone’s copyright, trade marks or other rights, or breaks a
          confidentiality obligation; or
        </li>
        <li>is spam, or misleads people about who you are.</li>
      </ul>

      <p>You also must not:</p>
      <ul>
        <li>
          try to get into parts of Code Bin, or other people’s pastes or
          accounts, that you’re not allowed to access;
        </li>
        <li>
          disrupt the service, put an unreasonable load on it, or scrape it at a
          rate that affects other users;
        </li>
        <li>
          get around any restriction we’ve placed on you or your content; or
        </li>
        <li>help or encourage anyone else to do any of the above.</li>
      </ul>
      <p>
        Security research carried out in good faith under our{' '}
        <a href="/legal/disclosures/security">Security Disclosure</a> policy
        isn’t a breach of these terms.
      </p>

      <hr />

      <h2 id="safety">5. Reporting, moderation and complaints</h2>

      <h3>How to report content</h3>
      <p>
        If you see a paste that you think is illegal or breaks these terms,
        email <Email subject="Content report" /> with the paste’s link and a
        short explanation. You don’t need an account to report content.
      </p>

      <h3>What we do</h3>
      <p>
        We review reports as quickly as we can and prioritise the most serious,
        such as child sexual abuse material or terrorist content. If we find
        content that is illegal or breaks these terms, we may remove it,
        restrict who can see it, and suspend or close the account that posted
        it. We don’t check every paste before it’s published, but we do use
        automated filters, for example to stop offensive custom URLs. Where the
        law requires it, we report content to the relevant authorities, such as
        the police or the National Crime Agency.
      </p>

      <h3>Complaints and appeals</h3>
      <p>
        You can complain to us at <Email subject="Complaint" /> if:
      </p>
      <ul>
        <li>
          we removed your content or restricted your account and you think we
          got it wrong;
        </li>
        <li>we didn’t act on something you reported; or</li>
        <li>
          you’re unhappy with how we’re meeting our duties to keep users safe.
        </li>
      </ul>
      <p>
        Please include the relevant links and why you disagree. We’ll
        acknowledge your complaint, look at it again with fresh eyes, and tell
        you what we’ve decided. If we got it wrong, we’ll restore the content or
        account.
      </p>

      <hr />

      <h2 id="copyright">6. Copyright complaints</h2>

      <p>
        If you think a paste infringes your copyright, email{' '}
        <Email subject="Copyright complaint" /> with:
      </p>
      <ul>
        <li>your name and contact details;</li>
        <li>the work you own, and the link to the paste that copies it;</li>
        <li>
          a statement that you believe in good faith that the use isn’t
          authorised by you, a licence or the law; and
        </li>
        <li>
          a statement that the information is accurate and that you own the
          rights, or are authorised to act for the owner.
        </li>
      </ul>
      <p>
        We may share your complaint with the person who posted the paste so they
        can respond. Please consider whether the use might be allowed, for
        example under an open source licence or a copyright exception, before
        you complain. We’ll close the accounts of people who repeatedly infringe
        copyright.
      </p>

      <hr />

      <h2 id="private-pastes">7. Private and password-protected pastes</h2>

      <p>
        Private and password-protected pastes stop other users from seeing your
        content, but they’re not end-to-end encrypted. We treat them as
        confidential and only access their contents when we need to: to
        investigate a report or suspected breach of these terms, to keep the
        service secure, to help you when you’ve asked us to, or when the law
        requires it. Our{' '}
        <a href="/legal/guidelines/requests">Legal Request Guidelines</a>{' '}
        explain how we handle requests from authorities.
      </p>

      <hr />

      <h2 id="api">8. Using our API</h2>

      <p>
        You can use our public API to read pastes you have access to, as long as
        you follow these terms. Don’t make so many requests that it affects the
        service for others. We may limit or block API access that’s causing
        problems.
      </p>

      <hr />

      <h2 id="ending">9. Suspending and closing accounts</h2>

      <p>
        You can stop using Code Bin at any time. You can delete your pastes from{' '}
        <a href="/my-pastes">My pastes</a> and delete your account from your{' '}
        <Link href="/user">profile page</Link>. If you’d like all your pastes
        removed along with your account, email{' '}
        <Email subject="Delete my account" />.
      </p>
      <p>
        We may suspend or close your account, or remove your content, if you
        seriously or repeatedly break these terms, if the law requires it, or if
        your use puts other people or the service at risk. Where it’s reasonable
        and lawful, we’ll tell you why and how to appeal (see{' '}
        <a href="#safety">section 5</a>).
      </p>

      <hr />

      <h2 id="service">10. The service</h2>

      <p>
        Code Bin is free. We work to keep it available and secure, but we can’t
        promise it will always be available or free from errors, and we may
        change or remove features. Please keep your own copies of anything
        important. If we decide to close Code Bin, we’ll give you at least 30
        days’ notice where we can, so you can download your pastes.
      </p>

      <hr />

      <h2 id="liability">11. Our responsibility to you</h2>

      <p>
        Nothing in these terms limits or excludes our liability for death or
        personal injury caused by our negligence, for fraud, or for anything
        else that can’t be limited or excluded by law. Nothing in these terms
        affects your statutory rights as a consumer.
      </p>
      <p>
        If we break these terms, we’re responsible for loss or damage you suffer
        that is a foreseeable result of that. We’re not responsible for loss or
        damage that wasn’t foreseeable, for loss caused by content posted by
        other users, or for any business losses, such as lost profits, data or
        business opportunities, if you use Code Bin for business purposes.
      </p>
      <p>
        If you use Code Bin for business purposes, our total liability to you
        for all claims is limited to £100.
      </p>

      <hr />

      <h2 id="changes">12. Changes to these terms</h2>

      <p>
        We may update these terms, for example to reflect changes to the service
        or the law. We’ll update the date at the top of this page. If we make a
        significant change, we’ll tell signed-in users by email or with a notice
        on the site at least 30 days before it takes effect, unless we need to
        make it sooner for legal or safety reasons. If you don’t agree with the
        changes, you can stop using Code Bin and delete your account.
      </p>

      <hr />

      <h2 id="law">13. Law and disputes</h2>

      <p>
        These terms are governed by the law of England and Wales. If you have a
        problem, please contact us first and we’ll try to sort it out. If we
        can’t, you can bring a claim in the courts of England and Wales. If you
        live in Scotland or Northern Ireland, you can also bring a claim in the
        courts there.
      </p>
      <p>
        If a court decides that any part of these terms can’t be enforced, the
        rest will still apply. If we don’t enforce a term straight away, we can
        still enforce it later.
      </p>

      <hr />

      <h2 id="contact">14. Contact us</h2>

      <p>
        Questions about these terms can be sent to <Email />.
      </p>
    </>
  );
}
