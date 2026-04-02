'use client';

import Link from 'next/link';
import { getLocations } from '../services/dataService';
import { useScrollAnimation } from '../services/hooks/useUtils';
import { FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';

export default function Locations() {
  const locations = getLocations().slice(0, 3); // Show first 3 on home
  const [ref, isVisible] = useScrollAnimation();

  if (!locations.length) return null;

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="locations-section">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref as any} className="text-center mb-16">
          <span className={`inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Destinations
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-5 ${isVisible ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
            Explore Our <span className="gradient-text">Locations</span>
          </h2>
          <p className={`text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            From hidden meadows to famous peaks — every corner of Kashmir has a story waiting to be lived
          </p>
        </div>

        {/* 3-card preview grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {locations.map((loc, i) => (
            <LocationCard key={loc.id} loc={loc} index={i} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/locations"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
            id="view-all-locations"
          >
            View All Destinations
            <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function LocationCard({ loc, index }: { loc: any; index: number }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <Link
      href={`/locations/${loc.id}`}
      ref={ref as any}
      className={`group block relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      id={`location-card-${loc.id}`}
    >
      {/* Image */}
      <div className="relative h-72">
        <img
          src={loc.image}
          alt={loc.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Best time badge */}
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FiCalendar className="w-3 h-3 text-white/80" />
          <span className="text-white text-xs font-medium">{loc.bestTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-1.5 text-primary-light text-xs font-medium mb-1">
          <FiMapPin className="w-3 h-3" />
          Kashmir, India
        </div>
        <h3 className="text-xl font-bold text-white mb-0.5">{loc.name}</h3>
        <p className="text-white/60 text-xs italic mb-3">{loc.subtitle}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5">
        {loc.highlights.slice(0, 2).map((h: string) => (
            <span key={h} className="glass px-2.5 py-1 rounded-md text-white text-[11px] font-medium">{h}</span>
          ))}
          <span className="glass px-2.5 py-1 rounded-md text-white text-[11px] font-medium">+{loc.highlights.length - 2} more</span>
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-2 text-primary-light text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Explore Destination
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
