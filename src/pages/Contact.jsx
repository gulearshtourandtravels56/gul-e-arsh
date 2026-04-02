import { useState } from 'react';
import { getContactInfo, getCompanyName } from '../services/dataService';
import { useScrollAnimation } from '../hooks/useUtils';
import {
  FiPhone, FiMail, FiMapPin, FiSend, FiCheck, FiInstagram, FiFacebook, FiClock,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const contact = getContactInfo();
  const companyName = getCompanyName();
  const [ref, isVisible] = useScrollAnimation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" id="contact-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-primary-dark" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] opacity-10 bg-cover bg-center" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className={`inline-block text-primary-light text-sm font-semibold uppercase tracking-widest mb-3 ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            Get in Touch
          </span>
          <h1
            className={`text-4xl sm:text-5xl font-bold text-white mb-5 ${
              isVisible ? 'animate-fade-up delay-100' : 'opacity-0'
            }`}
          >
            Contact
            <span className="text-primary-light"> Us</span>
          </h1>
          <p
            className={`text-gray-400 max-w-2xl mx-auto text-lg ${
              isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
            }`}
          >
            We'd love to hear from you. Reach out to plan your perfect Kashmir getaway.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-surface" id="contact-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <ContactInfo contact={contact} companyName={companyName} />

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm
                formState={formState}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitted={isSubmitted}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-gray-200 relative" id="contact-map">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-dark/5 flex items-center justify-center">
          <div className="text-center">
            <FiMapPin className="w-12 h-12 text-primary mx-auto mb-3" />
            <p className="text-dark font-semibold">{contact.address}</p>
            <p className="text-gray-500 text-sm mt-1">Visit us in the heart of Kashmir</p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfo({ contact, companyName }) {
  const [ref, isVisible] = useScrollAnimation();

  const contactItems = [
    {
      icon: FiPhone,
      label: 'Call Us',
      value: contact.phone,
      href: `tel:${contact.phone}`,
      description: 'Mon-Sun, 8am to 10pm IST',
    },
    {
      icon: FiMail,
      label: 'Email Us',
      value: contact.email,
      href: `mailto:${contact.email}`,
      description: 'We respond within 24 hours',
    },
    {
      icon: FiMapPin,
      label: 'Visit Us',
      value: contact.address,
      href: null,
      description: 'Our office in Kashmir',
    },
    {
      icon: FiClock,
      label: 'Working Hours',
      value: 'Mon - Sun: 8 AM - 10 PM',
      href: null,
      description: 'We\'re available every day',
    },
  ];

  return (
    <div
      ref={ref}
      className={`lg:col-span-2 ${isVisible ? 'animate-fade-right' : 'opacity-0'}`}
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 mb-6">
        <h2 className="text-2xl font-bold text-dark mb-2">Let's Talk</h2>
        <p className="text-gray-500 text-sm mb-8">
          Have questions about our tours? We're here to help you plan the perfect trip.
        </p>

        <div className="space-y-5">
          {contactItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center flex-shrink-0 transition-all duration-300">
                <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-semibold text-dark hover:text-primary transition-colors text-sm"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-semibold text-dark text-sm">{item.value}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5">
        <h3 className="font-bold text-dark mb-4">Follow Us</h3>
        <div className="flex gap-3">
          {contact.socials.instagram && (
            <a
              href={contact.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-purple-500/30"
              aria-label="Instagram"
            >
              <FiInstagram className="w-5 h-5" />
            </a>
          )}
          {contact.socials.facebook && (
            <a
              href={contact.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-blue-600/30"
              aria-label="Facebook"
            >
              <FiFacebook className="w-5 h-5" />
            </a>
          )}
          {contact.socials.whatsapp && (
            <a
              href={contact.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-green-500/30"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactForm({ formState, handleChange, handleSubmit, isSubmitted }) {
  const [ref, isVisible] = useScrollAnimation();

  if (isSubmitted) {
    return (
      <div
        ref={ref}
        className="bg-white rounded-3xl p-12 shadow-lg shadow-black/5 flex flex-col items-center justify-center text-center min-h-[500px]"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-scale-in">
          <FiCheck className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-dark mb-3 animate-fade-up">Message Sent!</h3>
        <p className="text-gray-500 animate-fade-up delay-100">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`bg-white rounded-3xl p-8 shadow-lg shadow-black/5 ${
        isVisible ? 'animate-fade-left' : 'opacity-0'
      }`}
    >
      <h2 className="text-2xl font-bold text-dark mb-2">Send Us a Message</h2>
      <p className="text-gray-500 text-sm mb-8">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="package">Package Enquiry</option>
              <option value="custom">Custom Tour Request</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about your dream Kashmir trip..."
            required
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
          id="contact-submit"
        >
          <FiSend className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          Send Message
        </button>
      </form>
    </div>
  );
}
