---
description: Standards for restaurant Next.js sites — libraries, motion, SEO, responsive UX, Figma-to-code, a11y, performance, and verification
alwaysApply: true
---

# Restaurant website standards

Reusable guidance for restaurant websites built with Next.js. Apply on every implementation task, especially Figma → production code.

## Third-party libraries

- Prefer reputable, lightweight, actively maintained libraries with strong TypeScript support (e.g. Motion/Framer Motion, Embla Carousel, Lucide React).
- Do not reinvent features a suitable library already covers well.
- Check `package.json` before adding packages; skip unnecessary or oversized deps for simple needs.

## Animations and interactions

- Ship purposeful motion: subtle entrances, scroll reveals, hover/focus feedback, and transitions.
- Prefer smooth, natural motion; avoid distracting or heavy effects.
- Respect `prefers-reduced-motion`; keep motion performant on mobile and desktop.

## SEO (mandatory on every page)

- Semantic HTML, logical heading hierarchy, unique titles and meta descriptions, canonical URLs when appropriate, Open Graph and social metadata.
- Add Schema.org JSON-LD when applicable (Restaurant, Menu, BreadcrumbList, LocalBusiness).
- Descriptive image alt text, clean URLs, internal links, sitemap, and robots.txt.
- Optimize Core Web Vitals, images, and fonts; follow the installed Next.js metadata/App Router APIs.
- No keyword stuffing, duplicate metadata, invalid structured data, or misleading claims.

## Responsive design

- Design for mobile, tablet, laptop, and large desktop — adapt nav, hierarchy, spacing, grids, and interactions; do not only scale down desktop.
- Prevent horizontal overflow, clipped content, and unusable touch targets; spot-check representative viewports.

## Restaurant-specific UX

- Surface menu, food photography, brand identity, hours, location, and contact clearly.
- Provide clear primary CTAs when relevant: View Menu, Book a Table, Order Online, Call Now, Get Directions.
- Use `tel:` links and map links for location; make menu categories, dishes, prices, descriptions, dietary labels, and featured items easy to scan.
- Add reservation/ordering flows only when required; use authentic food imagery and consistent ratios.
- Avoid generic layouts that make every restaurant site look identical.

## Performance

- Use the framework image component; prefer WebP/AVIF when supported.
- Lazy-load below-the-fold images; never lazy-load critical above-the-fold media.
- Use font loading, code splitting, and dynamic imports only when they help.
- Minimize client components, JS weight, layout shift, expensive scroll handlers, and unnecessary re-renders.

## Code quality

- Reuse existing components, utilities, styles, and deps before creating new ones.
- Keep components modular without over-fragmenting simple UI; follow project structure and conventions.
- Use TypeScript; avoid `any` unless justified. No drive-by refactors of working code.
- No placeholder links, fake features, or dead buttons; remove unused code/deps only when safe.

## Accessibility

- Semantic elements, accessible forms, keyboard support, visible focus, sufficient contrast.
- Accessible names for icon-only controls; do not convey meaning by color alone.
- Menus, dialogs, carousels, and interactive UI must work with keyboard and assistive tech.

## Final verification

- Run available lint, type-check, and build commands when practical; fix errors you introduced.
- Verify responsive behavior, navigation, links, primary interactions, SEO metadata, images, a11y, and console errors.
- Report checks you could not complete — do not claim they passed.
