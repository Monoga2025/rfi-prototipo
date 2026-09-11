"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { IMG } from "@/db/seed-data";
import { cx } from "@/lib/format";

type Props = {
  product: { id: number; slug: string; name: string; stock: number } | null;
};

const SHOTS = [
  { src: IMG.r7, label: "Vista frontal" },
  { src: IMG.heroRadio, label: "Diseño robusto" },
  { src: IMG.catRadios, label: "Flota" },
];

const FEATURES = [
  { icon: "audio", label: "Audio inteligente" },
  { icon: "droplet", label: "Diseño robusto IP68" },
  { icon: "link", label: "Compatibilidad total" },
];

export function Featured({ product }: Props) {
  const [active, setActive] = useState(0);
  const href = product ? `/tienda/${product.slug}` : "/tienda";

  return (
    <section className="bg-white py-10 lg:py-12">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.9fr_auto]">
          {/* Visual */}
          <Reveal variant="left" className="h-full">
            <div className="group relative h-full min-h-[300px] overflow-hidden rounded-2xl bg-navy text-white shadow-card lg:min-h-[340px]">
              {SHOTS.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.label}
                  className={cx(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out",
                    active === i ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
              <div className="clip-para absolute -left-10 top-6 h-[75%] w-[36%] bg-gradient-to-br from-brand-400 to-brand-700 opacity-70 mix-blend-screen" />
              <span className="text-outline pointer-events-none absolute right-6 top-2 select-none text-[120px] font-black italic leading-none tracking-tighter opacity-80 transition-transform duration-700 group-hover:translate-x-1 sm:text-[150px]">
                R7
              </span>
              <p className="eyebrow absolute bottom-6 left-6 text-[11px] leading-[1.9] text-white/90">
                Confiabilidad
                <br />
                en cada
                <br />
                conexión
              </p>
              <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-scan" />
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={120} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-navy/8 bg-mist/60 p-7 lg:p-8">
              <p className="eyebrow text-navy">Producto destacado</p>
              <h3 className="mt-3 text-[32px] font-extrabold leading-none tracking-tight text-navy">Motorola R7</h3>
              <p className="mt-1.5 text-base font-medium text-navy/80">Radio digital de dos vías</p>
              <p className="mt-3 text-sm leading-relaxed text-navy/60">
                Diseñado para los entornos más exigentes, con audio superior, mayor cobertura y seguridad avanzada.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {FEATURES.map((f) => (
                  <li key={f.label} className="flex items-center gap-2 text-[12px] font-semibold text-navy/80">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-navy/15 bg-white text-navy">
                      <Icon name={f.icon} size={13} />
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Link
                  href={href}
                  className="btn-arrow inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600"
                >
                  Ver detalles <Icon name="arrow-right" size={16} />
                </Link>
                {product && <AddToCartButton productId={product.id} name={product.name} stock={product.stock} variant="outline" />}
              </div>
            </div>
          </Reveal>

          {/* Thumbs */}
          <Reveal variant="right" delay={200} className="h-full">
            <div className="flex h-full flex-row items-center gap-3 lg:flex-col">
              {SHOTS.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setActive(i)}
                  aria-label={s.label}
                  className={cx(
                    "relative h-[78px] w-[78px] overflow-hidden rounded-xl border-2 bg-navy transition-all duration-300 lg:h-[86px] lg:w-[86px]",
                    active === i ? "border-brand shadow-glow" : "border-navy/8 opacity-70 hover:opacity-100",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
              <button
                onClick={() => setActive((a) => (a + 1) % SHOTS.length)}
                aria-label="Siguiente imagen"
                className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-brand hover:bg-brand hover:text-white lg:mt-auto"
              >
                <Icon name="arrow-right" size={18} />
              </button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
