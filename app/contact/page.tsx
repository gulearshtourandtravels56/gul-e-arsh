import type { Metadata } from "next";
import Navbar from "@/components/navbar"
import ContactClient from "./contactClient"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact Gul-e-Arsh | Kashmir Tour Operator | WhatsApp, Call, Email",
  description: "Get in touch with Gul-e-Arsh Tour & Travels. Call +91 9149598891, email us, or message via WhatsApp. We're here to answer your Kashmir tour questions and customize your perfect trip.",
  keywords: ["contact Kashmir tours", "tour booking Kashmir", "Kashmir travel support", "Gul-e-Arsh contact"],
  openGraph: {
    title: "Contact Gul-e-Arsh | Kashmir Tour Operator",
    description: "Get in touch with Gul-e-Arsh Tour & Travels for your Kashmir tour inquiries.",
    url: "https://gulearshtourandtravels.in/contact",
    type: "website",
  },
};

const Contact = () => {
  return (
    <>
    <Navbar/>
    <ContactClient/>
    <Footer/>
    </>
  )
}

export default Contact