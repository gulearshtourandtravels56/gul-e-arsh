import { getWhyChooseUs } from '../services/dataService';
import { useScrollAnimation, getIconForKey } from '../hooks/useUtils';

export default function WhyChooseUs() {
  const reasons = getWhyChooseUs();
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-32 bg-dark relative overflow-hidden" id="why-choose-us-section">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <span
            className={`inline-block text-primary-light text-sm font-semibold uppercase tracking-widest mb-3 ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            Why Choose Us
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 ${
              isVisible ? 'animate-fade-up delay-100' : 'opacity-0'
            }`}
          >
            The
            <span className="text-primary-light"> Gul-e-Arsh</span> Difference
          </h2>
          <p
            className={`text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
              isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
            }`}
          >
            We don't just plan trips — we create memories that last a lifetime
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ reason, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Number */}
      <span className="absolute top-6 right-6 text-5xl font-bold text-white/5 group-hover:text-primary/10 transition-colors duration-500">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary group-hover:to-primary-dark flex items-center justify-center text-2xl mb-5 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30">
        {getIconForKey(reason.icon)}
      </div>

      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-light transition-colors duration-300">
        {reason.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {reason.description}
      </p>
    </div>
  );
}
