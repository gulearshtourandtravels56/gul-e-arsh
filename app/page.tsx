import HeroSection from '../components/heroSection';
import PackageList from '../components/packageList';
import ServiceList from '../components/serviceList';
import Locations from '../components/locations';
import WhyChooseUs from '../components/whyChooseUs';
import Testimonials from '../components/testimonials';
import CTASection from '../components/CTASection';
import AboutPreview from '../components/aboutPreview';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

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
      <CTASection />
      <Footer />
    </>
  );
}
