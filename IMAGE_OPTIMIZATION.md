# Image SEO & Optimization Guide

## Image Best Practices for SEO

### 1. Image File Names
- Use descriptive, keyword-rich filenames
- Separate words with hyphens (not underscores)
- Keep filenames concise but meaningful

**Good Examples:**
- `kashmir-gulmarg-skiing.png`
- `srinagar-dal-lake-sunset.jpg`
- `honeymoon-package-couple.webp`

**Bad Examples:**
- `IMG-123.jpg` ❌
- `image_4.png` ❌
- `pic_kashmir_tour.jpg` ❌

### 2. Alt Text
- Describe the image content clearly
- Include relevant keywords naturally
- Keep alt text under 125 characters
- Don't stuff keywords

**Good Alt Text Examples:**
```
alt="Kashmir gulmarg skiing resort with snow-covered peaks in winter"
alt="Dal Lake houseboat during sunset with snow mountains in background"
alt="Honeymoon package couple enjoying Srinagar tour"
```

### 3. Image Formats
Next.js automatically handles format optimization. Use:
- **JPEG** for photographs
- **PNG** for graphics with transparency
- **WebP** (auto-served for modern browsers)
- **AVIF** (auto-served for latest browsers)

### 4. Image Dimensions
- Provide appropriate sizes for different devices
- Use descriptive dimensions in filenames when needed
- Original images should be high quality (at least 1200px wide for web)

### 5. Image Compression
Before uploading, compress using:
- [TinyPNG](https://tinypng.com/)
- [ImageOptim](https://imageoptim.com/)
- [FileZilla Image Optimizer](https://www.fileoptimizer.com/)

**Target File Sizes:**
- Hero images: 100-300KB
- Thumbnail images: 30-100KB
- Background images: 50-150KB

### 6. Sitemap Image Entries
Add images to sitemap with:
```xml
<url>
  <loc>https://gulearshtourandtravel.in/packages</loc>
  <image:image>
    <image:loc>https://gulearshtourandtravel.in/assets/images/package-1.jpg</image:loc>
    <image:title>Kashmir Honeymoon Package - Week Long Tour</image:title>
  </image:image>
</url>
```

### 7. Image Metadata
- Include EXIF data with copyright info
- Add image title and description
- Use consistent color profiles

### 8. Image Loading
- Use `loading="lazy"` for below-the-fold images
- Implement responsive images with `srcset`
- Set explicit dimensions to prevent layout shift

**Example with Next.js Image:**
```typescript
import Image from 'next/image';

export default function PackageCard({ image, title }) {
  return (
    <Image
      src={image}
      alt={`${title} - Kashmir tour package`}
      width={400}
      height={300}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={false}
      loading="lazy"
    />
  );
}
```

### 9. Image CDN & Optimization
- Images should be served from CDN
- Enable progressive JPEG loading
- Use image lazy loading
- Implement responsive images

### 10. Image Accessibility
- Always include alt text
- Use appropriate `role` attributes
- Consider color contrast for overlays
- Provide text captions for important images

---

## Current Image Assets

Update these image paths with proper alt text and optimization:

- `/assets/images/hero-bg.png` - Hero section background
- `/assets/images/about-bg.png` - About page background
- `/assets/images/srinagar.png` - Srinagar location image
- `/assets/images/kashmir_paradise.png` - Fallback image
- `/assets/images/logo.png` - Company logo
- `/assets/icons/*` - Icon files

---

## Implementation Checklist

- [ ] Rename all images with descriptive names
- [ ] Add alt text to all images in components
- [ ] Compress all images
- [ ] Convert images to WebP format
- [ ] Implement responsive image sizes
- [ ] Add lazy loading where appropriate
- [ ] Update sitemap with image entries
- [ ] Test Core Web Vitals
- [ ] Verify images in Google Search Console
- [ ] Monitor image performance in PageSpeed Insights

---

## Tools

- **Image Compression:** TinyPNG, Squoosh, ImageOptim
- **Format Conversion:** Convertio, CloudConvert
- **SEO Analysis:** Screaming Frog, SEMrush, Ahrefs
- **Performance Testing:** PageSpeed Insights, Chrome DevTools, WebPageTest

---

## See Also

- Main SEO guide: `SEO_IMPLEMENTATION.md`
- SEO utilities: `lib/seo.ts`
- Next.js Image docs: https://nextjs.org/docs/app/api-reference/components/image
