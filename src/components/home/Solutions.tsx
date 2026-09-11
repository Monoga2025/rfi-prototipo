import Link from "next/link";
import type { Category } from "@/db/schema";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Solutions({ categories }: { categories: Category[] }) {
  return (
    <section className="relative bg-white py-16 lg:py-20" id="soluciones">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-8">
            <div>
              <p className="eyebrow text-navy">Nuestras</p>
              <h2 className="mt-1 text-[38px] font-extrabold leading-none tracking-[0.06em] text-navy sm:text-[44px]">SOLUCIONES</h2>
            </div>
            <p className="max-w-[260px] text-sm leading-relaxed text-navy/60 sm:border-l sm:border-navy/10 sm:pl-8 sm:pb-1">
              Tecnología, experiencia y soporte en cada etapa de tu operación.
            </p>
          </div>
          <Link href="/tienda" className="btn-arrow inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Ver todas las categorías <Icon name="arrow-right" size={16} />
          </Link>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 90} className="h-full">
              <Link
                href={`/tienda?cat=${cat.slug}`}
                className="group relative flex aspect-[4/5] min-h-[250px] flex-col justify-end overflow-hidden rounded-2xl bg-navy p-5 text-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(33,112,240,0.55)] sm:aspect-[165/185]"
              >
                <div className="absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="mask-fade-b h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition group-hover:opacity-100" />

                <div className="relative flex items-end justify-between gap-2">
                  <div>
                    <h3 className="text-[17px] font-bold leading-tight sm:text-lg">
                      {cat.name.split(" ").length > 2 ? (
                        <>
                          {cat.name.split(" ").slice(0, 2).join(" ")}
                          <br />
                          {cat.name.split(" ").slice(2).join(" ")}
                        </>
                      ) : (
                        cat.name
                      )}
                    </h3>
                    <p className="mt-1.5 text-[11.5px] leading-snug text-white/70">{cat.tagline}</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 bg-white/5 backdrop-blur transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-navy">
                    <Icon name="arrow-right" size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
