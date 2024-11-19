import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "./providers";

const codeBold = localFont({
  src: "./fonts/code-bold.otf",
  variable: "--font-code-bold",
});

export const metadata: Metadata = {
  title: "Infoscreen",
  description: "SAE Zurich Infoscreen",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Infoscreen",
    description: "SAE Zurich Infoscreen",
    type: "website",
    locale: "en_US",
    url: "https://infoscreen.vercel.app",
    siteName: "Infoscreen",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Infoscreen Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infoscreen",
    description: "SAE Zurich Infoscreen",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${codeBold.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
