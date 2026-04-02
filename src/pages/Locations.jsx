import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocations } from '../services/dataService';
import { useScrollAnimation } from '../hooks/useUtils';
import { FiMapPin, FiCalendar, FiSearch, FiArrowRight, FiTriangle } from 'react-icons/fi';

export default function LocationsPage() {
  const allLocations = getLocations();
  const [search, setSearch] = useState('');

  const filtered = allLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      (loc.bestFor || []).some((b) => b.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden" id="locations-hero">
        <div className="absolute inset-0">
          <img
            src="/images/srinagar.png"
            alt="Kashmir destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-dark/80 via-dark/60 to-dark/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-primary-light text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-up">
            Explore Kashmir
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up delay-100">
            Our <span className="gradient-text">Destinations</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            Six extraordinary corners of the Kashmir Valley, each with its own soul, season, and story
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto animate-fade-up delay-300">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search destinations, activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              id="locations-search"
            />
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mb-8">
            Showing <span className="font-semibold text-dark">{filtered.length}</span> destination{filtered.length !== 1 ? 's' : ''}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🏔️</p>
              <h3 className="text-xl font-semibold text-dark mb-2">No destinations found</h3>
              <p className="text-gray-500">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((loc, i) => (
                <LocationFullCard key={loc.id} loc={loc} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function LocationFullCard({ loc, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={loc.image}
          alt={loc.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        {/* Altitude badge */}
        <div className="absolute top-3 left-3 bg-dark/70 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          <FiTriangle className="w-3.5 h-3.5 text-primary-light" />
          <span className="text-white text-xs font-semibold">{loc.altitude}</span>
        </div>

        {/* Best time */}
        <div className="absolute top-3 right-3 glass px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          <FiCalendar className="w-3 h-3 text-white/80" />
          <span className="text-white text-xs font-medium">{loc.bestTime}</span>
        </div>

        {/* Location name overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{loc.name}</h3>
          <p className="text-white/70 text-xs italic">{loc.subtitle}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{loc.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {loc.highlights.map((h, i) => (
            <span key={i} className="px-2.5 py-1 bg-primary/8 text-primary text-xs font-medium rounded-lg">
              {h}
            </span>
          ))}
        </div>

        {/* Best for tags */}
        {loc.bestFor && (
          <div className="flex flex-wrap gap-1.5 mb-5 pb-4 border-b border-gray-100">
            <span className="text-xs text-gray-400 font-medium mr-1 self-center">Best for:</span>
            {loc.bestFor.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">{tag}</span>
            ))}
          </div>
        )}

        {/* Meta + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <FiMapPin className="w-3.5 h-3.5" />
            {loc.distanceFromSrinagar} from Srinagar
          </div>
          <Link
            to={`/locations/${loc.id}`}
            className="group/btn inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors duration-200"
            id={`location-detail-${loc.id}`}
          >
            Explore
            <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
