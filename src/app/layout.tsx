import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ari von Nordenskjöld",
  description: "Personal portfolio and landing page showcasing my profile and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
