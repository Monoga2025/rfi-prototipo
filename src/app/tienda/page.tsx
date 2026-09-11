import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { QuickSearch } from "@/components/layout/QuickSearch";
import { ProductCard } from "@/components/store/ProductCard";
import { StoreFilters } from "@/components/store/StoreFilters";
import { Pagination, StoreToolbar } from "@/components/store/StoreToolbar";
import { getBrandCounts, getBrands, getCategories, getCategoryCounts, getPriceBounds, queryProducts, type ProductQuery } from "@/lib/data";
import { cx } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tienda · Radios, satelitales, GPS y accesorios",
  description: "Compra radios de dos vías Motorola, Hytera, ICOM, teléfonos satelitales Iridium e Inmarsat, GPS Garmin, antenas y repuestos originales.",
};

const CAT_ICONS: Record<string, string> = {
  "radios-de-dos-vias": "radio",
  "comunicacion-satelital": "satellite",
  "navegacion-gps": "map",
  "antenas-accesorios": "radio-tower",
  repuestos: "battery",
};

export default async function TiendaPage() {
  const query: ProductQuery = { perPage: 24 };
  let view: "grid" | "list" = "grid";

  const [result, categories, brands, categoryCounts, brandCounts, bounds] = await Promise.all([
    queryProducts(query),
    getCategories(),
    getBrands(),
    getCategoryCounts(),
    getBrandCounts(),
    getPriceBounds(),
  ]);

  const activeCat = categories.find((c) => c.slug === query.cat);
  const title = query.q ? (
    <>
      Resultados para <span className="text-brand-300">“{query.q}”</span>
    </>
  ) : activeCat ? (
    activeCat.name
  ) : (
    <>
      Tienda <span className="text-brand-300">RFI</span>
    </>
  );

  return (
    <>
      <PageHero
        compact
        eyebrow="Equipos originales · Garantía · Soporte local"
        title={title}
        breadcrumb={[{ href: "/tienda", label: "Tienda" }, ...(activeCat ? [{ label: activeCat.name }] : query.q ? [{ label: query.q }] : [])]}
      >
        <Suspense>
          <QuickSearch size="lg" initial={query.q ?? ""} className="max-w-[820px]" />
        </Suspense>
      </PageHero>

      {/* Category bar */}
      <div className="sticky top-[78px] z-30 border-b border-navy/8 bg-white/90 backdrop-blur-xl">
        <Container>
          <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 py-3 lg:mx-0 lg:px-0">
            <Link
              href="/tienda"
              className={cx(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition",
                !query.cat && !query.nuevo && !query.oferta && !query.caja
                  ? "border-navy bg-navy text-white"
                  : "border-navy/12 bg-white text-navy hover:border-brand hover:text-brand",
              )}
            >
              <Icon name="list" size={15} /> Todos los productos
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/tienda?cat=${c.slug}`}
                className={cx(
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition",
                  query.cat === c.slug ? "border-brand bg-brand-50 text-brand" : "border-navy/12 bg-white text-navy hover:border-brand hover:text-brand",
                )}
              >
                <Icon name={CAT_ICONS[c.slug] ?? "box"} size={15} /> {c.name}
              </Link>
            ))}
            <Link
              href="/tienda?nuevo=1"
              className={cx(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition",
                query.nuevo ? "border-brand bg-brand-50 text-brand" : "border-navy/12 bg-white text-navy hover:border-brand hover:text-brand",
              )}
            >
              <Icon name="sparkles" size={15} /> Nuevos productos
            </Link>
            <Link
              href="/tienda?oferta=1"
              className={cx(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition",
                query.oferta ? "border-brand bg-brand-50 text-brand" : "border-navy/12 bg-white text-navy hover:border-brand hover:text-brand",
              )}
            >
              <Icon name="star" size={15} /> Súper precio
            </Link>
            <Link
              href="/tienda?caja=1"
              className={cx(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition",
                query.caja ? "border-brand bg-brand-50 text-brand" : "border-navy/12 bg-white text-navy hover:border-brand hover:text-brand",
              )}
            >
              <Icon name="box" size={15} /> Caja abierta
            </Link>
          </div>
        </Container>
      </div>

      <section className="bg-mist py-8 lg:py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-[150px]">
                <Suspense>
                  <StoreFilters categories={categories} brands={brands} categoryCounts={categoryCounts} brandCounts={brandCounts} bounds={bounds} />
                </Suspense>
              </div>
            </aside>

            <div>
              <Suspense>
                <StoreToolbar
                  total={result.total}
                  page={result.page}
                  pages={result.pages}
                  categories={categories}
                  brands={brands}
                  categoryCounts={categoryCounts}
                  brandCounts={brandCounts}
                  bounds={bounds}
                />
              </Suspense>

              {result.items.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-navy/15 bg-white p-12 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand">
                    <Icon name="search" size={26} />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-navy">No encontramos productos</h3>
                  <p className="mx-auto mt-1 max-w-sm text-sm text-navy/60">
                    Prueba con otros términos o filtros. También puedes pedir una cotización y nuestro equipo lo consigue por ti.
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <Link href="/tienda" className="rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy hover:border-navy">
                      Ver todo
                    </Link>
                    <Link href="/cotizacion" className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
                      Solicitar cotización
                    </Link>
                  </div>
                </div>
              ) : (
                <div className={cx("mt-5 grid gap-4", String(view) === "list" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3")}>
                  {result.items.map((p, i) => (
                    <ProductCard key={p.id} product={p} view={view} index={i} />
                  ))}
                </div>
              )}

              <Suspense>
                <Pagination page={result.page} pages={result.pages} />
              </Suspense>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "shield-check", t: "Garantía oficial", d: "Equipos 100 % originales con respaldo del fabricante." },
                  { icon: "truck", t: "Envío asegurado", d: "A todo el país. 24 h en Bogotá, 2-3 días a ciudades principales." },
                  { icon: "headset", t: "Soporte especializado", d: "Ingenieros certificados te acompañan antes y después de comprar." },
                ].map((b) => (
                  <div key={b.t} className="flex items-start gap-3 rounded-2xl border border-navy/8 bg-white p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                      <Icon name={b.icon} size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy">{b.t}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-navy/60">{b.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
