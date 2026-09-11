import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Counter, Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/home/CtaBanner";
import { PROJECTS, STATS } from "@/lib/site";
import { IMG } from "@/db/seed-data";

export const metadata: Metadata = { title: "Proyectos", description: "Casos de éxito en minería, oil & gas, sector marítimo, seguridad y sector público." };

const STEPS = [
  { n: "01", t: "Levantamiento", d: "Visitamos tu operación, entendemos flujos y riesgos, y medimos la cobertura actual." },
  { n: "02", t: "Diseño", d: "Simulamos propagación, definimos arquitectura, equipos, licencias y presupuesto." },
  { n: "03", t: "Implementación", d: "Instalamos, programamos y probamos con protocolos de aceptación documentados." },
  { n: "04", t: "Acompañamiento", d: "Capacitación, mantenimiento preventivo y soporte 24/7 para operaciones críticas." },
];

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyectos"
        title={<>Soluciones reales <span className="text-brand-300">para grandes desafíos</span></>}
        description="Diseñamos e implementamos sistemas de comunicación a la medida, desde el levantamiento de necesidades hasta la puesta en marcha y el soporte continuo."
        breadcrumb={[{ label: "Proyectos" }]}
        image={IMG.worker}
      >
        <div className="flex flex-wrap gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-white">
                <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={"suffix" in s ? s.suffix : ""} />
              </p>
              <p className="text-xs text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 100}>
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                    <div className="absolute left-5 top-5 flex gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-navy backdrop-blur">{p.sector}</span>
                      <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">{p.year}</span>
                    </div>
                    <p className="absolute bottom-4 left-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90">
                      <Icon name="pin" size={13} /> {p.location}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-extrabold leading-snug text-navy">{p.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-navy/65">{p.summary}</p>
                    <ul className="mt-4 space-y-1.5">
                      {p.results.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-navy/80">
                          <Icon name="check" size={15} strokeWidth={3} className="mt-0.5 shrink-0 text-brand" /> {r}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-mist px-3 py-1 text-[11px] font-semibold text-navy/65">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-mist py-14 lg:py-20">
        <div className="absolute inset-0 grid-lines-light" />
        <Container className="relative">
          <Reveal>
            <p className="eyebrow text-navy">Metodología</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Cómo ejecutamos cada proyecto</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="group relative h-full rounded-3xl border border-navy/8 bg-white p-6 transition hover:border-brand/40">
                  <span className="text-4xl font-black text-brand/20 transition group-hover:text-brand">{s.n}</span>
                  <h3 className="mt-3 text-lg font-extrabold text-navy">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/65">{s.d}</p>
                  {i < STEPS.length - 1 && <Icon name="arrow-right" size={18} className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-brand lg:block" />}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/cotizacion" className="btn-arrow shine inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-glow">
              Cuéntanos tu proyecto <Icon name="arrow-right" size={16} />
            </Link>
          </Reveal>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
