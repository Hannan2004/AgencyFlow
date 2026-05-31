import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgencyFlow",
  description: "White-label invoicing for agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}