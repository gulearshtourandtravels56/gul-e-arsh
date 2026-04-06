'use client';

import Link from 'next/link';
import { getCompanyName, getCompanyTagline, getSiteImages } from '../services/dataService';
import { useScrollAnimation } from '../services/hooks/useUtils';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

export default function HeroSection() {
  const companyName = getCompanyName();
  const tagline = getCompanyTagline();
  const siteImages = getSiteImages();
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero-section"
      ref={ref as any}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={siteImages.hero}
          alt="Kashmir landscape"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/30 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-300" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl  mt-25 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8 transition-all duration-700 ${
            isVisible ? 'animate-fade-down' : 'opacity-0'
          }`}
        >
          <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">Kashmir's Trusted Travel Partner</span>
        </div>

        {/* Main heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          Discover the Magic of
          <br />
          <span className="bg-gradient-to-r from-primary-light via-accent-light to-primary-light bg-clip-text text-transparent">
            Kashmir
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`inline-flex items-center text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {tagline}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 transition-all duration-700 delay-400 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <Link
            href="/packages"
            className="group flex items-center p-4 gap-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl text-base font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1"
            id="hero-explore-cta"
          >
            Explore Packages
            <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group flex items-center gap-3 glass text-white px-8 py-2 rounded-2xl text-base font-semibold hover:bg-white/20 transition-all duration-300"
            id="hero-contact-cta" 
          >
            <div className="w-16 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <FiPlay className="w-4 h-6 ml-0.5" />
            </div>
            <p className="text-base font-semibold w-32 h-full" >Plan Your Trip</p>
          </Link>
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-700 delay-600 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {[
            { value: '2500+', label: 'Happy Travellers' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '50+', label: 'Expert Guides' },
            { value: '100+', label: 'Curated Packages' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl px-4 py-4 text-center hover:bg-white/15 transition-all duration-300"
            >
              <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* // Scroll indicator
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div> */}
    </section>
  );
}
