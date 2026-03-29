# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vaera NextJS is a marketing and e-commerce website for a premium at-home microneedling device. Built with Next.js 14 App Router using JavaScript/JSX (not TypeScript).

**Brand Positioning:** Bridges clinical dermatology and at-home skincare. Not a luxury brand — a precision tool brand. The product a dermatologist would actually recommend for home use.

**Target Customer:** Women 35+, results-oriented, skeptical of hype, willing to pay for something that actually works.

**Price Point:** $249 launch price.

**Core Differentiator:** Proprietary motor actuation system delivering ±0.05mm penetration variance vs. ±0.15–0.25mm for competitors. 40% less skin trauma.

## Brand Values

These inform all copy and design decisions:

- **Science-Backed:** Every decision informed by clinical research. No fluff. Focus on what actually works.
- **Transparency:** Cut through skincare myths. Straightforward information about how products work.
- **Quality:** Professional-grade products for everyday life. Premium means raising the standard, not exclusivity.

## Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack (Locked)

- Next.js 14 App Router only (no Pages Router)
- Plain JavaScript only (no TypeScript)
- GSAP for animations (no Framer Motion, no additional UI libraries)
- Tailwind CSS for styling

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and layouts
  - `page.jsx` - Homepage (/)
  - `layout.jsx` - Root layout with font imports (Italiana, Poppins, Roboto Mono)
  - `globals.css` - Tailwind layers + custom component classes + noise overlay
  - `blog/` - Blog routes (`/blog`, `/blog/[slug]`, `/blog/category/[cat]`)
  - `products/microneedling-pen/` - Product page
  - `pages/` - Static pages (about-us, contact, faq, data-sharing-opt-out)
  - `collections/all/` - All products collection
  - `cart/` - Cart page
  - `dev/sections/` - Dev-only section management tool
- `components/` - Organized by feature area:
  - `sections/` - All reusable page sections (Hero, Features, Philosophy, ProductGallery, etc.)
  - `blog/` - Blog components (PostCard, MDXComponents, ClinicalCallout, CategoryFilter, CompactWaitlist)
  - `layout/` - Shared layout (Navbar, Footer, NoiseOverlay)
  - `ui/` - Reusable animation components (HelixAnimation, TelemetryTypewriter, etc.)
- `content/blog/` - MDX blog posts with frontmatter
- `lib/`
  - `shopify.js` - Shopify Storefront API client
  - `blog.js` - Blog helper functions (getAllPosts, getPostBySlug, etc.)
  - `sections.js` - Global section registry
  - `pages/` - Page-specific section configs (home.js, products.js)

### Design System

**Palette:**
- `vaera-navy` (#1F2A37) - Primary text, dark backgrounds
- `vaera-light-navy` (#374151) - Secondary dark, borders
- `vaera-ice` (#DCEFF6) - Accent, highlights, hover states
- `vaera-gray` (#F5F7F9) - Page/card backgrounds
- `vaera-white` (#FFFFFF) - Primary surfaces

**Typography:**
- `font-italiana` - Serif display font for headings
- `font-poppins` - Sans-serif body font
- `font-mono` (Roboto Mono) - Data, specs, technical labels

**Identity:** A dermatologist's office translated into a modern DTC brand. Clean, credible, slightly futuristic, approachable. Clinical authority meets at-home accessibility.

### Visual Rules

**Radius System:** All containers use `rounded-4xl` (2rem) to `rounded-5xl` (3rem). No sharp corners except nav borders/dividers.

**Texture:** Global noise overlay via SVG `<feTurbulence>` filter at low opacity. Eliminates flat digital gradients.

**Micro-Interactions:**
- Buttons: subtle `scale(1.03)` on hover
- Interactive elements: `translateY(-1px)` lift on hover
- All transitions minimum 200ms — no instant color snaps

### Animation Standards

All GSAP animations must use `gsap.context()` within `useEffect` and return `ctx.revert()` for cleanup:

```javascript
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)
  const ctx = gsap.context(() => {
    // animations here
  })
  return () => ctx.revert()
}, [])
```

**Defaults:**
- Easing: `power3.out` for entrances, `power2.inOut` for morphs
- Stagger: `0.08` for text, `0.15` for cards/containers
- ScrollTrigger start: `"top 80%"` for most reveals

**Path Aliases:** `@/*` maps to project root (configured in `jsconfig.json`).

### Shopify Integration

Headless storefront using Storefront API. Frontend calls API for product data and cart creation, then redirects to Shopify's hosted checkout.

To enable:
1. Copy `.env.local.example` to `.env.local`
2. Set `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

### Image Configuration

Remote images allowed from `images.unsplash.com` and `cdn.shopify.com` (configured in `next.config.mjs`). All images via `next/image` with explicit dimensions or `fill` + `object-cover`.

### Blog System

MDX-based blog with server-side rendering for SEO. Dependencies: `next-mdx-remote`, `gray-matter`.

**Content Location:** `content/blog/*.mdx`

**Frontmatter Schema:**
```yaml
title: string
slug: string
excerpt: string
category: string (science-technology | guides | results-recovery | skin-concerns | vaera)
coverImage: string (Unsplash URL or Shopify CDN)
publishDate: string (YYYY-MM-DD)
readingTime: string
featured: boolean
```

**Routes:**
- `/blog` - Blog index with category filters
- `/blog/[slug]` - Individual post page
- `/blog/category/[cat]` - Category filtered view

**Custom MDX Components:**
- `<ClinicalCallout>` - Highlighted callout boxes for key insights
- Standard elements (h2, h3, p, ul, blockquote) styled to match design system

**Adding New Posts:** Create `content/blog/your-post.mdx` with frontmatter, write content, run build. No code changes required.

### Section Management System

Reusable section components with a global registry for use across multiple pages.

**Registry:** `lib/sections.js` - Maps section names to components with `usableOn` field specifying which pages can use each section.

**Page Configs:** `lib/pages/*.js` - Define which sections appear on each page and their order.

**Dev Tool:** `/dev/sections` - Visual interface to preview all sections (dev only, not for production).

**Usage:** Sections are server-rendered. To add a section to a page, update the page's config in `lib/pages/`.

## Copy & Messaging Rules

- Never use the word "luxury" — Vaera is premium and precise, not luxurious
- Never claim FDA clearance or medical device status — Vaera is a cosmetic device
- Never reference the proprietary motor mechanism in specific technical detail (patent pending)
- Lead with outcomes (what skin looks/feels like) before mechanism (how device works)
- Competitor names (Dr. Pen, Dermapen) may appear in comparisons but never defamatorily
- Approved stats: ±0.05mm variance, 200+ customer interviews, 3× more consistent, $249 launch price

## Performance Rules

- All images via `next/image` with explicit `width`/`height` or `fill` + `object-cover`
- No `"use client"` on `app/layout.jsx` or `app/page.jsx` unless strictly unavoidable
- GSAP loads client-side only — never during SSR
- Run `npm run build` and confirm zero errors before considering any feature complete

## Current State

- Homepage and products page are functional with placeholder Unsplash images
- Waitlist forms have frontend validation only (no backend integration)
- Blog system functional with MDX posts in `content/blog/`
- URL structure matches Shopify site for SEO continuity
- Section management system in place for reusable components
- Shopify checkout flow ready but requires API credentials

## Design Quality Standard

This is not a template site. Every component must feel intentional.
- Animations are weighted and professional — no generic fade-ins
- Spacing and typography create hierarchy, not just structure  
- The site should feel like it was designed by a senior creative 
  technologist, not assembled from components
- When in doubt: more restraint, more whitespace, more precision

## Fixed Design System (NEVER CHANGE)

These rules apply to ALL presets. They are what make the output premium.

### Visual Texture

- Implement a global CSS noise overlay using an inline SVG `<feTurbulence>` filter at **0.05 opacity** to eliminate flat digital gradients.
- Use a `rounded-[2rem]` to `rounded-[3rem]` radius system for all containers. No sharp corners anywhere.

### Micro-Interactions

- All buttons must have a **"magnetic" feel**: subtle `scale(1.03)` on hover with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Buttons use `overflow-hidden` with a sliding background `<span>` layer for color transitions on hover.
- Links and interactive elements get a `translateY(-1px)` lift on hover.

### Animation Lifecycle

- Use `gsap.context()` within `useEffect` for ALL animations. Return `ctx.revert()` in the cleanup function.
- Default easing: `power3.out` for entrances, `power2.inOut` for morphs.
- Stagger value: `0.08` for text, `0.15` for cards/containers.