"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import type { Brand, Category } from "@/db/schema";
import { Icon } from "@/components/ui/Icon";
import { cx, formatCOP } from "@/lib/format";

type Props = {
  categories: Category[];
  brands: Brand[];
  categoryCounts: Record<string, number>;
  brandCounts: Record<string, number>;
  bounds: { min: number; max: number };
};

export function useStoreParams() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const set = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null || v === "" || v === undefined) next.delete(k);
      else next.set(k, v);
    });
    if (!("page" in updates)) next.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  return { params, set, pending, reset: () => startTransition(() => router.push(pathname, { scroll: false })) };
}

function Toggle({ checked, onChange, label, badge }: { checked: boolean; onChange: (v: boolean) => void; label: string; badge?: string }) {
  return (
    <button onClick={() => onChange(!checked)} className="flex w-full items-center gap-3 py-1.5 text-left" role="switch" aria-checked={checked}>
      <span className={cx("relative h-5 w-9 shrink-0 rounded-full transition-colors duration-300", checked ? "bg-brand" : "bg-navy/15")}>
        <span className={cx("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300", checked ? "translate-x-4" : "translate-x-0.5")} />
      </span>
      <span className="text-sm text-navy/80">{label}</span>
      {badge && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand">{badge}</span>}
    </button>
  );
}

export function StoreFilters({ categories, brands, categoryCounts, brandCounts, bounds }: Props) {
  const { params, set, reset, pending } = useStoreParams();
  const cat = params.get("cat") ?? "";
  const selectedBrands = (params.get("brand") ?? "").split(",").filter(Boolean);
  const [brandQuery, setBrandQuery] = useState("");
  const [min, setMin] = useState(params.get("min") ?? "");
  const [max, setMax] = useState(params.get("max") ?? "");

  useEffect(() => {
    setMin(params.get("min") ?? "");
    setMax(params.get("max") ?? "");
  }, [params]);

  const filteredBrands = useMemo(
    () => brands.filter((b) => b.name.toLowerCase().includes(brandQuery.toLowerCase())),
    [brands, brandQuery],
  );

  const activeCount =
    (cat ? 1 : 0) + selectedBrands.length + ["nuevo", "caja", "stock", "oferta", "min", "max", "q"].filter((k) => params.get(k)).length;

  const toggleBrand = (slug: string) => {
    const next = selectedBrands.includes(slug) ? selectedBrands.filter((s) => s !== slug) : [...selectedBrands, slug];
    set({ brand: next.join(",") || null });
  };

  const applyPrice = () => set({ min: min || null, max: max || null });

  return (
    <div className={cx("space-y-5 transition-opacity", pending && "opacity-70")}>
      <div className="flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-sm font-extrabold text-navy">
          <Icon name="filter" size={15} /> Filtros
          {activeCount > 0 && <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] text-white">{activeCount}</span>}
        </h2>
        {activeCount > 0 && (
          <button onClick={reset} className="text-xs font-semibold text-brand hover:underline">
            Limpiar todo
          </button>
        )}
      </div>

      <Section title="Ordenar por">
        <div className="relative">
          <select
            value={params.get("sort") ?? "relevancia"}
            onChange={(e) => set({ sort: e.target.value === "relevancia" ? null : e.target.value })}
            className="h-11 w-full appearance-none rounded-xl border border-navy/12 bg-white px-3 pr-9 text-sm font-medium text-navy outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
          >
            <option value="relevancia">Relevancia</option>
            <option value="nuevos">Novedades</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="valorados">Mejor valorados</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
          <Icon name="chevron-down" size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/50" />
        </div>
      </Section>

      <Section title="Promociones">
        <Toggle checked={!!params.get("nuevo")} onChange={(v) => set({ nuevo: v ? "1" : null })} label="Producto nuevo" badge="Nuevo" />
        <Toggle checked={!!params.get("oferta")} onChange={(v) => set({ oferta: v ? "1" : null })} label="Súper precio" />
        <Toggle checked={!!params.get("caja")} onChange={(v) => set({ caja: v ? "1" : null })} label="Caja abierta" />
        <Toggle checked={!!params.get("stock")} onChange={(v) => set({ stock: v ? "1" : null })} label="En existencia" />
      </Section>

      <Section title="Categorías">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => set({ cat: null })}
              className={cx(
                "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm transition",
                !cat ? "bg-brand-50 font-semibold text-brand" : "text-navy/75 hover:bg-mist",
              )}
            >
              Todas las categorías
              <span className="text-[11px] text-navy/40">{Object.values(categoryCounts).reduce((a, b) => a + b, 0)}</span>
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => set({ cat: cat === c.slug ? null : c.slug })}
                className={cx(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition",
                  cat === c.slug ? "bg-brand-50 font-semibold text-brand" : "text-navy/75 hover:bg-mist",
                )}
              >
                {c.name}
                <span className="text-[11px] text-navy/40">{categoryCounts[c.slug] ?? 0}</span>
              </button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Marcas">
        <div className="relative mb-2">
          <Icon name="search" size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
          <input
            value={brandQuery}
            onChange={(e) => setBrandQuery(e.target.value)}
            placeholder="Buscar marcas"
            className="h-10 w-full rounded-xl border border-navy/12 bg-white pl-9 pr-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </div>
        <ul className="max-h-[240px] space-y-0.5 overflow-y-auto pr-1">
          {filteredBrands.map((b) => {
            const checked = selectedBrands.includes(b.slug);
            return (
              <li key={b.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-navy/80 transition hover:bg-mist">
                  <input type="checkbox" checked={checked} onChange={() => toggleBrand(b.slug)} className="peer sr-only" />
                  <span className={cx("grid h-4.5 w-4.5 place-items-center rounded-[5px] border transition", checked ? "border-brand bg-brand text-white" : "border-navy/25 bg-white")}>
                    {checked && <Icon name="check" size={11} strokeWidth={3} />}
                  </span>
                  <span className="flex-1">{b.name}</span>
                  <span className="text-[11px] text-navy/40">{brandCounts[b.slug] ?? 0}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Precio">
        <div className="flex items-center gap-2">
          <input
            inputMode="numeric"
            value={min}
            onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))}
            placeholder={`${Math.floor(bounds.min / 1000)}k`}
            className="h-10 w-full rounded-xl border border-navy/12 bg-white px-3 text-sm outline-none focus:border-brand"
            aria-label="Precio mínimo"
          />
          <span className="text-navy/40">–</span>
          <input
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))}
            placeholder={`${Math.ceil(bounds.max / 1000000)}M`}
            className="h-10 w-full rounded-xl border border-navy/12 bg-white px-3 text-sm outline-none focus:border-brand"
            aria-label="Precio máximo"
          />
          <button onClick={applyPrice} className="h-10 shrink-0 rounded-xl bg-navy px-3 text-xs font-bold text-white transition hover:bg-brand">
            Ir
          </button>
        </div>
        <p className="mt-2 text-[11px] text-navy/45">
          Rango disponible: {formatCOP(bounds.min)} – {formatCOP(bounds.max)}
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-navy/8 bg-white p-4 shadow-soft">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between text-left">
        <h3 className="text-[13px] font-extrabold text-navy">{title}</h3>
        <Icon name="chevron-down" size={15} className={cx("text-navy/50 transition-transform duration-300", open ? "" : "-rotate-90")} />
      </button>
      <div className={cx("grid transition-all duration-300", open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
