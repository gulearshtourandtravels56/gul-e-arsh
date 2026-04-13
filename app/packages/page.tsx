import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import PackagesClient from "./packagesClient";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Kashmir Tour Packages | Honeymoon, Family & Adventure Tours by Gul-e-Arsh",
  description: "Explore 100+ curated Kashmir tour packages including honeymoon tours, family trips, and adventure expeditions. Book your perfect Kashmir experience with Gul-e-Arsh at the best prices.",
  keywords: ["Kashmir packages", "honeymoon tours Kashmir", "family tours Kashmir", "tour packages Srinagar", "Kashmir travel deals"],
  openGraph: {
    title: "Kashmir Tour Packages | Honeymoon, Family & Adventure Tours",
    description: "Explore 100+ curated Kashmir tour packages with Gul-e-Arsh.",
    url: "https://gulearshtourandtravels.in/packages",
    type: "website",
    images: [
      {
        url: "https://gulearshtourandtravels.in/assets/images/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Kashmir Tour Packages",
      },
    ],
  },
};

export default function Packages() {
  return (
    <>
      <Navbar />
      <PackagesClient />
      <Footer />
    </>
  );
}
