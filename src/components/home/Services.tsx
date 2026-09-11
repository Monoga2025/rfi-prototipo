import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/site";

export function Services() {
  return (
    <section className="bg-mist py-12 lg:py-14">
      <Container>
        <Reveal className="flex items-center justify-between gap-6">
          <p className="eyebrow text-navy">Nuestros servicios</p>
          <Link href="/servicios" className="btn-arrow inline-flex items-center gap-2 text-xs font-semibold text-navy/70 hover:text-brand">
            Ver todos los servicios <Icon name="arrow-right" size={14} />
          </Link>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 4).map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <Link href={`/servicios#${s.slug}`} className="group flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/70">
                <span className="relative grid h-[58px] w-[58px] shrink-0 place-items-center rounded-2xl border border-navy/10 bg-white text-navy shadow-soft transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:shadow-glow">
                  <Icon name={s.icon} size={24} strokeWidth={1.6} />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-brand opacity-0 transition group-hover:opacity-100" />
                </span>
                <div>
                  <h3 className="text-[14px] font-bold leading-tight text-navy">{s.title}</h3>
                  <p className="mt-1 text-[12px] leading-snug text-navy/60">{s.subtitle}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
