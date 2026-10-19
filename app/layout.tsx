import type { Metadata } from "next";
import { Inter, Miniver } from "next/font/google";
import { CartProvider } from "@/components/shop/CartProvider";
import { RestaurantJsonLd } from "@/lib/json-ld";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const miniver = Miniver({
  variable: "--font-miniver",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${miniver.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <RestaurantJsonLd />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
