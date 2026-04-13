/**
 * SEO Utilities for Gul-e-Arsh Tour & Travels
 * Provides schema markup, metadata generation, and SEO helpers
 */

const SITE_URL = "https://gulearshtourandtravels.in";
const SITE_NAME = "Gul-e-Arsh Tour & Travels";

export const seoConfig = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  defaultImage: "/assets/images/hero-bg.png",
  defaultTwitter: "@gulearshtour",
};

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    description:
      "Premium Kashmir tour operator offering customized packages, honeymoon tours, and family trips",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo.png`,
    image: `${SITE_URL}/assets/images/hero-bg.png`,
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
    areaServed: ["Kashmir", "Srinagar", "Gulmarg", "Pahalgam"],
  };
}

/**
 * Generate Tour Package Schema
 */
export function generateTourPackageSchema(
  name: string,
  description: string,
  price: string | number,
  duration: string,
  image?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "@id": `${SITE_URL}/#offer-${name.replace(/\s+/g, "-").toLowerCase()}`,
    name: name,
    description: description,
    image: image || `${SITE_URL}${seoConfig.defaultImage}`,
    price: price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    offerCount: "100+",
    seller: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
    },
    duration: duration,
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbs(
  items: Array<{
    name: string;
    url: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage Schema
 */
export function generateFAQSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Local Business Schema
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: `${SITE_URL}/assets/images/logo.png`,
    telephone: "+91 9149598891",
    email: "gulearshtourandtravels56@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Kashmir",
      postalCode: "193401",
      streetAddress: "Chichilora, Magam main road",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.0837",
      longitude: "75.5670",
    },
  };
}

/**
 * Generate Aggregate Rating Schema
 */
export function generateAggregateRatingSchema(
  ratingValue: number = 4.9,
  reviewCount: number = 2500,
  bestRating: number = 5
) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "@id": `${SITE_URL}/#aggregateRating`,
    ratingValue: ratingValue,
    reviewCount: reviewCount,
    bestRating: bestRating,
    name: "Gul-e-Arsh Tour & Travels Rating",
  };
}

/**
 * Generate WebPage Schema
 */
export function generateWebPageSchema(
  title: string,
  description: string,
  image?: string,
  datePublished?: string,
  dateModified?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    headline: title,
    description: description,
    image: image || `${SITE_URL}${seoConfig.defaultImage}`,
    url: SITE_URL,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/images/logo.png`,
      },
    },
  };
}

/**
 * Generate Open Graph Meta Tags
 */
export function generateOpenGraphTags(
  title: string,
  description: string,
  image: string = seoConfig.defaultImage,
  url: string = SITE_URL,
  type: string = "website"
) {
  return {
    og: {
      type: type,
      url: url,
      title: title,
      description: description,
      image: image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      image: image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`,
      creator: seoConfig.defaultTwitter,
    },
  };
}

/**
 * Generate Canonical URL
 */
export function generateCanonical(path: string = "") {
  return `${SITE_URL}${path}`;
}

/**
 * Generate Sitemap Entry
 */
export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  images?: Array<{
    loc: string;
    title?: string;
  }>;
}

export function generateSitemapEntries(): SitemapEntry[] {
  return [
    {
      url: SITE_URL,
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/packages`,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/locations`,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      changefreq: "monthly",
      priority: 0.7,
    },
  ];
}

/**
 * Generate Meta Keywords
 */
export function generateKeywords(keywords: string[]): string {
  const baseKeywords = [
    "Kashmir tours",
    "Kashmir travel",
    "tour packages",
    "Srinagar tours",
  ];
  return [...new Set([...baseKeywords, ...keywords])].join(", ");
}

/**
 * Generate Structured Data for Social Profiles
 */
export function generateSocialProfileSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [
      "https://www.instagram.com/gulearshtour",
      "https://www.facebook.com/share/18a9iu4j5d/",
      "https://wa.me/919149598891/",
    ],
  };
}

/**
 * Merge multiple schema contexts
 */
export function mergeSchemas(...schemas: any[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((s) => {
      const { "@context": _, ...rest } = s;
      return rest;
    }),
  };
}
