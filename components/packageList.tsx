"use client";

import { getPopularPackages } from "@/services/dataService";
import PackageCard from "./packageCard";
import { useScrollAnimation } from "@/services/hooks/useUtils";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./loader";

export default function PackageList() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<any[]>([]);
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    const fetchPopularPackages = async () => {
      setPackages(await getPopularPackages());
    };
    setLoading(true);
    fetchPopularPackages();
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <section className="py-32 bg-gradient-to-bl from-dark to-primary-dark" id="popular-packages-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div ref={ref as any} className="text-center mb-16">
            <span
              className={`inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Our Packages
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 mb-5 ${
                isVisible ? "animate-fade-up delay-100" : "opacity-0"
              }`}
            >
              Popular
              <span className="gradient-text"> Tour Packages</span>
            </h2>
            <p
              className={`text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
                isVisible ? "animate-fade-up delay-200" : "opacity-0"
              }`}
            >
              Handpicked experiences to connect you with the beauty and
              wilderness of Kashmir
            </p>
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-12">
            <Link
              href="/packages"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
              id="view-all-packages"
            >
              View All Packages
              <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
