"use client";

import {
  getPackageById,
  getContactInfo,
  getContactSocials,
  getPackageHighlights,
  getPackageItinerary,
  getPackageInclusions,
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
import { useEffect, useState } from "react";

export default function PackageDetails({ id }: { id: number }) {
  const [contact, setContact] = useState<any>({});
  const [packageInfo, setPackageInfo] = useState<any>([]);
  const [packageHighlights, setPackageHighlights] = useState<any>([]);
  const [packageItinerary, setPackageItinerary] = useState<any>([]);
  const [packageInclusions, setPackageInclusions] = useState<any>([]);
  const [socials, setSocials] = useState<any>({});

  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    const fetchPackageData = async () => {
      setPackageInfo(await getPackageById(id));
    };
    const fetchPackageHighlights = async () => {
      setPackageHighlights(await getPackageHighlights(id));
    };
    const fetchPackageItinerary = async () => {
      setPackageItinerary(await getPackageItinerary(id));
    };
    const fetchPackageInclusions = async () => {
      setPackageInclusions(await getPackageInclusions(id));
    };
    const fetchContact = async () => {
      setContact(await getContactInfo());
    };
    const fetchContactSocials = async () => {
      setSocials(await getContactSocials());
    };

    fetchPackageData();
    fetchPackageHighlights();
    fetchPackageItinerary();
    fetchPackageInclusions();
    fetchContact();
    fetchContactSocials();
  }, [id]);

  const whatsappLink = (pkg: any, socials: any[]) => {
    const baseUrl = (Array.isArray(socials) ? socials : []).find(
      (scl) => scl.platform === "whatsapp",
    )?.url;

    return `${baseUrl}?text=Hi, I'm interested in the ${pkg.title} package.`;
  };
  if (!packageInfo) {
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
          src={packageInfo.image}
          alt={packageInfo.title}
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
            {packageInfo.category && (
              <span className="inline-block glass text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-lg mb-4">
                {packageInfo.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {packageInfo.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1.5">
                <FiMapPin className="w-4 h-4" />
                {packageInfo.location}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock className="w-4 h-4" />
                {packageInfo.duration}
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
                  {packageInfo.description}
                </p>
              </div>

              {/* Highlights */}
              {packageInfo.highlights && packageInfo.highlights.length > 0 && (
                <div
                  className={`bg-white rounded-3xl p-8 shadow-lg shadow-black/5 ${
                    isVisible ? "animate-fade-up delay-100" : "opacity-0"
                  }`}
                >
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    Tour Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {packageHighlights.map(
                      (highlight: { highlight: string }, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                            <FiCheck className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm font-medium text-dark">
                            {highlight.highlight}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {packageItinerary && packageItinerary.length > 0 && (
                <div
                  className={`bg-white rounded-3xl p-8 shadow-lg shadow-black/5 ${
                    isVisible ? "animate-fade-up delay-200" : "opacity-0"
                  }`}
                >
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    Day-wise Itinerary
                  </h2>
                  <div className="space-y-4">
                    {packageItinerary.map((itinerary: any, i: number) => (
                      <ItineraryDay
                        key={i}
                        itinerary={itinerary}
                        isLast={i === packageItinerary.length - 1}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions */}
              {packageInclusions && packageInclusions.length > 0 && (
                <div
                  className={`bg-white rounded-3xl p-8 shadow-lg shadow-black/5 ${
                    isVisible ? "animate-fade-up delay-300" : "opacity-0"
                  }`}
                >
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    What's Included
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packageInclusions.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <FiCheck className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm text-gray-600">
                          {item.inclusion}
                        </span>
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
                    {packageInfo.price}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">per person</p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-dark">
                      {packageInfo.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location</span>
                    <span className="font-semibold text-dark">
                      {packageInfo?.location?.split(",")[0]}
                    </span>
                  </div>
                  {packageInfo.category && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Category</span>
                      <span className="font-semibold text-dark capitalize">
                        {packageInfo.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Enquiry Buttons */}
                <div className="space-y-3">
                  <a
                    href={whatsappLink(packageInfo, socials)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                    id="enquiry-whatsapp"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Enquire on WhatsApp
                  </a>

                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center justify-center gap-3 w-full bg-linear-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                    id="enquiry-call"
                  >
                    <FiPhone className="w-5 h-5" />
                    Call Us Now
                  </a>

                  <a
                    href={`mailto:${contact.email}?subject=Enquiry about ${packageInfo.title}&body=Hi, I'm interested in the ${packageInfo.title} package (${packageInfo.duration}, ${packageInfo.price}). Please share more details.`}
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

function ItineraryDay({
  itinerary,
  isLast,
}: {
  itinerary: any;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg shadow-primary/20">
          {itinerary.day}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-primary/20 mt-2" />}
      </div>

      {/* Content */}
      <div className="pb-8">
        <h3 className="text-base font-bold text-dark mb-2">
          {itinerary.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {itinerary.details}
        </p>
      </div>
    </div>
  );
}
