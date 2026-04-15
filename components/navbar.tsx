"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getCompanyInfo, getContactInfo } from "@/services/dataService";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import Link from "next/link";
import logo from "@/public/assets/images/logo.png";
import Loader from "./loader";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<any>({
    name: null,
    tagline: null,
    description: null,
    mission: null,
    phone: null,
  });
  const [contact, setContact] = useState<any>({ phone: null });
  useEffect(() => {
    setLoading(true);
    const fetchCompanyInfo = async () => {
      setCompany(await getCompanyInfo());
    };
    const fetchContact = async () => {
      setContact(await getContactInfo());
    };
    fetchCompanyInfo();
    fetchContact();
    setLoading(false);
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Navbar should look solid when scrolled OR when mobile menu is open
  const showSolid = isScrolled || isMobileMenuOpen;

  return (
    <>
      {/* Navbar bar — always on top */}
      {loading && <Loader />}
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          showSolid
            ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              id="navbar-logo"
            >
              <div>
                <img
                  src={logo.src}
                  alt="Logo"
                  className="h-full object-cover scale-150 w-[45px]"
                />
              </div>
              <div>
                <h1
                  className={`text-lg font-bold leading-tight transition-colors duration-300 ${
                    showSolid ? "text-dark" : "text-white"
                  }`}
                >
                  {company.name?.split(" ").slice(0, 1).join(" ")}
                </h1>
                <p
                  className={`text-[10px] font-medium tracking-wider uppercase transition-colors duration-300 ${
                    showSolid ? "text-primary" : "text-white/80"
                  }`}
                >
                  Tour & Travels
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
              {navLinks.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? showSolid
                          ? "text-primary bg-primary/10"
                          : "text-white bg-white/20 backdrop-blur-sm"
                        : showSolid
                          ? "text-gray-600 hover:text-primary hover:bg-primary/5"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${contact.phone}`}
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  showSolid
                    ? "text-gray-600 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
                id="navbar-phone"
              >
                <FiPhone className="w-4 h-4" />
                {contact.phone}
              </a>
              <Link
                href="/packages"
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                id="navbar-cta"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                showSolid
                  ? "text-dark hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              id="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — rendered as a sibling, NOT inside header */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        id="mobile-menu"
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Slide-in panel */}
        <div
          className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl transform transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-lg font-bold text-dark">Menu</h2>
                <p className="text-xs text-gray-400">Navigate our pages</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    style={{ animationDelay: `${i * 0.08}s` }}
                    className={`px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 animate-fade-left ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-4 border-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary transition-colors"
              >
                <FiPhone className="w-5 h-5" />
                <span className="font-medium">{contact.phone}</span>
              </a>
              <Link
                href="/packages"
                className="mt-4 block text-center bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Explore Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
