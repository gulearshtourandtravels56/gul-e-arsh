import type { Metadata } from "next";
import Navbar from "@/components/navbar"
import AboutClient from "./aboutClient"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About Gul-e-Arsh | Kashmir Tour Operator & Travel Experts",
  description: "Learn about Gul-e-Arsh Tour & Travels, your trusted Kashmir tour operator. Meet our expert team, read our mission, and discover why travelers choose us for unforgettable experiences since 2500+ happy journeys.",
  keywords: ["about Kashmir tours", "tour operator Kashmir", "travel company Kashmir", "Gul-e-Arsh team"],
  openGraph: {
    title: "About Gul-e-Arsh | Kashmir Tour Operator & Travel Experts",
    description: "Learn about Gul-e-Arsh Tour & Travels and our commitment to providing exceptional Kashmir tour experiences.",
    url: "https://gulearshtourandtravel.in/about",
    type: "website",
    images: [
      {
        url: "https://gulearshtourandtravel.in/assets/images/about-bg.png",
        width: 1200,
        height: 630,
        alt: "About Gul-e-Arsh - Kashmir Tour Operator",
      },
    ],
  },
};

const About = () => {
  return (
    <>
    <Navbar/>
    <AboutClient/>
    <Footer/>
    </>
  )
}

export default About