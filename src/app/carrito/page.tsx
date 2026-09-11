"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { formatCOP } from "@/lib/format";

export default function CartPage() {
  const { cart, loading, update, remove, clear } = useCart();

  return (
    <>
      <PageHero compact eyebrow="Tu selección" title="Carrito de compras" breadcrumb={[{ href: "/tienda", label: "Tienda" }, { label: "Carrito" }]} />
      <section className="bg-mist py-10 lg:py-14">
        <Container>
          {loading ? (
            <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
              <div className="h-64 animate-pulse rounded-2xl bg-white" />
              <div className="h-64 animate-pulse rounded-2xl bg-white" />
            </div>
          ) : cart.items.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-3xl border border-navy/8 bg-white p-12 text-center shadow-soft">
              <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-50 text-brand">
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand/20" />
                <Icon name="cart" size={38} />
              </div>
              <h2 className="mt-6 text-2xl font-extrabold text-navy">Tu carrito está vacío</h2>
              <p className="mt-2 text-sm text-navy/60">Explora radios, satelitales, GPS y accesorios con garantía oficial.</p>
              <Link href="/tienda" className="btn-arrow mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">
                Ir a la tienda <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-soft">
                <div className="flex items-center justify-between border-b border-navy/8 px-6 py-4">
                  <p className="text-sm font-bold text-navy">
                    {cart.count} {cart.count === 1 ? "artículo" : "artículos"}
                  </p>
                  <button onClick={clear} className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/55 hover:text-red-600">
                    <Icon name="trash" size={13} /> Vaciar carrito
                  </button>
                </div>
                <ul className="divide-y divide-navy/8">
                  {cart.items.map((item) => (
                    <li key={item.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center animate-fade">
                      <Link href={`/tienda/${item.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-navy/8 bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{item.brand}</p>
                        <Link href={`/tienda/${item.slug}`} className="mt-0.5 block text-[15px] font-semibold leading-snug text-navy hover:text-brand">
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs text-navy/50">SKU {item.sku} · {formatCOP(item.price)} c/u</p>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <div className="inline-flex items-center rounded-full border border-navy/12">
                          <button onClick={() => update(item.id, item.quantity - 1)} className="grid h-9 w-9 place-items-center text-navy hover:text-brand" aria-label="Disminuir">
                            <Icon name="minus" size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-navy">{item.quantity}</span>
                          <button onClick={() => update(item.id, Math.min(item.stock, item.quantity + 1))} className="grid h-9 w-9 place-items-center text-navy hover:text-brand" aria-label="Aumentar">
                            <Icon name="plus" size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-base font-extrabold text-navy">{formatCOP(item.price * item.quantity)}</p>
                          <button onClick={() => remove(item.id)} className="grid h-8 w-8 place-items-center rounded-full text-navy/40 hover:bg-red-50 hover:text-red-600" aria-label="Quitar">
                            <Icon name="trash" size={15} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-navy/8 px-6 py-4">
                  <Link href="/tienda" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    <Icon name="arrow-left" size={15} /> Seguir comprando
                  </Link>
                </div>
              </div>

              <aside className="h-fit space-y-4 lg:sticky lg:top-[110px]">
                <div className="rounded-3xl border border-navy/8 bg-white p-6 shadow-soft">
                  <h2 className="text-lg font-extrabold text-navy">Resumen</h2>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-navy/70">
                      <dt>Subtotal</dt>
                      <dd className="font-semibold text-navy">{formatCOP(cart.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-navy/70">
                      <dt>Envío</dt>
                      <dd>Se calcula en el checkout</dd>
                    </div>
                    <div className="flex justify-between border-t border-navy/8 pt-3 text-base">
                      <dt className="font-bold text-navy">Total estimado</dt>
                      <dd className="text-xl font-extrabold text-navy">{formatCOP(cart.subtotal)}</dd>
                    </div>
                  </dl>
                  <Link href="/checkout" className="btn-arrow shine mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600">
                    Finalizar compra <Icon name="arrow-right" size={16} />
                  </Link>
                  <Link href="/cotizacion" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white">
                    <Icon name="file-text" size={15} /> Solicitar cotización formal
                  </Link>
                </div>
                <div className="rounded-3xl border border-navy/8 bg-white p-5 text-xs text-navy/65">
                  <p className="flex items-center gap-2 font-semibold text-navy"><Icon name="lock" size={14} className="text-brand" /> Compra protegida</p>
                  <p className="mt-2 leading-relaxed">Pagos seguros, facturación electrónica y garantía oficial del fabricante en todos los equipos.</p>
                </div>
              </aside>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
