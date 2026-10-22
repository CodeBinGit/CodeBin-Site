// Shared details for the legal pages. Update LAST_UPDATED whenever a page
// changes in a way that affects users.
export const CONTACT_EMAIL = 'codebingroup@gmail.com';
export const LAST_UPDATED = '22 October 2026';

export function Email({ subject }: { subject?: string }) {
  const href = subject
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${CONTACT_EMAIL}`;
  return <a href={href}>{CONTACT_EMAIL}</a>;
}

export function Updated() {
  return <span className="legal-tag">Last updated: {LAST_UPDATED}</span>;
}
