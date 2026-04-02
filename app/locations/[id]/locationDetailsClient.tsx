'use client';

import { useState, useEffect } from "react";
import {
  getLocationById,
  getPackageById,
  getPhone,
} from "../../../services/dataService";
import {
  FiArrowLeft,
  FiMapPin,
  FiTriangle,
  FiCalendar,
  FiCheck,
  FiMessageSquare,
  FiPhone,
} from "react-icons/fi";
import Link from "next/link";

export default function LocationDetails({ id }: { id: number }) {
  const location = getLocationById(id);
  const phone = getPhone();

  const [selectedItem, setSelectedItem] = useState(null) as any;

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4">
        <p className="text-6xl mb-4">🏔️</p>
        <h2 className="text-2xl font-bold text-dark mb-2">
          Destination not found
        </h2>
        <p className="text-gray-500 mb-6">
          This destination doesn't exist in our list.
        </p>
        <Link
          href="/locations"
          className="btn-primary px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
        >
          View All Locations
        </Link>
      </div>
    );
  }

  const relatedPackages = (location.relatedPackageIds || [])
    .map((id) => getPackageById(id))
    .filter(Boolean);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative h-[60vh] min-h-105 overflow-hidden"
        id="location-detail-hero"
      >
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-dark/50 via-dark/30 to-dark/80" />

        {/* Back button */}
        <div className="absolute top-28 left-4 sm:left-8 lg:left-12">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 glass text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            All Destinations
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-primary-light text-sm font-medium mb-2">
              <FiMapPin className="w-4 h-4" />
              Kashmir, India
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
              {location.name}
            </h1>
            <p className="text-white/70 text-lg italic">{location.subtitle}</p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-5">
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                <FiTriangle className="w-4 h-4 text-primary-light" />
                <span className="text-white text-sm font-semibold">
                  {location.altitude}
                </span>
              </div>
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-primary-light" />
                <span className="text-white text-sm font-semibold">
                  {location.bestTime}
                </span>
              </div>
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-primary-light" />
                <span className="text-white text-sm font-semibold">
                  {location.distanceFromSrinagar} from Srinagar
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ── Left: content ── */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-dark mb-4">
                  About {location.name}
                </h2>
                <p className="text-gray-600 leading-relaxed text-base mb-4">
                  {location.description}
                </p>
                {location.longDescription && (
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {location.longDescription}
                  </p>
                )}
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-dark mb-6">
                  Top Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {location.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <FiCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-dark text-sm font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to See */}
              {location.whatToSee && location.whatToSee.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    What to See & Do
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {location.whatToSee.map((item, i) => (
                      <div
                        key={i}
                        className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8 hover:scale-105 transition-all duration-300"
                      >
                        {/* Image */}
                        {item.image && (
                          <div className="relative h-36 overflow-hidden cursor-pointer" onClick={() => setSelectedItem(item)}>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-2 left-3">
                              <span className="glass text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                {item.title}
                              </span>
                            </div>
                          </div>
                        )}
                        {/* Text */}
                        <div className="p-4">
                          {!item.image && (
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-bold text-xs">
                                  {i + 1}
                                </span>
                              </div>
                              <h4 className="font-bold text-dark text-sm">
                                {item.title}
                              </h4>
                            </div>
                          )}
                          {item.image && (
                            <h4 className="font-bold text-dark text-sm mb-1">
                              {item.title}
                            </h4>
                          )}
                          <p className="text-gray-500 text-xs leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Best For */}
              {location.bestFor && (
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-dark mb-5">
                    Best For
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {location.bestFor.map((tag, i) => (
                      <span
                        key={i}
                        className="px-5 py-2.5 bg-primary/8 text-primary font-semibold text-sm rounded-xl border border-primary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Packages */}
              {relatedPackages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    Packages Visiting{" "}
                    <span className="gradient-text">{location.name}</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedPackages.map((pkg : any) => (
                      <Link
                        key={pkg.id}
                        href={`/packages/${pkg.id}`}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:scale-105 transition-all duration-400 hover:-translate-y-1"
                      >
                        <div className="relative h-36 overflow-hidden">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-white font-bold text-sm">
                              {pkg.title}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                            {pkg.price}
                          </div>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">
                              {pkg.duration}
                            </p>
                            <p className="text-xs text-gray-400">
                              {pkg.location}
                            </p>
                          </div>
                          <span className="text-primary text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                            View <FiArrowLeft className="w-3 h-3 rotate-180" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Sticky sidebar ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-5">
                {/* Enquiry card */}
                <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-bold text-dark mb-1">
                    Plan a Trip to {location.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Get a personalised itinerary — free and no obligation
                  </p>

                  <a
                    href={`https://wa.me/${phone.replace(/\D/g, "")}?text=Hi! I'm interested in visiting ${location.name}. Can you help me plan a trip?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white px-5 py-3.5 rounded-xl font-semibold mb-3 hover:bg-[#128C7E] transition-colors duration-200"
                    id={`location-whatsapp-${id}`}
                  >
                    <FiMessageSquare className="w-5 h-5" />
                    Enquire on WhatsApp
                  </a>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white px-5 py-3.5 rounded-xl font-semibold hover:bg-primary-dark transition-colors duration-200"
                    id={`location-call-${id}`}
                  >
                    <FiPhone className="w-5 h-5" />
                    Call Us Now
                  </a>
                </div>

                {/* Quick info card */}
                <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-base font-bold text-dark mb-4">
                    Quick Info
                  </h3>
                  <div className="space-y-3">
                    <InfoRow
                      label="Altitude"
                      value={location.altitude}
                      icon={<FiTriangle />}
                    />
                    <InfoRow
                      label="Best Time"
                      value={location.bestTime}
                      icon={<FiCalendar />}
                    />
                    <InfoRow
                      label="Distance"
                      value={location.distanceFromSrinagar + " from Srinagar"}
                      icon={<FiMapPin />}
                    />
                  </div>
                </div>

                {/* Browse all packages CTA */}
                <Link
                  href="/packages"
                  className="block text-center bg-surface border border-gray-200 text-dark px-5 py-4 rounded-2xl font-semibold text-sm hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  Browse All Packages →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for What to See & Do images */}
      {selectedItem && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-999 p-4" onClick={() => setSelectedItem(null)}>
          <div className="relative w-[90vw] h-auto max-w-162.5 max-h-[90vh] bg-transparent rounded-lg sm:rounded-lg overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full overflow-y-auto">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-auto"
              />
              <div className="z-999 absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black to-transparent text-white overflow-hidden">
                <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-sm">{selectedItem.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-white text-2xl bg-transparent rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-colors z-10"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary text-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 leading-none mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-dark">{value}</p>
      </div>
    </div>
  );
}
