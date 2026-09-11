import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Counter, Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";
import { IMG } from "@/db/seed-data";
import { STATS } from "@/lib/site";

export function Projects() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#f3f6fb_0%,#ffffff_45%,#eaf2ff_100%)]">
      <div className="absolute inset-0 grid-lines-light" />
      <div className="relative grid lg:grid-cols-2">
        <Container className="relative py-16 lg:max-w-[640px] lg:pr-10 lg:py-24 lg:ml-[max(0px,calc((100vw-1280px)/2))] lg:mr-0">
          <Reveal>
            <p className="eyebrow text-navy">Proyectos</p>
            <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[40px]">
              Soluciones reales
              <br />
              para grandes desafíos
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-navy/70">
              Diseñamos e implementamos sistemas de comunicación a la medida, desde el levantamiento de necesidades hasta la puesta en marcha.
            </p>
            <Link
              href="/proyectos"
              className="btn-arrow mt-7 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white"
            >
              Conoce nuestros proyectos <Icon name="arrow-right" size={16} />
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 110} className="flex items-center gap-3 sm:border-l sm:border-navy/10 sm:pl-5 first:sm:border-0 first:sm:pl-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy/15 bg-white text-navy">
                  <Icon name={s.icon} size={16} />
                </span>
                <div>
                  <p className="text-xl font-extrabold leading-none text-navy">
                    <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={"suffix" in s ? s.suffix : ""} />
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-navy/60">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>

        <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[560px]">
          <div className="clip-diag-l-sm absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.worker} alt="Técnico de RFI en torre de telecomunicaciones" className="h-full w-full object-cover object-[60%_center] transition-transform duration-[6000ms] ease-out hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-navy/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/30 to-transparent" />
          </div>
          <div className="absolute right-6 top-8 text-right sm:right-10 sm:top-12">
            <Reveal variant="right">
              <p className="eyebrow text-[12px] leading-[1.9] tracking-[0.3em] text-white drop-shadow">
                Infraestructura
                <br />
                que conecta
                <br />
                oportunidades
              </p>
            </Reveal>
          </div>
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12">
            <Reveal delay={200} variant="scale">
              <Logo light size="lg" asLink={false} />
            </Reveal>
          </div>
          <span className="absolute left-[22%] top-[38%] hidden h-3 w-3 rounded-full bg-brand shadow-[0_0_0_6px_rgba(33,112,240,0.3)] animate-pulse lg:block" />
        </div>
      </div>
    </section>
  );
}
