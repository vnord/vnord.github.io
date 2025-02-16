import type { Metadata } from "next";
import { Poppins, Mulish } from 'next/font/google';
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-mulish',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ari von Nordenskjöld",
  description: "Personal portfolio and landing page showcasing my profile and experience",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '256x256' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${mulish.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
