"use client";

import Link from "next/link";
import { useScrollAnimation } from "../services/hooks/useUtils";
import { FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";

export default function PackageCard({
  pkg,
  index = 0,
}: {
  pkg: any;
  index: number;
}) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref as any}
      className={`group bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? "animate-fade-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      id={`package-card-${pkg.id}`}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          onClick={() => {
            // Navigate to package details page on image click
            window.location.href = `/packages/${pkg.id}`;
          }}
        />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-dark px-4 py-2 rounded-xl shadow-lg">
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="text-lg font-bold text-primary">{pkg.price}</p>
        </div>

        {/* Category Badge */}
        {pkg.category && (
          <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-lg">
            <span className="text-white text-xs font-semibold uppercase tracking-wider">
              {pkg.category}
            </span>
          </div>
        )}

        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90">
          <FiMapPin className="w-3.5 h-3.5" />
          <span className="text-sm font-medium">{pkg.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-2">
          <FiClock className="w-3.5 h-3.5" />
          {pkg.duration}
        </div>

        <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
          {pkg.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
          {pkg.shortDescription || pkg.description}
        </p>

        {/* Highlights preview */}
        {pkg.highlights && (
          <div className="flex flex-wrap gap-2 mb-5">
            {pkg.highlights.slice(0, 3).map((h: string, i: number) => (
              <span
                key={i}
                className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-lg font-medium"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/packages/${pkg.id}`}
          className="group/btn flex items-center justify-between w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary hover:to-primary-dark text-dark hover:text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
          id={`view-package-${pkg.id}`}
        >
          View Details
          <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
