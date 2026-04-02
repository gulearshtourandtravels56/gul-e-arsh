'use client';

import { getServices } from '../services/dataService';
import { useScrollAnimation, getIconForKey } from '../services/hooks/useUtils';

export default function ServiceList() {
  const services = getServices();
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-32 bg-white" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref as any} className="text-center mb-16">
          <span
            className={`inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3 ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            What We Offer
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-5 ${
              isVisible ? 'animate-fade-up delay-100' : 'opacity-0'
            }`}
          >
            Our
            <span className="gradient-text"> Services</span>
          </h2>
          <p
            className={`text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
              isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
            }`}
          >
            From planning to execution, we handle every detail so you can focus on enjoying the journey
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref as any}
      className={`group relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Hover gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center text-2xl mb-5 transition-all duration-300">
          {getIconForKey(service.icon)}
        </div>

        <h3 className="text-lg font-bold text-dark group-hover:text-white mb-3 transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-300">
          {service.description}
        </p>
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 group-hover:bg-white/10 rounded-full transition-all duration-500 group-hover:scale-150" />
    </div>
  );
}
