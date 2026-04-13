import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gul-e-Arsh - Kashmir Tour Packages & Travel Guide | Best Travel Agency",
  description: "Discover the breathtaking beauty of Kashmir with Gul-e-Arsh. Premium tour packages, honeymoon tours, family trips, and expert guides for unforgettable Kashmir experiences.",
  keywords: ["Kashmir tours", "Kashmir travel packages", "Kashmir honeymoon", "Srinagar tours", "lake tours Kashmir", "Kashmir travel agency"],
  metadataBase: new URL("https://gulearshtourandtravels.in"),
  alternates: {
    canonical: "https://gulearshtourandtravels.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gulearshtourandtravels.in",
    siteName: "Gul-e-Arsh Tour & Travels",
    title: "Gul-e-Arsh - Kashmir Tour Packages & Travel Guide",
    description: "Premium Kashmir tour packages, honeymoon tours, and family trips with expert local guides. Book your unforgettable Kashmir experience today.",
    images: [
      {
        url: "https://gulearshtourandtravels.in/assets/images/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Kashmir Paradise - Gul-e-Arsh Tour & Travels",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gul-e-Arsh - Kashmir Tour Packages & Travel Guide",
    description: "Premium Kashmir tour packages, honeymoon tours, and family trips with expert local guides.",
    images: ["https://gulearshtourandtravels.in/assets/images/hero-bg.png"],
    creator: "@gulearshtour",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "your-google-search-console-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Gul-e-Arsh Tour & Travels",
    description: "Premium Kashmir tour operator offering customized packages, honeymoon tours, and family trips",
    url: "https://gulearshtourandtravels.in",
    logo: "https://gulearshtourandtravels.in/assets/images/logo.png",
    image: "https://gulearshtourandtravels.in/assets/images/hero-bg.png",
    telephone: "+91 9149598891",
    email: "gulearshtourandtravels56@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Kashmir",
      postalCode: "193401",
      streetAddress: "Chichilora, Magam main road",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+91 9149598891",
      email: "gulearshtourandtravels56@gmail.com",
    },
    sameAs: [
      "https://www.instagram.com/gulearshtour",
      "https://www.facebook.com/share/18a9iu4j5d/",
      "https://wa.me/919149598891/",
    ],
    priceRange: "$$",
  };

  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="canonical" href="https://gulearshtourandtravels.in" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/images/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}