'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  services: number;
  testimonials: number;
  siteImages: number;
  packages: number;
  locations: number;
  team: number;
  gallery: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ 
    services: 0, 
    testimonials: 0, 
    siteImages: 0,
    packages: 0,
    locations: 0,
    team: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, testimonialsRes, imagesRes, packagesRes, locationsRes, teamRes, galleryRes] = await Promise.all([
          fetch('/api/admin/services', { cache: 'no-store' }),
          fetch('/api/admin/testimonials', { cache: 'no-store' }),
          fetch('/api/admin/site-images', { cache: 'no-store' }),
          fetch('/api/admin/packages', { cache: 'no-store' }),
          fetch('/api/admin/locations', { cache: 'no-store' }),
          fetch('/api/admin/team', { cache: 'no-store' }),
          fetch('/api/admin/gallery', { cache: 'no-store' }),
        ]);

        const servicesData = await servicesRes.json();
        const testimonialsData = await testimonialsRes.json();
        const imagesData = await imagesRes.json();
        const packagesData = await packagesRes.json();
        const locationsData = await locationsRes.json();
        const teamData = await teamRes.json();
        const galleryData = await galleryRes.json();

        setStats({
          services: servicesData.data?.length || 0,
          testimonials: testimonialsData.data?.length || 0,
          siteImages: imagesData.data?.length || 0,
          packages: packagesData.data?.length || 0,
          locations: locationsData.data?.length || 0,
          team: teamData.data?.length || 0,
          gallery: galleryData.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const sections = [
    {
      title: 'Company Info',
      href: '/admin/company',
      icon: '🏢',
      description: 'Update company details',
      color: 'from-secondary to-secondary-dark',
      stat: 0,
    },
    {
      title: 'Contact Info',
      href: '/admin/contact',
      icon: '📞',
      description: 'Update contact details',
      color: 'from-accent to-accent-dark',
      stat: 0,
    },
    {
      title: 'Services',
      href: '/admin/services',
      icon: '🛎️',
      description: 'Manage service offerings',
      color: 'from-primary to-primary-dark',
      stat: stats.services,
    },
    {
      title: 'Packages',
      href: '/admin/packages',
      icon: '🎒',
      description: 'Manage tour packages',
      color: 'from-primary to-primary-dark',
      stat: stats.packages,
    },
    {
      title: 'Locations',
      href: '/admin/locations',
      icon: '📍',
      description: 'Manage destinations',
      color: 'from-secondary to-secondary-dark',
      stat: stats.locations,
    },
    {
      title: 'Gallery',
      href: '/admin/gallery',
      icon: '🖼️',
      description: 'Manage Gallery',
      color: 'from-primary to-primary-dark',
      stat: stats.gallery,
    },
    {
      title: 'Team',
      href: '/admin/team',
      icon: '👥',
      description: 'Manage team members',
      color: 'from-accent to-accent-dark',
      stat: stats.team,
    },
    {
      title: 'Testimonials',
      href: '/admin/testimonials',
      icon: '💬',
      description: 'Manage customer reviews',
      color: 'from-secondary to-secondary-dark',
      stat: stats.testimonials,
    },
    {
      title: 'Why Choose Us',
      href: '/admin/why-choose-us',
      icon: '⭐',
      description: 'Manage reasons to choose us',
      color: 'from-accent to-accent-dark',
      stat: 0,
    },
    {
      title: 'Site Images',
      href: '/admin/site-images',
      icon: '🖼️',
      description: 'Manage site images',
      color: 'from-primary to-primary-dark',
      stat: stats.siteImages,
    },

  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin panel. Manage all website content from here.</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin text-3xl">⏳</div>
          <p className="text-gray-600 mt-4">Loading stats...</p>
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-12">
            {[
              { label: 'Services', value: stats.services, color: 'bg-gradient-to-br from-primary/10 to-primary-dark/10 border-primary/20 text-primary' },
              { label: 'Testimonials', value: stats.testimonials, color: 'bg-gradient-to-br from-secondary/10 to-secondary-dark/10 border-secondary/20 text-secondary' },
              { label: 'Packages', value: stats.packages, color: 'bg-gradient-to-br from-accent/10 to-accent-dark/10 border-accent/20 text-accent-dark' },
              { label: 'Locations', value: stats.locations, color: 'bg-gradient-to-br from-primary/10 to-primary-dark/10 border-primary/20 text-primary' },
              { label: 'Gallery', value: stats.gallery, color: 'bg-gradient-to-br from-secondary/10 to-secondary-dark/10 border-secondary/20 text-secondary' },
              { label: 'Team Members', value: stats.team, color: 'bg-gradient-to-br from-secondary/10 to-secondary-dark/10 border-secondary/20 text-secondary' },
              { label: 'Images', value: stats.siteImages, color: 'bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200 text-purple-700' },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.color} rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow text-center`}>
                <p className="text-xs font-semibold opacity-75 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Sections Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {sections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className={`group bg-gradient-to-br ${section.color} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white overflow-hidden hover:-translate-y-2`}
                >
                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{section.icon}</span>
                      {section.stat > 0 && (
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                          {section.stat}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    <p className="text-sm opacity-90">{section.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium gap-2 group-hover:gap-3 transition-all">
                      <span>Manage</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
