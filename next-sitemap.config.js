/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gulearshtourandtravel.in',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    sitemaps: [
      'https://gulearshtourandtravel.in/sitemap.xml',
      'https://gulearshtourandtravel.in/server-sitemap.xml',
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
    host: 'https://gulearshtourandtravel.in',
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
          href: `https://gulearshtourandtravel.in${path}`,
          hrefLang: 'en-US',
        },
      ],
    };
  },
  additionalPaths: async (config) => [
    {
      loc: 'https://gulearshtourandtravel.in',
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString(),
    },
  ],
};