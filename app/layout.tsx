import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import AuthDialog from "@/components/auth/AuthDialog";
import "./globals.css";
import "./ux.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KSIC Mysore Silk — Royal Heritage",
  description:
    "Mysore Silk — a luxury house of pure silk, gold zari, and generational craftsmanship from Mysuru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <AuthDialog />
      </body>
    </html>
  );
}
