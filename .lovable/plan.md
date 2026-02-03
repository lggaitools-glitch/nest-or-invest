

# Add sitemap.xml for Google Indexing

## Overview
Create a static XML sitemap in the public directory containing all public, indexable pages including the homepage, simulator, articles hubs, and all published articles in both English and Spanish.

---

## File to Create

### `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://homedecision.app/</loc>
    <lastmod>2025-02-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Simulator -->
  <url>
    <loc>https://homedecision.app/simulate</loc>
    <lastmod>2025-02-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- English Articles Hub -->
  <url>
    <loc>https://homedecision.app/articles</loc>
    <lastmod>2025-02-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- English Article: House vs Stocks -->
  <url>
    <loc>https://homedecision.app/articles/house-vs-stocks-what-the-data-really-says</loc>
    <lastmod>2025-02-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Spanish Articles Hub -->
  <url>
    <loc>https://homedecision.app/es/articles</loc>
    <lastmod>2025-02-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Spanish Article: Casa vs Bolsa -->
  <url>
    <loc>https://homedecision.app/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos</loc>
    <lastmod>2025-02-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## Pages Included

| URL | Priority | Change Freq | Notes |
|-----|----------|-------------|-------|
| `/` | 1.0 | weekly | Homepage/landing |
| `/simulate` | 0.9 | weekly | Core tool |
| `/articles` | 0.8 | weekly | EN articles hub |
| `/articles/house-vs-stocks-what-the-data-really-says` | 0.7 | monthly | Published EN article |
| `/es/articles` | 0.8 | weekly | ES articles hub |
| `/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos` | 0.7 | monthly | Published ES article |

---

## Pages Not Included (Not Found in Routes)

The following pages from the requirements do not exist in the current app:
- `/pricing`
- `/about`
- `/contact`
- `/privacy`
- `/terms`

---

## Technical Notes

1. **Static Sitemap**: Since this is a Vite/React SPA without server-side generation, the sitemap is static. New articles require manual addition.

2. **lastmod Dates**: Using article `modifiedDate` from `articleData.ts` for articles (`2025-02-03`), and current date for other pages.

3. **Content Type**: Files in `public/` with `.xml` extension are served as `application/xml` by default.

4. **Robots.txt Integration**: The sitemap is already referenced in `robots.txt` at `https://homedecision.app/sitemap.xml`.

5. **Future Extension**: When adding new articles, add a corresponding `<url>` entry to the sitemap.

---

## Summary

| Action | File |
|--------|------|
| CREATE | `public/sitemap.xml` |

**Total: 1 file created**

