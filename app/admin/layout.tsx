'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiMenu,
  FiX,
  FiImage,
  FiBriefcase,
  FiPhone,
  FiTool,
  FiStar,
  FiMessageSquare,
  FiPackage,
  FiMapPin,
  FiHelpCircle,
  FiUsers,
  FiGrid,
  FiGlobe,
  FiLogOut,
} from 'react-icons/fi';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const sections = [
    { name: 'Company', href: '/admin/company', icon: FiBriefcase },
    { name: 'Contact', href: '/admin/contact', icon: FiPhone },
    { name: 'Locations', href: '/admin/locations', icon: FiMapPin },
    { name: 'Packages', href: '/admin/packages', icon: FiPackage },
    { name: 'Gallery', href: '/admin/gallery', icon: FiGrid },
    { name: 'Services', href: '/admin/services', icon: FiTool },
    { name: 'Team', href: '/admin/team', icon: FiUsers },
    { name: 'Why Choose Us', href: '/admin/why-choose-us', icon: FiStar },
    { name: 'Testimonials', href: '/admin/testimonials', icon: FiMessageSquare },
    { name: 'FAQs', href: '/admin/faqs', icon: FiHelpCircle },
    { name: 'Site Images', href: '/admin/site-images', icon: FiImage },
  ];

  return (
    <div className="flex min-h-screen bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-20'
        } hidden md:flex bg-linear-to-b from-slate-950 via-slate-900 to-slate-800 text-white transition-all duration-300 fixed h-screen flex-col shadow-2xl z-40`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Admin
              </h1>
              <p className="text-xs text-slate-400">Gul-e-Arsh</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition text-slate-300"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sections.map((section) => {
            const isActive = pathname === section.href;
            return (
              <Link
                key={section.href}
                href={section.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <section.icon className="text-lg shrink-0" />
                {sidebarOpen && <span>{section.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="w-full mb-2 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/15 transition text-sm text-slate-300 hover:text-red-300 font-medium"
          >
            <FiLogOut className="text-lg" />
            {sidebarOpen && <span>Logout</span>}
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700/50 transition text-sm text-slate-300 hover:text-white font-medium"
          >
            <FiGlobe className="text-lg" />
            {sidebarOpen && <span>View Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 flex flex-col ${sidebarOpen ? 'md:ml-72' : 'md:ml-20'} ml-0`}>
        <div className="md:hidden bg-slate-950 text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
          <div>
            <h1 className="text-lg font-semibold">Admin</h1>
            <p className="text-xs text-slate-400">Gul-e-Arsh</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition text-slate-300"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden bg-slate-950 text-white p-3 space-y-2 shadow-inner">
            {sections.map((section) => {
              const isActive = pathname === section.href;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <section.icon className="text-lg shrink-0" />
                  <span>{section.name}</span>
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/15 transition text-sm text-slate-300 hover:text-red-300 font-medium"
            >
              <FiLogOut className="text-lg" />
              <span>Logout</span>
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700/50 transition text-sm text-slate-300 hover:text-white font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiGlobe className="text-lg" />
              <span>View Site</span>
            </Link>
          </nav>
        )}

        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
