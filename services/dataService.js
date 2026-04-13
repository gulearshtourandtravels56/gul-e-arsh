/**
 * Data Service — Centralized data access layer.
 * All components import from here instead of directly importing the JSON.
 * This makes it easy to later replace with an API without changing components.
 */

import data from '../data/data.json';

// Simulate async loading for future API compatibility
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Site Images ─────────────────────────────────────────
export const getSiteImages = () => data.siteImages || {};

// ─── Company ─────────────────────────────────────────────
export const getCompanyInfo = () => data.company;
export const getCompanyName = () => data.company.name;
export const getCompanyTagline = () => data.company.tagline;
export const getCompanyDescription = () => data.company.description;
export const getCompanyMission = () => data.company.mission;
export const getCompanyStats = () => data.company.stats;

// ─── Contact ─────────────────────────────────────────────
export const getContactInfo = () => data.contact;
export const getPhone = () => data.contact.phone;
export const getEmail = () => data.contact.email;
export const getAddress = () => data.contact.address;
export const getAddressLink = () => data.contact.addressLink;
export const getSocials = () => data.contact.socials;

// ─── Services ────────────────────────────────────────────
export const getServices = () => data.services;

// ─── Why Choose Us ───────────────────────────────────────
export const getWhyChooseUs = () => data.whyChooseUs;

// ─── Testimonials ────────────────────────────────────────
export const getTestimonials = () => data.testimonials;

// ─── Packages ────────────────────────────────────────────
export const getPackages = () => data.packages;
export const getPackageById = (id) => data.packages.find((pkg) => pkg.id === Number(id));
export const getPackagesByCategory = (category) =>
  data.packages.filter((pkg) => pkg.category === category);
export const getPopularPackages = () =>
  data.packages.filter((pkg) => pkg.category === 'popular').length > 0
    ? data.packages.filter((pkg) => pkg.category === 'popular')
    : data.packages.slice(0, 3);

// ─── FAQs ────────────────────────────────────────────────
export const getFaqs = () => data.faqs || [];

// ─── Locations ───────────────────────────────────────────
export const getLocations = () => data.locations || [];
export const getLocationById = (id) => (data.locations || []).find((l) => l.id === Number(id));

// ─── Gallery ─────────────────────────────────────────────
export const getGallery = () => data.gallery || [];

// ─── Async versions (for future API replacement) ─────────
export const fetchPackages = async () => {
  await delay(0);
  return getPackages();
};

export const fetchPackageById = async (id) => {
  await delay(0);
  return getPackageById(id);
};

export const fetchCompanyInfo = async () => {
  await delay(0);
  return getCompanyInfo();
};

// ─── Full data export (use sparingly) ────────────────────
export const getAllData = () => data;

export const getTeamDetails = () => data.team || [];

export default {
  getCompanyInfo,
  getCompanyName,
  getCompanyTagline,
  getCompanyDescription,
  getCompanyMission,
  getCompanyStats,
  getContactInfo,
  getPhone,
  getEmail,
  getAddress,
  getSocials,
  getServices,
  getWhyChooseUs,
  getTestimonials,
  getPackages,
  getPackageById,
  getPackagesByCategory,
  getPopularPackages,
  getFaqs,
  getLocations,
  getGallery,
  fetchPackages,
  fetchPackageById,
  fetchCompanyInfo,
  getAllData,
};
