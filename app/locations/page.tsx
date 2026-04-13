import type { Metadata } from "next";
import Navbar from "@/components/navbar"
import LocationsClient from "./locationsClient"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Kashmir Destinations & Locations | Srinagar, Gulmarg, Pahalgam Tours",
  description: "Explore top Kashmir destinations including Srinagar, Gulmarg, and Pahalgam. Discover insider tips, hidden gems, and best travel times for each location with Gul-e-Arsh.",
  keywords: ["Kashmir locations", "Srinagar tours", "Gulmarg skiing", "Pahalgam hiking", "Kashmir destinations", "where to visit Kashmir"],
  openGraph: {
    title: "Kashmir Destinations & Locations | Srinagar, Gulmarg, Pahalgam",
    description: "Explore top Kashmir destinations and plan your visit with expert guides and insider tips.",
    url: "https://gulearshtourandtravels.in/locations",
    type: "website",
    images: [
      {
        url: "https://gulearshtourandtravels.in/assets/images/srinagar.png",
        width: 1200,
        height: 630,
        alt: "Kashmir Locations & Destinations",
      },
    ],
  },
};

const Locations = () => {
  return (
    <>
    <Navbar />
    <LocationsClient />
    <Footer />
    </>
  )
}

export default Locations