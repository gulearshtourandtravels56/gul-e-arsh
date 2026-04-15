'use client';

import Link from 'next/link';
import { getContactInfo, getSiteImages } from '@/services/dataService';
import { useScrollAnimation } from '@/services/hooks/useUtils';
import { FiArrowRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function AboutPreview() {
  const [company, setCompany] = useState<any>({});
  const [siteImages, setSiteImages] = useState<any>([]); 
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      setCompany(await getContactInfo());
    }
    const fetchSiteImages = async () => {
      setSiteImages(await getSiteImages());
    }
    fetchCompanyInfo();
    fetchSiteImages();
  }, []);

  return (
    <section className="py-32 bg-white" id="about-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref as any} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div
            className={`relative ${isVisible ? 'animate-fade-left' : 'opacity-0'}`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src={siteImages.find((img: any) => img.key === 'about')?.url}
                alt="Kashmir landscape"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl shadow-black/10 animate-float">
              <p className="text-3xl font-bold text-primary">2500+</p>
              <p className="text-sm text-gray-500">Happy Travellers</p>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div className={`${isVisible ? 'animate-fade-right delay-200' : 'opacity-0'}`}>
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6 leading-tight">
              Your Trusted
              <span className="gradient-text"> Kashmir</span>
              <br />
              Travel Partner
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 text-base">
              {company.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: '🏔️', text: 'Expert Local Guides' },
                { icon: '🛡️', text: 'Safety Guaranteed' },
                { icon: '💰', text: 'Best Price Promise' },
                { icon: '🎧', text: '24/7 Support' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-dark">{item.text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              id="about-read-more"
            >
              Learn More About Us
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}