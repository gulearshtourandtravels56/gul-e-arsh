import { useState } from 'react';
import { getTestimonials } from '../services/dataService';
import { useScrollAnimation } from '../hooks/useUtils';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

export default function Testimonials() {
  const testimonials = getTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, isVisible] = useScrollAnimation();

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
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
    <section className="py-32 bg-surface" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <span
            className={`inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3 ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            Testimonials
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-5 ${
              isVisible ? 'animate-fade-up delay-100' : 'opacity-0'
            }`}
          >
            Stories from the
            <span className="gradient-text"> Valley</span>
          </h2>
          <p
            className={`text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
              isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
            }`}
          >
            Real memories from travelers who explored the mountains, sailed the lakes, and fell in love with Kashmir
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <TestimonialCard key={`${currentIndex}-${index}`} testimonial={testimonial} index={index} />
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
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
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
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-3xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? 'animate-scale-in' : 'opacity-0'
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
        <span className="absolute -top-4 -left-2 text-6xl text-primary/10 font-serif leading-none">"</span>
        <p className="text-gray-600 text-sm leading-relaxed relative z-10 pl-4">
          {testimonial.review}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <h4 className="font-semibold text-dark text-sm">{testimonial.name}</h4>
          <p className="text-xs text-gray-400">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
