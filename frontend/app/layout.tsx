import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Muhammad Jasim Munir — Software Engineer',
    template: '%s · Muhammad Jasim Munir',
  },
  description:
    'Portfolio of Muhammad Jasim Munir — Software Engineering student building backend systems, full-stack apps, and DSA-driven projects.',
  keywords: ['Muhammad Jasim Munir', 'Software Engineer', 'Portfolio', 'C++', 'MERN', 'Lahore'],
  authors: [{ name: 'Muhammad Jasim Munir' }],
  openGraph: {
    title: 'Muhammad Jasim Munir — Software Engineer',
    description: 'Backend-focused Software Engineering student. Projects, experience, and contact.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
