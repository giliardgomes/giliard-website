import type { Metadata } from "next"
import "./globals.css"
import { Young_Serif, Inter_Tight } from 'next/font/google';
import PageWrapper from "@/components/PageWrapper/PageWrapper"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const youngSerif = Young_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
});

const interTight = Inter_Tight({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Giliard Gomes | Product Designer",
  description: "Product Designer creating digital experiences for global impact.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${youngSerif.variable} ${interTight.variable}`}
        suppressHydrationWarning
      >
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
        <PageWrapper>{children}</PageWrapper>
      </body>
      <SpeedInsights />
      <Analytics />
    </html>
  );
}