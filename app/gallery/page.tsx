import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GalleryClient from "./galleryClient";

export const metadata: Metadata = {
  title: "Customer Gallery | Gul-e-Arsh Tour & Travels",
  description:
    "Browse real customer travel moments from Kashmir tours with Gul-e-Arsh.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <GalleryClient />
      <Footer />
    </>
  );
}
