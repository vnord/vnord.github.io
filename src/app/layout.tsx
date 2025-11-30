import type { Metadata } from "next";
import { Poppins, Mulish } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ari von Nordenskjöld",
  description:
    "Exploring technology and building cool stuff. Based in Zürich. Building developer tools, compilers, and exploring the edges of AI. Explore my interactive galaxy portfolio.",
  keywords: [
    "software engineer",
    "developer",
    "Zürich",
    "compilers",
    "language design",
    "AI",
    "Kotlin",
    "portfolio",
  ],
  authors: [{ name: "Ari von Nordenskjöld" }],
  openGraph: {
    title: "Ari von Nordenskjöld",
    description:
      "Exploring technology and building cool stuff. Based in Zürich. Building developer tools, compilers, and exploring the edges of AI. Journey through my galaxy portfolio.",
    url: "https://vnord.net",
    siteName: "vnord.net",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ari von Nordenskjöld",
    description:
      "Exploring technology and building cool stuff. Based in Zürich. Building developer tools, compilers, and exploring the edges of AI.",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "256x256" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050510" />
      </head>
      <body
        className={`${poppins.variable} ${mulish.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
