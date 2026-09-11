"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx, formatCOP } from "@/lib/format";

type Result = { id: number; slug: string; name: string; sku: string; price: string; image: string; brand: { name: string } };

type Props = {
  autoFocus?: boolean;
  initial?: string;
  size?: "md" | "lg";
  onNavigate?: () => void;
  className?: string;
  placeholder?: string;
};

export function QuickSearch({ autoFocus, initial = "", size = "md", onNavigate, className, placeholder }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const t = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(q.trim())}`, { signal: ctrl.signal });
        if (res.ok) {
          setResults((await res.json()) as Result[]);
          setOpen(true);
        }
      } catch {
        /* aborted */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      window.clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    onNavigate?.();
    router.push(q.trim() ? `/tienda?q=${encodeURIComponent(q.trim())}` : "/tienda");
  };

  const lg = size === "lg";

  return (
    <div ref={boxRef} className={cx("relative w-full", className)}>
      <form onSubmit={submit} className="relative">
        <Icon
          name="search"
          size={lg ? 22 : 18}
          className={cx("pointer-events-none absolute top-1/2 -translate-y-1/2 text-navy/45", lg ? "left-5" : "left-4")}
        />
        <input
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder={placeholder ?? "Busca radios, teléfonos satelitales, GPS, antenas…"}
          className={cx(
            "w-full rounded-full border border-navy/10 bg-white text-navy placeholder:text-navy/40 shadow-soft outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15",
            lg ? "h-16 pl-14 pr-32 text-base" : "h-12 pl-11 pr-24 text-sm",
          )}
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setResults([]);
            }}
            className={cx("absolute top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy", lg ? "right-28" : "right-20")}
            aria-label="Limpiar"
          >
            <Icon name="x" size={16} />
          </button>
        )}
        <button
          type="submit"
          className={cx(
            "absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-brand font-semibold text-white transition hover:bg-brand-600",
            lg ? "h-12 px-6 text-sm" : "h-9 px-4 text-xs",
          )}
        >
          {loading ? <Icon name="loader" size={16} className="animate-spin" /> : "Buscar"}
        </button>
      </form>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card animate-pop">
          <ul className="max-h-[360px] overflow-y-auto py-2">
            {results.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/tienda/${r.slug}`}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-brand-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt="" className="h-11 w-11 rounded-lg border border-navy/8 object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-brand">{r.brand.name}</span>
                    <span className="block truncate text-sm font-semibold text-navy">{r.name}</span>
                    <span className="block text-[11px] text-navy/50">{r.sku}</span>
                  </span>
                  <span className="text-sm font-extrabold text-navy">{formatCOP(r.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={submit}
            className="flex w-full items-center justify-center gap-2 border-t border-navy/8 bg-mist px-4 py-3 text-xs font-bold text-brand hover:bg-brand-50"
          >
            Ver todos los resultados para “{q}” <Icon name="arrow-right" size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
