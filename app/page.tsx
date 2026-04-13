import type { Metadata } from "next";
import HeroSection from '@/components/heroSection';
import PackageList from '@/components/packageList';
import ServiceList from '@/components/serviceList';
import Locations from '@/components/locations';
import WhyChooseUs from '@/components/whyChooseUs';
import Testimonials from '@/components/testimonials';
import CTASection from '@/components/CTASection';
import AboutPreview from '@/components/aboutPreview';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import OurTeam from '@/components/ourTeam';

export const metadata: Metadata = {
  title: "Gul-e-Arsh - Kashmir Tour Packages & Travel Guide | Best Travel Agency",
  description: "Discover the breathtaking beauty of Kashmir with Gul-e-Arsh. Premium tour packages, honeymoon tours, family trips, and expert guides for unforgettable Kashmir experiences.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutPreview />
      <PackageList />
      <ServiceList />
      <Locations />
      <WhyChooseUs />
      <Testimonials />
      <OurTeam />
      <CTASection />
      <Footer />
    </>
  );
}
