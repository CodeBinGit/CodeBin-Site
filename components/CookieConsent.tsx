'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import Script from 'next/script';

import { Cookie } from 'lucide-react';

import { COOKIE_SETTINGS_EVENT } from './CookieSettingsButton';

const STORAGE_KEY = 'cb-cookie-consent';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-X67E6EX0FP';

type Consent = 'granted' | 'denied' | null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map(c => c.split('=')[0].trim())
    .filter(name => name.startsWith('_ga'));
  // GA sets its cookies on the top-level domain, so try every parent domain.
  const parts = location.hostname.split('.');
  const domains = parts.map((_, i) => parts.slice(i).join('.'));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
}

export default function CookieConsent() {
  // undefined until mounted so the server and first client render match.
  const [consent, setConsent] = useState<Consent | undefined>(undefined);

  useEffect(() => {
    const stored = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser-only storage after mount
    setConsent(stored);
    // gtag may rewrite its cookies while the page unloads after consent is
    // withdrawn, so clear them again once it's gone.
    if (stored === 'denied') clearAnalyticsCookies();
    const reopen = () => setConsent(null);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (value: 'granted' | 'denied') => {
    const previous = readConsent();
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setConsent(value);
    // gtag can't be unloaded, so withdrawing consent clears its cookies and
    // reloads the page without it.
    if (value === 'denied' && previous === 'granted') {
      clearAnalyticsCookies();
      window.location.reload();
    }
  };

  return (
    <>
      {consent === 'granted' && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="card fixed inset-x-4 bottom-4 z-50 p-5 shadow-2xl shadow-black/50 sm:left-auto sm:max-w-sm"
        >
          <div className="flex gap-3">
            <Cookie className="text-accent mt-0.5 size-5 shrink-0" />
            <div>
              <p className="text-sm font-medium">We use cookies</p>
              <p className="text-muted mt-1 text-sm leading-relaxed">
                Essential cookies keep you signed in. With your permission we
                also use analytics cookies to improve Code Bin.{' '}
                <Link
                  href="/legal/collection/cookies"
                  className="text-accent hover:underline"
                >
                  Cookie policy
                </Link>
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => choose('granted')}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => choose('denied')}
                >
                  Essential only
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
