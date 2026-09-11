"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { Icon } from "@/components/ui/Icon";
import { cx, formatCOP } from "@/lib/format";

export function CartDrawer() {
  const { cart, drawerOpen, setDrawerOpen, update, remove } = useCart();

  return (
    <>
      <div
        aria-hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
        className={cx(
          "fixed inset-0 z-[70] bg-ink/50 backdrop-blur-[2px] transition-opacity duration-300",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        className={cx(
          "fixed right-0 top-0 z-[80] flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.65,.2,1)]",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-navy/10 px-6 py-5">
          <div>
            <p className="eyebrow text-brand">Tu carrito</p>
            <h2 className="mt-1 text-lg font-extrabold text-navy">
              {cart.count} {cart.count === 1 ? "producto" : "productos"}
            </h2>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-navy/10 text-navy transition hover:bg-mist"
            aria-label="Cerrar carrito"
          >
            <Icon name="x" size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="relative grid h-24 w-24 place-items-center rounded-full bg-brand-50 text-brand">
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand/20" />
                <Icon name="cart" size={36} />
              </div>
              <p className="mt-6 text-lg font-bold text-navy">Tu carrito está vacío</p>
              <p className="mt-1 max-w-[240px] text-sm text-navy/60">Explora nuestros equipos y agrega lo que tu operación necesita.</p>
              <Link
                href="/tienda"
                onClick={() => setDrawerOpen(false)}
                className="btn-arrow mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600"
              >
                Ir a la tienda <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-navy/8">
              {cart.items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4 animate-fade">
                  <Link
                    href={`/tienda/${item.slug}`}
                    onClick={() => setDrawerOpen(false)}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-navy/8 bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{item.brand}</p>
                    <Link
                      href={`/tienda/${item.slug}`}
                      onClick={() => setDrawerOpen(false)}
                      className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-navy hover:text-brand"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-navy/10">
                        <button
                          aria-label="Disminuir"
                          onClick={() => update(item.id, item.quantity - 1)}
                          className="grid h-7 w-7 place-items-center rounded-full text-navy transition hover:bg-mist"
                        >
                          <Icon name="minus" size={13} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-navy">{item.quantity}</span>
                        <button
                          aria-label="Aumentar"
                          onClick={() => update(item.id, Math.min(item.stock, item.quantity + 1))}
                          className="grid h-7 w-7 place-items-center rounded-full text-navy transition hover:bg-mist"
                        >
                          <Icon name="plus" size={13} />
                        </button>
                      </div>
                      <p className="text-sm font-extrabold text-navy">{formatCOP(item.price * item.quantity)}</p>
                    </div>
                  </div>
                  <button
                    aria-label="Quitar"
                    onClick={() => remove(item.id)}
                    className="h-8 w-8 shrink-0 self-start rounded-full text-navy/40 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Icon name="trash" size={15} className="mx-auto" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <footer className="border-t border-navy/10 bg-mist/60 px-6 py-5">
            <div className="flex items-center justify-between text-sm text-navy/70">
              <span>Subtotal</span>
              <span className="text-lg font-extrabold text-navy">{formatCOP(cart.subtotal)}</span>
            </div>
            <p className="mt-1 text-[11px] text-navy/50">Impuestos y envío calculados al finalizar la compra.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href="/carrito"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-navy/15 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-navy/40"
              >
                Ver carrito
              </Link>
              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="btn-arrow inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600"
              >
                Finalizar <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}

export function Toaster() {
  const { toasts, dismiss } = useCart();
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[90] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-24 sm:translate-x-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cx(
            "pointer-events-auto flex items-start gap-3 rounded-2xl border bg-white/95 p-4 shadow-card backdrop-blur animate-slide-in",
            t.tone === "error" ? "border-red-200" : "border-brand-100",
          )}
        >
          <span
            className={cx(
              "grid h-8 w-8 shrink-0 place-items-center rounded-full",
              t.tone === "error" ? "bg-red-50 text-red-600" : "bg-brand-50 text-brand",
            )}
          >
            <Icon name={t.tone === "error" ? "alert" : "check"} size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-navy">{t.title}</p>
            {t.description && <p className="line-clamp-2 text-xs text-navy/60">{t.description}</p>}
          </div>
          <button onClick={() => dismiss(t.id)} className="text-navy/40 hover:text-navy" aria-label="Cerrar">
            <Icon name="x" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
