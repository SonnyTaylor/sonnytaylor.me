import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sonny Taylor",
  description: "I ship software with AI and repair stuff",
  metadataBase: new URL("https://sonnytaylor.me"),
  openGraph: {
    title: "Sonny Taylor",
    description: "I ship software with AI and repair stuff",
    url: "https://sonnytaylor.me",
    siteName: "Sonny Taylor",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sonny Taylor",
    description: "I ship software with AI and repair stuff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
