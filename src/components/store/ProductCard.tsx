"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { AddToCartButton } from "./AddToCartButton";
import type { ProductFull } from "@/lib/data";
import { cx, discountPercent, formatCOP } from "@/lib/format";

export function ProductCard({ product, view = "grid", index = 0 }: { product: ProductFull; view?: "grid" | "list"; index?: number }) {
  const [copied, setCopied] = useState(false);
  const off = discountPercent(product.price, product.oldPrice);
  const rating = Number(product.rating);

  const copySku = async () => {
    try {
      await navigator.clipboard.writeText(product.sku);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* noop */
    }
  };

  const list = view === "list";

  return (
    <article
      className={cx(
        "card-lift group relative flex overflow-hidden rounded-2xl border border-navy/8 bg-white animate-rise",
        list ? "flex-row" : "flex-col",
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <Link
        href={`/tienda/${product.slug}`}
        className={cx("relative block overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#f3f6fb_100%)]", list ? "w-[220px] shrink-0" : "aspect-square w-full")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">Nuevo</span>}
          {off && <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white">-{off}%</span>}
          {product.isOpenBox && <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">Caja abierta</span>}
        </div>
        <span className="absolute right-3 top-3 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="eye" size={16} />
        </span>
        {product.stock <= 0 && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-[1px]">
            <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">Agotado</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <Link href={`/tienda?brand=${product.brand.slug}`} className="text-[11px] font-bold uppercase tracking-wider text-brand hover:underline">
            {product.brand.name}
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-navy/60">
            <Icon name="star" size={12} className="fill-amber-400 text-amber-400" />
            {rating.toFixed(1)} <span className="font-normal text-navy/40">({product.reviewsCount})</span>
          </span>
        </div>
        <Link href={`/tienda/${product.slug}`} className="mt-1.5 line-clamp-2 text-[14px] font-semibold leading-snug text-navy transition hover:text-brand">
          {product.name}
        </Link>
        {list && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-navy/60">{product.shortDescription}</p>}

        <div className="mt-2 flex items-center gap-2">
          <button onClick={copySku} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-navy/55 transition hover:text-brand" title="Copiar SKU">
            <span className="font-semibold">{product.sku}</span>
            <Icon name={copied ? "check" : "file-text"} size={12} className={copied ? "text-emerald-500" : ""} />
          </button>
          <span className="text-navy/20">·</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-navy/55">
            <span className={cx("h-1.5 w-1.5 rounded-full", product.stock > 0 ? "bg-emerald-500" : "bg-red-400")} />
            {product.stock > 0 ? (product.stock <= 5 ? `Últimas ${product.stock} unidades` : "En existencia") : "Sin stock"}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            {product.oldPrice && <p className="text-[11px] text-navy/40 line-through">{formatCOP(product.oldPrice)}</p>}
            <p className="text-[17px] font-extrabold leading-none text-navy">{formatCOP(product.price)}</p>
            <p className="mt-1 text-[10px] text-navy/45">IVA incluido</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/cotizacion?producto=${product.slug}`}
              className="hidden h-10 items-center rounded-full border border-navy/12 px-3 text-[12px] font-semibold text-navy transition hover:border-brand hover:text-brand sm:inline-flex"
            >
              Cotizar
            </Link>
            <AddToCartButton productId={product.id} name={product.name} stock={product.stock} variant="icon" />
          </div>
        </div>
      </div>
    </article>
  );
}
