import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gul-e-Arsh - Your Ultimate Kashmir Travel Guide",
  description: "Discover the breathtaking beauty of Kashmir with Gul-e-Arsh. Your ultimate travel guide to the paradise on earth, offering curated tour packages, insider tips, and unforgettable experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}