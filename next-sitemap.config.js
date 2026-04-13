/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gulearshtourandtravels.in',
  generateRobotsTxt: true,

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/_next',
          '/private',
        ],
      },
    ],
  },

  // Sitemap settings
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  outDir: 'public',

  // Customize each URL
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }

    // Important pages
    else if (path === '/packages' || path === '/locations') {
      priority = 0.9;
      changefreq = 'weekly';
    }

    // Secondary pages
    else if (path === '/about' || path === '/contact') {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: `${config.siteUrl}${path}`, // IMPORTANT: absolute URL
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};