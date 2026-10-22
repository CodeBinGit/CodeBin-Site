import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';

import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

const description =
  'Create, edit, customize and share your code snippets with your friends, family and co-workers in just a few clicks.';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://codebin.site'
  ),
  title: { default: 'Code Bin', template: '%s · Code Bin' },
  description,
  applicationName: 'Code Bin',
  keywords: [
    'paste',
    'codebin',
    'pastebin',
    'hastebin',
    'code sharing',
    'snippets'
  ],
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    siteName: 'Code Bin',
    title: 'Code Bin',
    description,
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'Code Bin' }]
  },
  twitter: { card: 'summary', site: '@TheCodeBin', creator: '@TheRealToxicDev' }
};

export const viewport: Viewport = {
  themeColor: '#09090f',
  colorScheme: 'dark'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="flex flex-col">
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: '#9a6bf5',
              colorBackground: '#11111a',
              colorInput: '#09090f',
              borderRadius: '0.6rem',
              fontFamily: 'var(--font-inter)'
            }
          }}
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <Toaster
            theme="dark"
            position="bottom-center"
            toastOptions={{
              classNames: {
                toast: '!bg-surface-2 !border-line !text-fg !rounded-xl'
              }
            }}
          />
        </ClerkProvider>
      </body>
    </html>
  );
}
