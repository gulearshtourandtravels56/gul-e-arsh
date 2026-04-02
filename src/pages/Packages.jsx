import { useState, useMemo } from 'react';
import { getPackages } from '../services/dataService';
import PackageCard from '../components/PackageCard';
import { useScrollAnimation } from '../hooks/useUtils';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

export default function Packages() {
  const allPackages = getPackages();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [ref, isVisible] = useScrollAnimation();

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(allPackages.map((p) => p.category).filter(Boolean))];
    return cats;
  }, [allPackages]);

  // Filter and sort
  const filteredPackages = useMemo(() => {
    let result = [...allPackages];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(query) ||
          pkg.location.toLowerCase().includes(query) ||
          pkg.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((pkg) => pkg.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    }

    return result;
  }, [allPackages, searchQuery, selectedCategory, sortBy]);

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" id="packages-hero">
        <div className="absolute inset-0 bg-linear-to-br from-dark via-dark-light to-primary-dark" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] opacity-10 bg-cover bg-center" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

        <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className={`inline-block text-primary-light text-sm font-semibold uppercase tracking-widest mb-3 ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            Explore Kashmir
          </span>
          <h1
            className={`text-4xl sm:text-5xl font-bold text-white mb-5 ${
              isVisible ? 'animate-fade-up delay-100' : 'opacity-0'
            }`}
          >
            Our Tour
            <span className="text-primary-light"> Packages</span>
          </h1>
          <p
            className={`text-gray-400 max-w-2xl mx-auto text-lg ${
              isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
            }`}
          >
            Choose from our curated collection of Kashmir experiences, each designed to create memories that
            last forever
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm" id="package-filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search packages by name, destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                id="package-search"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <FiFilter className="w-4 h-4 text-gray-400 hidden lg:block" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  id={`filter-${cat}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
              id="package-sort"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="py-16 bg-surface" id="packages-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPackages.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-8">
                Showing <span className="font-semibold text-dark">{filteredPackages.length}</span> package
                {filteredPackages.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg, index) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-dark mb-2">No packages found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSortBy('default');
                }}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
