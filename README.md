# RFI Prototipo (Electronics Store and Quotes Site)

A Next.js storefront prototype for a communications-equipment supplier: product catalog with filters, brands, cart, checkout, quote requests and a support area.

## Why
Equipment buyers in this niche need technical specs and a quote path more than a generic cart. The prototype models those flows end to end.

## Key features
- Product catalog with categories, brands, filters and sorting (`/tienda`, `/tienda/[slug]`)
- Cart drawer and checkout pages (`/carrito`, `/checkout`)
- Quote request flow (`/cotizacion`) and contact forms
- Pages for services, projects, brands, blog and support
- Database schema and seed data with Drizzle ORM and Postgres

## Stack
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Drizzle ORM, PostgreSQL (`pg`), sharp.

## Structure
```
src/app/          Routes (tienda, checkout, cotizacion, ...)
src/components/   Cart, store, home, layout, forms
src/db/           Drizzle schema, client and seed data
src/lib/          Server cart logic, data helpers, formatting
.github/workflows GitHub Pages deployment
```

## How to run
```bash
npm install
npm run dev          # needs DATABASE_URL for DB-backed pages
npm run build
```

## Status
Prototype. `next.config.ts` sets `output: "export"` for the static GitHub Pages build, which cannot run database queries or server-side cart logic at request time, so the DB-backed flows need a server runtime. No automated tests were found.

Built by Monoga (https://github.com/Monoga2025)
