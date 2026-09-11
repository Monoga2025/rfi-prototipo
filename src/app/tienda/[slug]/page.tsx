import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGallery } from "@/components/store/ProductGallery";
import { BuyBox } from "@/components/store/BuyBox";
import { ProductCard } from "@/components/store/ProductCard";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { getProductBySlug, getRelatedProducts, staticProducts } from "@/lib/data";
import { discountPercent, formatCOP } from "@/lib/format";

export async function generateStaticParams() {
  return staticProducts.map((product) => ({ slug: product.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product, 4);
  const off = discountPercent(product.price, product.oldPrice);
  const rating = Number(product.rating);
  const badges = [product.isNew && "Nuevo", off && `-${off}%`, product.isOpenBox && "Caja abierta"].filter(Boolean) as string[];

  return (
    <>
      <div className="bg-ink pt-[78px]">
        <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-r from-ink via-navy to-ink py-4">
          <Container>
            <nav aria-label="Ruta" className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
              <Link href="/" className="inline-flex items-center gap-1 hover:text-white">
                <Icon name="home" size={13} /> Inicio
              </Link>
              <Icon name="chevron-right" size={12} className="text-white/30" />
              <Link href="/tienda" className="hover:text-white">
                Tienda
              </Link>
              <Icon name="chevron-right" size={12} className="text-white/30" />
              <Link href={`/tienda?cat=${product.category.slug}`} className="hover:text-white">
                {product.category.name}
              </Link>
              <Icon name="chevron-right" size={12} className="text-white/30" />
              <span className="truncate font-semibold text-brand-300">{product.name}</span>
            </nav>
          </Container>
        </div>
      </div>

      <section className="bg-white py-10 lg:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.05fr_1fr]">
            <Reveal variant="left">
              <ProductGallery images={product.gallery.length ? product.gallery : [product.image]} name={product.name} badges={badges} />
            </Reveal>

            <Reveal delay={100}>
              <div className="flex items-center justify-between gap-4">
                <Link href={`/tienda?brand=${product.brand.slug}`} className="opacity-80 transition hover:opacity-100">
                  <BrandLogo slug={product.brand.slug} />
                </Link>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy/70">
                  <Icon name="tag" size={13} /> SKU {product.sku}
                </span>
              </div>
              <h1 className="mt-4 text-[28px] font-extrabold leading-tight tracking-tight text-navy sm:text-[34px]">{product.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon key={i} name="star" size={14} className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-navy/20"} />
                  ))}
                  <span className="ml-1 font-bold text-navy">{rating.toFixed(1)}</span>
                  <span className="text-navy/50">({product.reviewsCount} reseñas)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-navy/70">
                  <span className={product.stock > 0 ? "h-2 w-2 rounded-full bg-emerald-500" : "h-2 w-2 rounded-full bg-red-500"} />
                  {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
                </span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-navy/70">{product.shortDescription}</p>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <p className="text-[36px] font-extrabold leading-none tracking-tight text-navy">{formatCOP(product.price)}</p>
                {product.oldPrice && (
                  <>
                    <p className="pb-1 text-base text-navy/40 line-through">{formatCOP(product.oldPrice)}</p>
                    <span className="mb-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">Ahorra {formatCOP(Number(product.oldPrice) - Number(product.price))}</span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-navy/50">IVA incluido · Hasta 12 cuotas con tarjetas aliadas</p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-navy/80">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand">
                      <Icon name="check" size={12} strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <BuyBox productId={product.id} slug={product.slug} name={product.name} stock={product.stock} price={Number(product.price)} />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: "shield-check", t: "Garantía oficial" },
                  { icon: "truck", t: "Envío nacional" },
                  { icon: "headset", t: "Soporte técnico" },
                ].map((b) => (
                  <div key={b.t} className="flex flex-col items-center gap-2 rounded-2xl border border-navy/8 p-3 text-center">
                    <Icon name={b.icon} size={20} className="text-brand" />
                    <span className="text-[11px] font-semibold text-navy/75">{b.t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <h2 className="text-xl font-extrabold text-navy">Descripción</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-navy/70">{product.description}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-navy/70">
                Incluye programación inicial sin costo, capacitación básica de uso y acompañamiento de nuestro laboratorio técnico autorizado en Bogotá. Consulta disponibilidad de accesorios y planes de mantenimiento para flotas.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-xl font-extrabold text-navy">Especificaciones</h2>
              <dl className="mt-3 overflow-hidden rounded-2xl border border-navy/8">
                {product.specs.map((s, i) => (
                  <div key={s.label} className={`grid grid-cols-[130px_1fr] gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-mist/70" : "bg-white"}`}>
                    <dt className="font-semibold text-navy/70">{s.label}</dt>
                    <dd className="font-medium text-navy">{s.value}</dd>
                  </div>
                ))}
                <div className={`grid grid-cols-[130px_1fr] gap-4 px-4 py-3 text-sm ${product.specs.length % 2 === 0 ? "bg-mist/70" : "bg-white"}`}>
                  <dt className="font-semibold text-navy/70">Marca</dt>
                  <dd className="font-medium text-navy">
                    {product.brand.name} · {product.brand.country}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-mist py-14">
          <Container>
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-navy">También te puede interesar</p>
                <h2 className="mt-2 text-2xl font-extrabold text-navy">Más en {product.category.name}</h2>
              </div>
              <Link href={`/tienda?cat=${product.category.slug}`} className="btn-arrow inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Ver categoría <Icon name="arrow-right" size={16} />
              </Link>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
