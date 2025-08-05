import type { Metadata } from 'next';
import './globals.css';
import { Poppins, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartProvider';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';
import MonetagServiceWorkerRegister from '@/components/MonetagServiceWorkerRegister';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Lapzen – Premium Laptops in Pakistan',
    template: '%s | Lapzen',
  },
  description:
    'Your one-stop shop for new, used, and refurbished premium laptops from top brands like Apple, Dell, HP, and more.',
  keywords: [
    'Lapzen',
    'premium laptops',
    'buy laptops in Pakistan',
    'used laptops',
    'laptops in lahore',
    'Apple laptops',
    'Dell laptops',
    'HP laptops',
    'Lenovo laptops',
    'Best laptops',
    'cheap laptops',
    'good condition laptops',
    'hafeez centre lahore',
    'hafeez centre laptops',
    'hafeez centre used laptops',
    'best laptops in lahore',
    'best used laptops in lahore',
    'lenovo used laptops',
    'dell used laptops',
    'good condition hp laptops',
    'good condition dell laptops',
    'good condition lenovo laptops',
    'hp used laptops',
    'best cheap laptops in lahore',
    'lapzen laptops',
    'lapzen used laptops',
  ],
  authors: [{ name: 'Lapzen Team' }],
  creator: 'Lapzen',
  metadataBase: new URL('https://lapzen.store'),
  openGraph: {
    title: 'Lapzen – Premium Laptops in Pakistan',
    description:
      'Browse top-quality laptops from brands like Apple, Dell, HP. New and refurbished models available at unbeatable prices.',
    url: 'https://lapzen.store',
    siteName: 'Lapzen',
    type: 'website',
    locale: 'en_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lapzen – Premium Laptops in Pakistan',
    description:
      'Discover the best laptops in Pakistan with Lapzen. Fast. Reliable. Affordable.',
    creator: '@yourTwitterHandle', // Replace or remove if not needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* Favicon & SEO */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#ffffff" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lapzen',
              url: 'https://lapzen.store',
              logo: 'https://lapzen.store/favicon.ico',
            }),
          }}
        />
      </Head>

      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          poppins.variable,
          ptSans.variable
        )}
      >
        <CartProvider>
          <MonetagServiceWorkerRegister />
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
          <Toaster />

          {/* Tawk.to live chat script */}
          <Script
            id="tawkto"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
                (function() {
                  var s1 = document.createElement("script"),
                      s0 = document.getElementsByTagName("script")[0];
                  s1.async = true;
                  s1.src = 'https://embed.tawk.to/68906c1b7f808f192df0b098/1j1q2cj70';
                  s1.charset = 'UTF-8';
                  s1.setAttribute('crossorigin', '*');
                  s0.parentNode.insertBefore(s1, s0);
                })();
              `,
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
