
# Update robots.txt for Optimized Google Crawling

## Overview
Replace the current basic robots.txt with a comprehensive version that blocks low-value/private areas while remaining permissive for public content.

---

## File to Modify

### `public/robots.txt`

Replace the entire contents with:

```text
User-agent: *
Allow: /

Disallow: /api/
Disallow: /auth/
Disallow: /login
Disallow: /logout
Disallow: /signup
Disallow: /account
Disallow: /settings
Disallow: /admin
Disallow: /dashboard
Disallow: /preview
Disallow: /draft
Disallow: /internal

Sitemap: https://homedecision.app/sitemap.xml
```

---

## Technical Notes

1. **Unified User-agent**: Using a single `User-agent: *` rule covers all crawlers (Googlebot, Bingbot, social bots, etc.) with the same policy, which is cleaner than separate rules when the policy is identical.

2. **Query Parameter Blocking**: Standard robots.txt does not support wildcard matching for query parameters (`?utm_`, `?ref=`, etc.). Google recommends handling these via:
   - Canonical tags (already in place via React Helmet)
   - Google Search Console URL Parameters tool
   - The current approach gracefully skips this limitation.

3. **Content Type**: Files in the `public/` directory are served as static files by Vite. The `.txt` extension will be served with `text/plain` content type by default.

4. **Sitemap Directive**: Points to the canonical sitemap URL for discovery by search engines.

---

## Summary

| Action | File |
|--------|------|
| MODIFY | `public/robots.txt` |

**Total: 1 file modified**
