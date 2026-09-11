"use client";

import Link from "next/link";
import { useState } from "react";
import type { Brand, Category } from "@/db/schema";
import { Icon } from "@/components/ui/Icon";
import { StoreFilters, useStoreParams } from "./StoreFilters";
import { cx } from "@/lib/format";

type Props = {
  total: number;
  page: number;
  pages: number;
  categories: Category[];
  brands: Brand[];
  categoryCounts: Record<string, number>;
  brandCounts: Record<string, number>;
  bounds: { min: number; max: number };
};

export function StoreToolbar({ total, page, pages, categories, brands, categoryCounts, brandCounts, bounds }: Props) {
  const { params, set, pending } = useStoreParams();
  const [open, setOpen] = useState(false);
  const view = params.get("view") === "list" ? "list" : "grid";

  const chips: { key: string; label: string; value?: string | null }[] = [];
  if (params.get("q")) chips.push({ key: "q", label: `“${params.get("q")}”` });
  if (params.get("cat")) chips.push({ key: "cat", label: categories.find((c) => c.slug === params.get("cat"))?.name ?? "Categoría" });
  (params.get("brand") ?? "")
    .split(",")
    .filter(Boolean)
    .forEach((slug) => chips.push({ key: "brand", label: brands.find((b) => b.slug === slug)?.name ?? slug, value: slug }));
  if (params.get("nuevo")) chips.push({ key: "nuevo", label: "Producto nuevo" });
  if (params.get("oferta")) chips.push({ key: "oferta", label: "Súper precio" });
  if (params.get("caja")) chips.push({ key: "caja", label: "Caja abierta" });
  if (params.get("stock")) chips.push({ key: "stock", label: "En existencia" });
  if (params.get("min") || params.get("max")) chips.push({ key: "price", label: `Precio ${params.get("min") ?? "0"} – ${params.get("max") ?? "∞"}` });

  const removeChip = (chip: { key: string; value?: string | null }) => {
    if (chip.key === "brand") {
      const next = (params.get("brand") ?? "").split(",").filter((s) => s && s !== chip.value);
      set({ brand: next.join(",") || null });
    } else if (chip.key === "price") {
      set({ min: null, max: null });
    } else {
      set({ [chip.key]: null });
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-navy/70">
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <Icon name="loader" size={14} className="animate-spin text-brand" /> Actualizando…
            </span>
          ) : (
            <>
              <span className="font-extrabold text-navy">{total}</span> {total === 1 ? "producto" : "productos"}
              {pages > 1 && (
                <span className="text-navy/45">
                  {" "}
                  · página {page} de {pages}
                </span>
              )}
            </>
          )}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-navy/12 bg-white px-4 text-sm font-semibold text-navy lg:hidden"
          >
            <Icon name="settings" size={15} /> Filtros
          </button>
          <div className="relative hidden sm:block">
            <select
              value={params.get("sort") ?? "relevancia"}
              onChange={(e) => set({ sort: e.target.value === "relevancia" ? null : e.target.value })}
              className="h-10 appearance-none rounded-full border border-navy/12 bg-white pl-4 pr-9 text-sm font-medium text-navy outline-none focus:border-brand"
              aria-label="Ordenar"
            >
              <option value="relevancia">Relevancia</option>
              <option value="nuevos">Novedades</option>
              <option value="precio-asc">Precio ↑</option>
              <option value="precio-desc">Precio ↓</option>
              <option value="valorados">Mejor valorados</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
            <Icon name="chevron-down" size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/50" />
          </div>
          <div className="inline-flex h-10 items-center rounded-full border border-navy/12 bg-white p-1">
            <button
              onClick={() => set({ view: null })}
              aria-label="Vista en cuadrícula"
              className={cx("grid h-8 w-8 place-items-center rounded-full transition", view === "grid" ? "bg-navy text-white" : "text-navy/60 hover:text-navy")}
            >
              <Icon name="grid" size={15} />
            </button>
            <button
              onClick={() => set({ view: "list" })}
              aria-label="Vista en lista"
              className={cx("grid h-8 w-8 place-items-center rounded-full transition", view === "list" ? "bg-navy text-white" : "text-navy/60 hover:text-navy")}
            >
              <Icon name="list" size={15} />
            </button>
          </div>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {chips.map((chip, i) => (
            <button
              key={chip.key + i}
              onClick={() => removeChip(chip)}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white animate-pop"
            >
              {chip.label} <Icon name="x" size={12} />
            </button>
          ))}
          <Link href="/tienda" className="text-xs font-semibold text-navy/55 hover:text-navy">
            Limpiar todo
          </Link>
        </div>
      )}

      {/* Mobile filters drawer */}
      <div className={cx("fixed inset-0 z-[70] lg:hidden", open ? "" : "pointer-events-none")}>
        <div onClick={() => setOpen(false)} className={cx("absolute inset-0 bg-ink/50 transition-opacity", open ? "opacity-100" : "opacity-0")} />
        <div className={cx("absolute inset-y-0 left-0 w-[88%] max-w-[360px] overflow-y-auto bg-mist p-4 shadow-2xl transition-transform duration-500", open ? "translate-x-0" : "-translate-x-full")}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-extrabold text-navy">Filtrar productos</p>
            <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy" aria-label="Cerrar">
              <Icon name="x" size={16} />
            </button>
          </div>
          <StoreFilters categories={categories} brands={brands} categoryCounts={categoryCounts} brandCounts={brandCounts} bounds={bounds} />
          <button onClick={() => setOpen(false)} className="mt-4 w-full rounded-full bg-brand py-3 text-sm font-semibold text-white">
            Ver {total} resultados
          </button>
        </div>
      </div>
    </>
  );
}

export function Pagination({ page, pages }: { page: number; pages: number }) {
  const { set } = useStoreParams();
  if (pages <= 1) return null;
  const items = Array.from({ length: pages }, (_, i) => i + 1).filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1);
  const out: (number | "…")[] = [];
  items.forEach((p, i) => {
    if (i > 0 && p - (items[i - 1] as number) > 1) out.push("…");
    out.push(p);
  });
  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Paginación">
      <button
        disabled={page <= 1}
        onClick={() => {
          set({ page: String(page - 1) });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="grid h-10 w-10 place-items-center rounded-full border border-navy/12 text-navy transition hover:border-brand hover:text-brand disabled:opacity-40"
        aria-label="Anterior"
      >
        <Icon name="chevron-left" size={16} />
      </button>
      {out.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-navy/40">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => {
              set({ page: p === 1 ? null : String(p) });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={cx(
              "h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition",
              p === page ? "bg-navy text-white" : "border border-navy/12 text-navy hover:border-brand hover:text-brand",
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        disabled={page >= pages}
        onClick={() => {
          set({ page: String(page + 1) });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="grid h-10 w-10 place-items-center rounded-full border border-navy/12 text-navy transition hover:border-brand hover:text-brand disabled:opacity-40"
        aria-label="Siguiente"
      >
        <Icon name="chevron-right" size={16} />
      </button>
    </nav>
  );
}
