## Core Web Vitals & Performance Optimization Guide

Google's Core Web Vitals are critical ranking factors. Ensure these metrics meet the "Good" threshold.

### 1. Largest Contentful Paint (LCP)
**Target:** < 2.5 seconds (Good)

**Optimization Strategies:**
- [ ] Minimize CSS blocking time
- [ ] Defer non-critical CSS
- [ ] Preload critical resources
- [ ] Optimize image loading
- [ ] Use appropriate image formats (WebP, AVIF)
- [ ] Implement lazy loading for non-critical images
- [ ] Cache strategy for static assets
- [ ] Minimize JavaScript execution

**Implementation:**
```typescript
// app/layout.tsx - preload critical resources
<link
  rel="preload"
  as="image"
  href="/assets/images/hero-bg.png"
  imagesrcset="/assets/images/hero-bg.webp"
/>
```

### 2. First Input Delay (FID) / Interaction to Next Paint (INP)
**Target:** < 100 ms (Good) for FID; < 200ms for INP

**Optimization Strategies:**
- [ ] Break up long JavaScript tasks (< 50ms each)
- [ ] Use web workers for heavy computations
- [ ] Defer third-party scripts
- [ ] Remove unused JavaScript
- [ ] Minimize main thread work
- [ ] Use React.lazy() for code splitting

**Implementation:**
```typescript
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { loading: () => <div>Loading...</div> }
);
```

### 3. Cumulative Layout Shift (CLS)
**Target:** < 0.1 (Good)

**Optimization Strategies:**
- [ ] Define explicit dimensions for images and videos
- [ ] Avoid injecting content above existing content
- [ ] Use transform animations instead of position changes
- [ ] Include size attributes in `<img>` tags
- [ ] Avoid auto-playing embedded content
- [ ] Reserve space for late-loading content (ads, embeds)

**Implementation:**
```typescript
// Always include width/height for images
<img
  src="/image.png"
  width={400}
  height={300}
  alt="Description"
/>

// or with Next.js Image
<Image
  src="/image.png"
  width={400}
  height={300}
  alt="Description"
/>
```

---

## Additional Performance Metrics

### 4. First Contentful Paint (FCP)
**Target:** < 1.8 seconds

**Strategies:**
- Eliminate render-blocking resources
- Inline critical CSS
- Preload fonts
- Defer non-critical JavaScript

### 5. Time to First Byte (TTFB)
**Target:** < 600 ms

**Strategies:**
- Implement server-side caching
- Use CDN for content delivery
- Optimize database queries
- Enable compression (already done in next.config)

### 6. Lighthouse Performance Score
**Target:** 90+ (Good)

**Factors:**
- First Contentful Paint (10%)
- Largest Contentful Paint (25%)
- Cumulative Layout Shift (25%)
- Total Blocking Time (30%)
- Speed Index (10%)

---

## Performance Checklist

### JavaScript Optimization
- [ ] Enable SWC minification (already done)
- [ ] Use dynamic imports for large components
- [ ] Remove unused dependencies
- [ ] Analyze bundle size with `next/bundle-analyzer`
- [ ] Implement tree-shaking
- [ ] Use native JavaScript where possible

### CSS Optimization
- [ ] Use Tailwind CSS purging (configured)
- [ ] Remove unused CSS
- [ ] Minify CSS
- [ ] Use CSS-in-JS sparingly
- [ ] Avoid inline styles (use CSS classes)

### Image Optimization
- [ ] Compress all images
- [ ] Use modern formats (WebP, AVIF)
- [ ] Implement responsive images
- [ ] Lazy load below-the-fold images
- [ ] Set explicit dimensions
- [ ] Use descriptive filenames

### Font Optimization
- [ ] Limit font families (2-3 maximum)
- [ ] Subset fonts (load only needed characters)
- [ ] Use system fonts as fallback
- [ ] Preload critical fonts
- [ ] Use `font-display: swap`

### Third-Party Scripts
- [ ] Defer analytics scripts
- [ ] Lazy load analytics
- [ ] Sandbox third-party content
- [ ] Monitor third-party performance

### Caching Strategy
- [ ] Set appropriate cache headers (already configured)
- [ ] Implement service workers for offline support
- [ ] Use browser caching
- [ ] CDN caching for static assets
- [ ] Cache busting for updated files

---

## Testing Tools

### Google Tools
- [PageSpeed Insights](https://pagespeed.web.dev/) - Measure Core Web Vitals
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Mobile optimization

### Additional Tools
- [WebPageTest](https://www.webpagetest.org/) - Detailed performance analysis
- [GTmetrix](https://gtmetrix.com/) - Waterfall charts and recommendations
- [Chrome DevTools](chrome://inspect) - Real-time debugging
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - JS bundle analysis

### Monitoring
- Google Search Console - Real user experience data
- Google Analytics - Conversion tracking
- New Relic/Datadog - Application performance monitoring

---

## Implementation Steps

### Step 1: Baseline Measurement
```bash
# Run Lighthouse audit
npx lighthouse https://gulearshtourandtravels.in --preset=desktop

# Check PageSpeed Insights
# https://pagespeed.web.dev/?url=https://gulearshtourandtravels.in
```

### Step 2: Optimize Critical Path
1. Identify render-blocking resources
2. Defer non-critical JavaScript
3. Inline critical CSS
4. Preload critical resources

### Step 3: Image Optimization
1. Compress all images
2. Convert to WebP/AVIF
3. Implement lazy loading
4. Set explicit dimensions

### Step 4: JavaScript Optimization
1. Code splitting with dynamic imports
2. Remove unused code
3. Minify and bundle optimization
4. Tree-shaking

### Step 5: Verify & Monitor
1. Re-run lighthouse audits
2. Monitor Core Web Vitals
3. Set up performance budgets
4. Continuous monitoring

---

## Recommended Next.js Build Commands

```bash
# Build with bundle analysis
npm run build -- --analyze

# Development with faster refresh
npm run dev

# Production build
npm run build

# Test production build locally
npm run build && npm start
```

---

## Performance Budget

Recommended performance budgets:

| Metric | Budget |
|--------|--------|
| JavaScript | <150KB (gzip) |
| CSS | <50KB (gzip) |
| Images | <200KB combined (initial LCP) |
| Total Page Size | <400KB (gzip) |
| Requests | <50 total |

---

## Monitoring & Reporting

Track these metrics over time:
- Core Web Vitals (LCP, FID/INP, CLS)
- Lighthouse scores
- Time to First Byte
- First Contentful Paint
- Speed Index
- Long Tasks

Use Google Search Console and Analytics for real-world user data.

---

## Resources

- [Web.dev Performance Guide](https://web.dev/performance/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Next.js Performance Tips](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Core Web Vitals Guide](https://web.dev/vitals/)

---

## Support

For performance optimization questions, refer to:
- `SEO_IMPLEMENTATION.md` - Complete SEO guide
- `IMAGE_OPTIMIZATION.md` - Image best practices
- Next.js documentation
