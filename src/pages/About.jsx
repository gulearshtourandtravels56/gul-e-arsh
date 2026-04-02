import {
  getCompanyInfo, getCompanyDescription, getCompanyMission,
  getServices, getWhyChooseUs, getCompanyStats,
} from '../services/dataService';
import { useScrollAnimation, getIconForKey } from '../hooks/useUtils';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function About() {
  const company = getCompanyInfo();
  const description = getCompanyDescription();
  const mission = getCompanyMission();
  const services = getServices();
  const whyChooseUs = getWhyChooseUs();
  const stats = getCompanyStats();
  const [ref, isVisible] = useScrollAnimation();

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" id="about-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-primary-dark" />
        <div className="absolute inset-0 bg-[url('/images/about-bg.png')] opacity-10 bg-cover bg-center" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

        <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className={`inline-block text-primary-light text-sm font-semibold uppercase tracking-widest mb-3 ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            About Us
          </span>
          <h1
            className={`text-4xl sm:text-5xl font-bold text-white mb-5 ${
              isVisible ? 'animate-fade-up delay-100' : 'opacity-0'
            }`}
          >
            Get to Know
            <span className="text-primary-light"> {company.name.split(' ').slice(0, 1).join(' ')}</span>
          </h1>
          <p
            className={`text-gray-400 max-w-2xl mx-auto text-lg ${
              isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
            }`}
          >
            {company.tagline}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white" id="our-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <ImageSection />

            {/* Content */}
            <StoryContent description={description} mission={mission} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection stats={stats} />

      {/* Services */}
      <section className="py-20 bg-white" id="about-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Services"
            title="What We"
            highlight=" Offer"
            description="Comprehensive travel solutions tailored to your needs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((service, i) => (
              <AboutServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-dark relative overflow-hidden" id="about-why-us">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Why Choose Us"
            title="The Gul-e-Arsh"
            highlight=" Promise"
            description="Why thousands of travellers trust us with their Kashmir dreams"
            dark
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {whyChooseUs.map((reason, i) => (
              <WhyUsCard key={i} reason={reason} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-center" id="about-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Ready to Start Your Kashmir Journey?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let's plan your perfect trip together. Our team is ready to make your travel dreams come true.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/packages"
              className="group flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              View Packages
              <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ label, title, highlight, description, dark = false }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className="text-center">
      <span
        className={`inline-block text-sm font-semibold uppercase tracking-widest mb-3 ${
          dark ? 'text-primary-light' : 'text-primary'
        } ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
      >
        {label}
      </span>
      <h2
        className={`text-3xl sm:text-4xl font-bold mb-5 ${
          dark ? 'text-white' : 'text-dark'
        } ${isVisible ? 'animate-fade-up delay-100' : 'opacity-0'}`}
      >
        {title}
        <span className={dark ? 'text-primary-light' : 'gradient-text'}>{highlight}</span>
      </h2>
      <p
        className={`max-w-2xl mx-auto text-lg ${
          dark ? 'text-gray-400' : 'text-gray-500'
        } ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}
      >
        {description}
      </p>
    </div>
  );
}

function ImageSection() {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`relative ${isVisible ? 'animate-fade-left' : 'opacity-0'}`}>
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
        <img
          src="/images/about-bg.png"
          alt="Kashmir mountains"
          className="w-full h-[400px] lg:h-[500px] object-cover"
        />
      </div>
      <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl animate-float">
        <p className="text-3xl font-bold text-primary">5+ Years</p>
        <p className="text-sm text-gray-500">of Experience</p>
      </div>
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
      <div className="absolute -bottom-4 left-8 w-16 h-16 bg-accent/10 rounded-full -z-10" />
    </div>
  );
}

function StoryContent({ description, mission }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`${isVisible ? 'animate-fade-right delay-200' : 'opacity-0'}`}>
      <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
        Our Story
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6 leading-tight">
        Crafting Unforgettable
        <span className="gradient-text"> Kashmir Experiences</span>
      </h2>
      <p className="text-gray-500 leading-relaxed mb-6">{description}</p>

      <div className="bg-primary/5 rounded-2xl p-6 border-l-4 border-primary mb-6">
        <h3 className="font-bold text-dark mb-2">Our Mission</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{mission}</p>
      </div>

      <Link
        to="/contact"
        className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
      >
        Get in Touch
        <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function StatsSection({ stats }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-r from-primary-dark via-primary to-primary-dark"
      id="about-stats"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutServiceCard({ service, index }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`group bg-surface rounded-2xl p-6 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center text-xl mb-4 transition-all duration-300">
        <span className="group-hover:scale-125 transition-transform">{getIconForKey(service.icon)}</span>
      </div>
      <h3 className="font-bold text-dark mb-2">{service.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
}

function WhyUsCard({ reason, index }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/20 group-hover:bg-primary flex items-center justify-center text-xl mb-4 transition-all duration-300">
        {getIconForKey(reason.icon)}
      </div>
      <h3 className="font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
        {reason.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
    </div>
  );
}
