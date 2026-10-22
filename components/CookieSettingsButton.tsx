'use client';

export const COOKIE_SETTINGS_EVENT = 'cb:cookie-settings';

// Reopens the cookie banner so people can change or withdraw consent.
export default function CookieSettingsButton({
  className
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
    >
      Cookie settings
    </button>
  );
}
