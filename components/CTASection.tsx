"use client";

import { useScrollAnimation } from "@/services/hooks/useUtils";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { getContactInfo, getSiteImages } from "@/services/dataService";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./loader";

export default function CTASection() {
  const [ref, isVisible] = useScrollAnimation();
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState<any>({ phone: null });
  const [siteImages, setSiteImages] = useState<any>([]);

  useEffect(() => {
    const fetchSiteImages = async () => {
      setSiteImages(await getSiteImages());
    };
    const fetchContact = async () => {
      setContact(await getContactInfo());
    };
    setLoading(true);
    fetchSiteImages();
    fetchContact();
    setLoading(false);
  }, []);

  return (
    <>
      {" "}
      {loading && <Loader />}
      <section className="py-32 relative overflow-hidden" id="cta-section">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={siteImages.find((img: any) => img.key === "cta")?.url}
            alt="Kashmir landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-dark/90" />
        </div>

        {/* Floating decorations */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-light/10 rounded-full blur-3xl animate-float delay-300" />

        <div
          ref={ref as any}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <span
            className={`inline-block text-primary-light text-sm font-semibold uppercase tracking-widest mb-3 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Ready to Explore?
          </span>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight ${
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            }`}
          >
            Your Dream Kashmir Trip
            <br />
            Is Just One Step Away
          </h2>

          <p
            className={`text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${
              isVisible ? "animate-fade-up delay-200" : "opacity-0"
            }`}
          >
            Let us craft the perfect itinerary for you. From snow-capped
            mountains to serene lakes — your Kashmir adventure awaits.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-5 ${
              isVisible ? "animate-fade-up delay-300" : "opacity-0"
            }`}
          >
            <Link
              href="/packages"
              className="group flex items-center gap-3 bg-white text-dark px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
              id="cta-explore"
            >
              Explore Packages
              <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href={`tel:${contact.phone}`}
              className="group flex items-center gap-3 glass text-white px-8 py-2 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
              id="cta-call"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center animate-pulse-glow">
                <FiPhone className="w-4 h-4" />
              </div>
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
