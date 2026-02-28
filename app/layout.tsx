import type {Metadata, Viewport} from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'DepthThumb Editor Dashboard',
  description: 'DepthThumb Editor Dashboard',
  manifest: '/manifest',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#f97316',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark`}>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
