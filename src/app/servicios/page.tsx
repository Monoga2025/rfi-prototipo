import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SERVICES } from "@/lib/site";
import { IMG } from "@/db/seed-data";

export const metadata: Metadata = { title: "Servicios", description: "Instalación, mantenimiento, configuración, activaciones y recargas satelitales, alquiler y consultoría en radiocomunicación." };

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestros servicios"
        title={<>Soporte experto en <span className="text-brand-300">cada etapa</span> de tu operación</>}
        description="Más que vender equipos, acompañamos tu operación: diseño, instalación, programación, mantenimiento y activaciones satelitales con ingenieros certificados."
        breadcrumb={[{ label: "Servicios" }]}
        image={IMG.workers}
      >
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur transition hover:border-brand hover:bg-brand">
              {s.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="space-y-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} variant={i % 2 === 0 ? "left" : "right"}>
                <article id={s.slug} className="group grid scroll-mt-28 gap-6 rounded-3xl border border-navy/8 bg-white p-6 shadow-soft transition hover:shadow-card lg:grid-cols-[auto_1fr_1fr] lg:items-center lg:p-8">
                  <span className="grid h-20 w-20 place-items-center rounded-3xl border border-navy/10 bg-mist text-navy transition-all duration-500 group-hover:-rotate-6 group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:shadow-glow">
                    <Icon name={s.icon} size={34} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="eyebrow text-brand">{s.subtitle}</p>
                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{s.title}</h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-navy/65">{s.description}</p>
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 rounded-xl bg-mist/70 px-3 py-2 text-sm text-navy/80">
                        <Icon name="check" size={15} strokeWidth={3} className="mt-0.5 shrink-0 text-brand" /> {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 overflow-hidden rounded-3xl bg-navy text-white">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <p className="eyebrow text-brand-300">Planes de mantenimiento</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Tu flota siempre operativa</h2>
                <p className="mt-4 text-white/70">Contratos anuales con visitas programadas, repuestos con descuento, equipos de respaldo y prioridad en laboratorio.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { n: "Básico", d: "2 visitas/año", p: "Desde $1.2M" },
                    { n: "Pro", d: "4 visitas + respaldo", p: "Desde $2.8M" },
                    { n: "Crítico", d: "24/7 + SLA 4 h", p: "A medida" },
                  ].map((p) => (
                    <div key={p.n} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="font-bold">{p.n}</p>
                      <p className="text-xs text-white/60">{p.d}</p>
                      <p className="mt-2 text-sm font-extrabold text-brand-300">{p.p}</p>
                    </div>
                  ))}
                </div>
                <Link href="/cotizacion" className="btn-arrow mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">
                  Diseñar mi plan <Icon name="arrow-right" size={16} />
                </Link>
              </div>
              <div className="relative min-h-[280px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.catRepuestos} alt="Laboratorio técnico RFI" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/30 to-transparent" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaBanner title="¿Necesitas soporte ahora?" subtitle="Nuestros ingenieros están listos para ayudarte" ctaLabel="Contactar soporte" ctaHref="/soporte" />
    </>
  );
}
