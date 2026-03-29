import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'ArtPage - 아티스트를 위한 웹사이트 플랫폼',
  description: '갤러리, 아티스트, 큐레이터를 위한 올인원 웹사이트 빌더',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'ArtPage - 아티스트를 위한 웹사이트 플랫폼',
    description: '갤러리, 아티스트, 큐레이터를 위한 올인원 웹사이트 빌더. 무료로 전문 아티스트 페이지를 만들고, 작품을 판매하세요.',
    url: 'https://artpage-ivory.vercel.app',
    siteName: 'ArtPage',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'ArtPage — 아티스트를 위한 무료 웹사이트 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArtPage - 아티스트를 위한 웹사이트 플랫폼',
    description: '갤러리, 아티스트, 큐레이터를 위한 올인원 웹사이트 빌더. 무료로 전문 아티스트 페이지를 만들고, 작품을 판매하세요.',
    images: ['https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?q=80&w=1200&auto=format&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-foreground bg-background" style={{ fontFamily: "'Pretendard Variable', Pretendard, var(--font-inter), system-ui, -apple-system, sans-serif" }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CGK1BSBM63"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CGK1BSBM63');
          `}
        </Script>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
