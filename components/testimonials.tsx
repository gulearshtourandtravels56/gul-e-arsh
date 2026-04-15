"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/services/dataService";
import { useScrollAnimation } from "@/services/hooks/useUtils";
import { FiChevronLeft, FiChevronRight, FiStar, FiPlus, FiX, FiGrid } from "react-icons/fi";
import Loader from "./loader";
import AddTestimonialForm from "./addTestimonialForm";

export default function Testimonials() {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showAllView, setShowAllView] = useState(false);
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    const fetchTestimonials = async () => {
      setTestimonials(await getTestimonials());
    };
    setLoading(true);
    fetchTestimonials();
    setLoading(false);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const handleFormSuccess = async () => {
    // Refresh testimonials after successful submission
    const updatedTestimonials = await getTestimonials();
    setTestimonials(updatedTestimonials);
  };

  // Show 3 testimonials at a time on desktop, 1 on mobile
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      items.push(testimonials[idx]);
    }
    return items;
  };

  return (
    <>
      {loading && <Loader />}
      <section className="py-32 bg-surface relative" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View All Button - Corner */}
          <div className="absolute top-8 right-8 sm:top-12 sm:right-12">
            <button
              onClick={() => setShowAllView(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-105"
              title="View all testimonials"
            >
              <FiGrid className="w-4 h-4" />
              <span className="hidden sm:inline">All</span>
            </button>
          </div>

          {/* Section Header */}
          <div ref={ref as any} className="text-center mb-16">
            <span
              className={`inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Testimonials
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-5 ${
                isVisible ? "animate-fade-up delay-100" : "opacity-0"
              }`}
            >
              Stories from the
              <span className="gradient-text"> Valley</span>
            </h2>
            <p
              className={`text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
                isVisible ? "animate-fade-up delay-200" : "opacity-0"
              }`}
            >
              Real memories from travelers who explored the mountains, sailed
              the lakes, and fell in love with Kashmir
            </p>

            {/* Add Testimony Button */}
            <button
              onClick={() => setShowForm(true)}
              className={`inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-105 ${
                isVisible ? "animate-fade-up delay-300" : "opacity-0"
              }`}
            >
              <FiPlus className="w-5 h-5" />
              Share Your Story
            </button>
          </div>

          {/* Testimonial Cards */}
          {testimonials && testimonials.length > 0 && (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getVisibleTestimonials().map((testimonial, index) => (
                  <TestimonialCard
                    key={`${currentIndex}-${index}`}
                    testimonial={testimonial}
                    index={index}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={goToPrev}
                  className="w-12 h-12 rounded-xl bg-white border border-gray-200 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/30"
                  aria-label="Previous testimonial"
                  id="testimonial-prev"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "bg-primary w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="w-12 h-12 rounded-xl bg-white border border-gray-200 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/30"
                  aria-label="Next testimonial"
                  id="testimonial-next"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add Testimonial Form Modal */}
      {showForm && (
        <AddTestimonialForm
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* View All Testimonials Modal */}
      {showAllView && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-2xl font-bold">All Testimonials</h3>
              <button
                onClick={() => setShowAllView(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Testimonials Grid - Scrollable */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {testimonials && testimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                      key={`all-${index}`}
                      testimonial={testimonial}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No testimonials yet. Be the first to share!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: any;
  index: number;
}) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref as any}
      className={`group bg-white rounded-3xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? "animate-scale-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating || 5 }, (_, i) => (
          <FiStar key={i} className="w-4 h-4 text-accent fill-current" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-6">
        <span className="absolute -top-4 -left-2 text-6xl text-primary/10 font-serif leading-none">
          "
        </span>
        <p className="text-gray-600 text-sm leading-relaxed relative z-10 pl-4">
          {testimonial.review}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <h4 className="font-semibold text-dark text-sm">
            {testimonial.name}
          </h4>
          <p className="text-xs text-gray-400">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
