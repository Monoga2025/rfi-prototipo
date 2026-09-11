"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/format";

export function ProductGallery({ images, name, badges }: { images: string[]; name: string; badges: string[] }) {
  const pics = images.length ? images : ["/img/prod-radio.jpg"];
  const [active, setActive] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");
  const [zoom, setZoom] = useState(false);

  return (
    <div className="lg:sticky lg:top-[110px]">
      <div
        className="group relative aspect-square overflow-hidden rounded-3xl border border-navy/8 bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#eef2f8_100%)]"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        {pics.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src + i}
            src={src}
            alt={`${name} - imagen ${i + 1}`}
            className={cx(
              "absolute inset-0 h-full w-full object-cover transition-all duration-500",
              active === i ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            style={{ transformOrigin: origin, transform: zoom && active === i ? "scale(1.8)" : "scale(1)" }}
          />
        ))}
        <div className="absolute left-4 top-4 flex flex-col gap-1.5">
          {badges.map((b) => (
            <span key={b} className="rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
              {b}
            </span>
          ))}
        </div>
        <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-navy/70 opacity-0 backdrop-blur transition group-hover:opacity-100">
          <Icon name="search" size={12} /> Pasa el cursor para ampliar
        </span>
        {pics.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + pics.length) % pics.length)}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow-soft transition group-hover:opacity-100"
              aria-label="Anterior"
            >
              <Icon name="chevron-left" size={18} />
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % pics.length)}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow-soft transition group-hover:opacity-100"
              aria-label="Siguiente"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </>
        )}
      </div>
      {pics.length > 1 && (
        <div className="mt-3 flex gap-3">
          {pics.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={cx(
                "h-20 w-20 overflow-hidden rounded-xl border-2 bg-white transition-all",
                active === i ? "border-brand shadow-glow" : "border-navy/8 opacity-70 hover:opacity-100",
              )}
              aria-label={`Ver imagen ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
