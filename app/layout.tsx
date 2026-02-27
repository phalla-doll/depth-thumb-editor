import type {Metadata} from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'DepthThumb Editor Dashboard',
  description: 'DepthThumb Editor Dashboard',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark`}>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
