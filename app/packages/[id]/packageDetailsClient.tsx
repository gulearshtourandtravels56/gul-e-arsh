"use client";

import {
  getPackageById,
  getPhone,
  getEmail,
} from "../../../services/dataService";
import { useScrollAnimation } from "../../../services/hooks/useUtils";
import {
  FiMapPin,
  FiClock,
  FiArrowLeft,
  FiCheck,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function PackageDetails({ id }: { id: number }) {
  const pkg = getPackageById(id);
  const phone = getPhone();
  const email = getEmail();
  const whatappLink = `https://wa.me/${phone}?text=Hi, I'm interested in the ${pkg?.title} package (${pkg?.duration}, ${pkg?.price}). Please share more details.`;
  const [ref, isVisible] = useScrollAnimation();

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="text-7xl mb-6">🏔️</div>
          <h2 className="text-3xl font-bold text-dark mb-3">
            Package Not Found
          </h2>
          <p className="text-gray-500 mb-8">
            The package you're looking for doesn't exist.
          </p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[50vh] min-h-100 overflow-hidden"
        id="package-detail-hero"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />

        {/* Back button */}
        <Link
          href="/packages"
          className="absolute top-24 left-4 sm:left-8 glass text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all text-sm font-medium z-10"
          id="back-button"
        >
          <FiArrowLeft className="w-4 h-4" />
          Packages
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            {pkg.category && (
              <span className="inline-block glass text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-lg mb-4">
                {pkg.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {pkg.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1.5">
                <FiMapPin className="w-4 h-4" />
                {pkg.location}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock className="w-4 h-4" />
                {pkg.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-surface" id="package-detail-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={ref as any}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div
                className={`bg-white rounded-3xl p-8 shadow-lg shadow-black/5 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
              >
                <h2 className="text-2xl font-bold text-dark mb-4">
                  About This Package
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Highlights */}
              {pkg.highlights && pkg.highlights.length > 0 && (
                <div
                  className={`bg-white rounded-3xl p-8 shadow-lg shadow-black/5 ${
                    isVisible ? "animate-fade-up delay-100" : "opacity-0"
                  }`}
                >
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    Tour Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pkg.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                          <FiCheck className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-dark">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div
                  className={`bg-white rounded-3xl p-8 shadow-lg shadow-black/5 ${
                    isVisible ? "animate-fade-up delay-200" : "opacity-0"
                  }`}
                >
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    Day-wise Itinerary
                  </h2>
                  <div className="space-y-4">
                    {pkg.itinerary.map((day, i) => (
                      <ItineraryDay
                        key={i}
                        day={day}
                        isLast={i === pkg.itinerary.length - 1}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions */}
              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <div
                  className={`bg-white rounded-3xl p-8 shadow-lg shadow-black/5 ${
                    isVisible ? "animate-fade-up delay-300" : "opacity-0"
                  }`}
                >
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    What's Included
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pkg.inclusions.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <FiCheck className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <div
                className={`bg-white rounded-3xl p-8 shadow-xl shadow-black/5 sticky top-36 ${
                  isVisible ? "animate-fade-left" : "opacity-0"
                }`}
              >
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 mb-1">Starting from</p>
                  <p className="text-4xl font-bold gradient-text">
                    {pkg.price}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">per person</p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-dark">
                      {pkg.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location</span>
                    <span className="font-semibold text-dark">
                      {pkg.location.split(",")[0]}
                    </span>
                  </div>
                  {pkg.category && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Category</span>
                      <span className="font-semibold text-dark capitalize">
                        {pkg.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Enquiry Buttons */}
                <div className="space-y-3">
                  <a
                    href={whatappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                    id="enquiry-whatsapp"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Enquire on WhatsApp
                  </a>

                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-3 w-full bg-linear-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                    id="enquiry-call"
                  >
                    <FiPhone className="w-5 h-5" />
                    Call Us Now
                  </a>

                  <a
                    href={`mailto:${email}?subject=Enquiry about ${pkg.title}&body=Hi, I'm interested in the ${pkg.title} package (${pkg.duration}, ${pkg.price}). Please share more details.`}
                    className="flex items-center justify-center gap-3 w-full bg-gray-100 hover:bg-gray-200 text-dark py-4 rounded-xl font-semibold transition-all duration-300"
                    id="enquiry-email"
                  >
                    <FiMail className="w-5 h-5" />
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ItineraryDay({ day, isLast }: { day: any; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg shadow-primary/20">
          {day.day}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-primary/20 mt-2" />}
      </div>

      {/* Content */}
      <div className="pb-8">
        <h3 className="text-base font-bold text-dark mb-2">{day.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{day.details}</p>
      </div>
    </div>
  );
}
