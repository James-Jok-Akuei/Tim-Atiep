import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Clean, heavy-contrast display serif that holds up at projection distance.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "TIM ATIEP — The Tree of Shade · Book Launch",
  description:
    "Live presentation for the official launch of TIM ATIEP (The Tree of Shade), a poetry collection by Adut Loi Akok. University of Juba, Unipod Hall.",
};

export const viewport: Viewport = {
  themeColor: "#1b2b47",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-clean-white">{children}</body>
    </html>
  );
}
