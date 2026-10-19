import type { Metadata } from "next";
import { Beau_Rivage, Inter } from "next/font/google";
import { PreOrderProvider } from "@/components/shop/CartProvider";
import { RestaurantJsonLd } from "@/lib/json-ld";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Script accent — Miniver lacks Vietnamese glyphs and broke layout */
const script = Beau_Rivage({
  variable: "--font-script-face",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: "400",
  display: "swap",
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
