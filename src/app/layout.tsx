import type { Metadata } from "next";
import Script from "next/script";
// Make sure to import your global CSS here
import "src/assets/tailwindInit.css";
import "src/assets/_global.scss";

export const metadata: Metadata = {
  title: "Poznávačka Tool",
  description: "Pomocník s učením poznávačky",
  icons: {
    icon: "/assets/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DKDRL7RCH3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DKDRL7RCH3');
          `}
        </Script>

        {/* FontAwesome */}
        <Script
          src="https://kit.fontawesome.com/58f533b0e1.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* This replaces <div id="root"></div> */}
        {children}
      </body>
    </html>
  );
}
