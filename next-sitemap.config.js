/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gulearshtourandtravels.in',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    sitemaps: [
      'https://gulearshtourandtravels.in/sitemap.xml',
      'https://gulearshtourandtravels.in/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/_next',
          '/private',
          '/*.json$',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    host: 'https://gulearshtourandtravels.in',
  },
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  outDir: 'public',
  transform: async (config, path) => {
    // Customize URLs here if needed
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/packages' || path === '/locations') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/about' || path === '/contact') {
      priority = 0.8;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://gulearshtourandtravels.in${path}`,
          hrefLang: 'en-US',
        },
      ],
    };
  },
  additionalPaths: async (config) => [
    {
      loc: 'https://gulearshtourandtravels.in',
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString(),
    },
  ],
};