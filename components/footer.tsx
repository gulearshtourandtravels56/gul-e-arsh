"use client";

import {
  getCompanyInfo,
  getContactInfo,
  getContactSocials,
  getServices,
} from "@/services/dataService";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiChevronRight,
  FiInstagram,
  FiFacebook,
  FiArrowUp,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/public/assets/images/logo.png";
import Loader from "./loader";

export default function Footer() {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<any>({
    name: null,
  });
  const [services, setServices] = useState<any>([]);
  const [contact, setContact] = useState<any>({
    phone: null,
    email: null,
    address: null,
    address_link: null,
  });
  const [contactSocials, setContactSocials] = useState<any>([]);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      setCompany(await getCompanyInfo());
    };
    const fetchContact = async () => {
      setContact(await getContactInfo());
    };
    const fetchContactSocials = async () => {
      setContactSocials(await getContactSocials());
    };
    const fetchServices = async () => {
      setServices(await getServices());
    };
    setLoading(true);
    fetchCompanyInfo();
    fetchContact();
    fetchContactSocials();
    fetchServices();
    setLoading(false);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/packages", label: "Tour Packages" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      {loading && <Loader />}
      <footer
        className="relative bg-dark text-white overflow-hidden"
        id="main-footer"
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={logo.src}
                  alt={"G"}
                  className="w-11 h-11 rounded-xl  flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30"
                />
                <div>
                  <h3 className="text-base font-bold">
                    {company.name?.split(" ").slice(0, 1).join(" ")}
                  </h3>
                  <p className="text-[10px] text-primary-light tracking-wider uppercase">
                    Tour & Travels
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {company.tagline}
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {contactSocials.find(
                  (social: any) => social.platform === "instagram",
                ) && (
                  <a
                    href={
                      contactSocials.find(
                        (social: any) => social.platform === "instagram",
                      ).url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <FiInstagram className="w-4 h-4" />
                  </a>
                )}
                {contactSocials.find(
                  (social: any) => social.platform === "facebook",
                ) && (
                  <a
                    href={
                      contactSocials.find(
                        (social: any) => social.platform === "facebook",
                      ).url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Facebook"
                  >
                    <FiFacebook className="w-4 h-4" />
                  </a>
                )}
                {contactSocials.find(
                  (social: any) => social.platform === "whatsapp",
                ) && (
                  <a
                    href={
                      contactSocials.find(
                        (social: any) => social.platform === "whatsapp",
                      ).url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      className="flex items-center gap-2 text-gray-400 hover:text-primary-light transition-all duration-300 text-sm group"
                    >
                      <FiChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.slice(0, 5).map((service: any, index: number) => (
                  <li key={index}>
                    <span className="flex items-center gap-2 text-gray-400 text-sm">
                      <FiChevronRight className="w-3 h-3 text-primary-light shrink-0" />
                      {service.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                Get in Touch
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-start gap-3 text-gray-400 hover:text-primary-light transition-colors text-sm group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <FiPhone className="w-4 h-4 text-primary-light" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Call Us</p>
                      <p className="font-medium">{contact.phone}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-3 text-gray-400 hover:text-primary-light transition-colors text-sm group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <FiMail className="w-4 h-4 text-primary-light" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Email Us</p>
                      <p className="font-medium">{contact.email}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={contact.address_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-400 hover:text-primary-light transition-colors text-sm group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <FiMapPin className="w-4 h-4 text-primary-light" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Visit Us</p>
                      <p className="font-medium">{contact.address}</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-xs text-center sm:text-left">
                © {new Date().getFullYear()} {company.name}. All rights
                reserved. Crafted with ❤️ in Kashmir.
              </p>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
                aria-label="Back to top"
                id="back-to-top"
              >
                <FiArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
