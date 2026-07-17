import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vnord.net"),
  title: {
    default: "Ari von Nordenskjöld",
    template: "%s · Ari von Nordenskjöld",
  },
  description:
    "Software engineer in Zürich building developer tools, compilers, language systems, and applied AI—presented as an interactive planetary portfolio.",
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
      "Developer tools, compilers, language design, and applied AI—explore the work as an interactive planetary system.",
    url: "/",
    siteName: "vnord.net",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ari von Nordenskjöld — software engineer in Zürich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ari von Nordenskjöld",
    description:
      "Developer tools, compilers, language design, and applied AI from Zürich.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/mark.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
      <body>{children}</body>
    </html>
  );
}
