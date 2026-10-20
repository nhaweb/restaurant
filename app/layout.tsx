import type { Metadata } from "next";
import { Beau_Rivage, Inter } from "next/font/google";
import { PreOrderProvider } from "@/components/shop/CartProvider";
import { RestaurantJsonLd } from "@/lib/json-ld";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

/** Variable Inter — one file instead of per-weight downloads */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Script accent — non-critical; optional avoids blocking first paint */
const script = Beau_Rivage({
  variable: "--font-script-face",
  subsets: ["latin", "vietnamese"],
  weight: "400",
  display: "optional",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${script.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <PreOrderProvider>
          <RestaurantJsonLd />
          {children}
        </PreOrderProvider>
      </body>
    </html>
  );
}
