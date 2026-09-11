import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/home/CtaBanner";
import { FAQS, SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Soporte", description: "Centro de ayuda, preguntas frecuentes, garantías y soporte técnico de RFI Comunicaciones." };

const CHANNELS = [
  { icon: "headset", t: "Mesa de ayuda", d: "Soporte técnico de lunes a viernes", a: SITE.phone, href: SITE.phoneHref },
  { icon: "message", t: "WhatsApp", d: "Respuesta promedio en 10 minutos", a: "+57 300 123 4567", href: SITE.whatsapp },
  { icon: "mail", t: "Correo", d: "Garantías, RMA y facturación", a: "soporte@rficomunicaciones.com", href: "mailto:soporte@rficomunicaciones.com" },
  { icon: "wrench", t: "Laboratorio", d: "Recepción de equipos en Bogotá", a: "Calle 100 # 19-54", href: "/contacto" },
];

export default function SoportePage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Centro de ayuda"
        title={<>Soporte <span className="text-brand-300">técnico</span></>}
        description="Garantías, programación, activaciones satelitales y resolución de fallas con ingenieros certificados."
        breadcrumb={[{ label: "Soporte" }]}
      />
      <section className="bg-mist py-12 lg:py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <a href={c.href} className="group flex h-full flex-col rounded-3xl border border-navy/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand transition group-hover:bg-brand group-hover:text-white"><Icon name={c.icon} size={22} /></span>
                  <p className="mt-4 font-extrabold text-navy">{c.t}</p>
                  <p className="text-xs text-navy/60">{c.d}</p>
                  <p className="mt-auto pt-4 text-sm font-semibold text-brand">{c.a}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <Reveal>
                <p className="eyebrow text-navy">Preguntas frecuentes</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Resolvemos tus dudas</h2>
              </Reveal>
              <div className="mt-6 space-y-3">
                {FAQS.map((f, i) => (
                  <Reveal key={f.q} delay={i * 60}>
                    <details className="group rounded-2xl border border-navy/8 bg-white p-5 open:shadow-soft">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-bold text-navy">
                        {f.q}
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-navy transition-transform duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white">
                          <Icon name="plus" size={15} />
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-navy/65">{f.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal variant="right">
              <div className="space-y-4 lg:sticky lg:top-[110px]">
                <div className="rounded-3xl bg-navy p-6 text-white">
                  <p className="eyebrow text-brand-300">Garantías y RMA</p>
                  <ol className="mt-4 space-y-3 text-sm text-white/80">
                    {["Escríbenos con el número de serie y una descripción de la falla.", "Te enviamos la guía de recolección o recibes el equipo en nuestro laboratorio.", "Diagnóstico en 48 h hábiles y reparación bajo garantía o cotización.", "Devolución con reporte técnico y pruebas documentadas."].map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-3xl border border-navy/8 bg-white p-6">
                  <p className="font-bold text-navy">Descargas</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {["Guía rápida Motorola R7", "Manual Iridium 9575 Extreme", "Formato de solicitud de garantía", "Catálogo RFI 2026"].map((d) => (
                      <li key={d}>
                        <a href="#" className="flex items-center justify-between rounded-xl px-3 py-2 text-navy/75 transition hover:bg-mist hover:text-brand">
                          <span className="flex items-center gap-2"><Icon name="file-text" size={15} /> {d}</span>
                          <Icon name="arrow-down" size={14} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contacto" className="btn-arrow inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow">
                  Abrir un caso de soporte <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      <CtaBanner title="Mantenimiento preventivo" subtitle="evita fallas cuando más importa" ctaLabel="Ver planes" ctaHref="/servicios#mantenimiento" />
    </>
  );
}
