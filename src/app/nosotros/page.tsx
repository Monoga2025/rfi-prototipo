import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Counter, Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/home/CtaBanner";
import { IMG } from "@/db/seed-data";

export const metadata: Metadata = { title: "Nosotros", description: "Más de 15 años conectando operaciones críticas en Colombia con radiocomunicación y tecnología satelital." };

const VALUES = [
  { icon: "shield-check", t: "Confiabilidad", d: "Equipos originales, procesos certificados y compromisos que cumplimos." },
  { icon: "zap", t: "Respuesta", d: "Operaciones críticas no esperan. Soporte ágil, 24/7 cuando lo necesitas." },
  { icon: "users", t: "Cercanía", d: "Ingenieros que hablan tu idioma y entienden tu operación en terreno." },
  { icon: "target", t: "Precisión técnica", d: "Diseñamos con datos: estudios de cobertura, mediciones y pruebas documentadas." },
];

const TIMELINE = [
  { y: "2010", t: "Nacemos en Bogotá", d: "Iniciamos como taller autorizado de radios de dos vías para el sector transporte." },
  { y: "2014", t: "Distribuidor Motorola Solutions", d: "Obtenemos la certificación de canal autorizado y ampliamos a Hytera e ICOM." },
  { y: "2017", t: "División satelital", d: "Incorporamos Iridium e Inmarsat para operaciones marítimas, minería y expediciones." },
  { y: "2021", t: "Laboratorio de ingeniería", d: "Inauguramos nuestro laboratorio de RF con analizadores calibrados y cámara de pruebas." },
  { y: "2026", t: "Tienda en línea", d: "Lanzamos la tienda RFI para que compres equipos originales con la misma asesoría experta." },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title={<>Conectamos <span className="text-brand-300">lo esencial</span></>}
        description="Somos un equipo de ingenieros y técnicos apasionados por la radiocomunicación. Desde 2010 mantenemos conectadas las operaciones que mueven a Colombia."
        breadcrumb={[{ label: "Nosotros" }]}
        image={IMG.rooftop}
      />

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal variant="left">
              <p className="eyebrow text-brand">Nuestra misión</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Que ninguna operación se quede sin comunicación</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-navy/70">
                Cuando un minero, un capitán, un bombero o un técnico presiona el botón de su radio, del otro lado tiene que haber una respuesta. Esa certeza es la razón de ser de RFI Comunicaciones: diseñamos, instalamos y mantenemos sistemas de comunicación que funcionan en el peor momento, cuando más importa.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { v: 500, p: "+", l: "Proyectos" },
                  { v: 15, p: "+", l: "Años" },
                  { v: 32, p: "", l: "Departamentos" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-navy/8 bg-mist p-4 text-center">
                    <p className="text-2xl font-extrabold text-navy">
                      <Counter value={s.v} prefix={s.p} />
                    </p>
                    <p className="text-xs text-navy/60">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal variant="right">
              <div className="relative">
                <div className="clip-para absolute -left-6 -top-6 h-40 w-40 bg-gradient-to-br from-brand-300 to-brand-600 opacity-80" />
                <div className="relative overflow-hidden rounded-3xl shadow-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG.workers} alt="Equipo técnico RFI" className="aspect-[4/3] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <p className="absolute bottom-5 left-5 text-sm font-semibold text-white">Instalación de sitio de repetición · Eje Cafetero</p>
                </div>
                <div className="absolute -bottom-6 -right-4 rounded-2xl border border-navy/8 bg-white p-4 shadow-card animate-float">
                  <p className="text-xs text-navy/60">Disponibilidad de red promedio</p>
                  <p className="text-2xl font-extrabold text-brand">99.7 %</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-14 lg:py-20">
        <Container>
          <Reveal>
            <p className="eyebrow text-navy">Valores</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Lo que nos mueve</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 90}>
                <div className="group h-full rounded-3xl border border-navy/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand transition group-hover:bg-brand group-hover:text-white"><Icon name={v.icon} size={22} /></span>
                  <h3 className="mt-4 text-lg font-extrabold text-navy">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/65">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <Reveal>
            <p className="eyebrow text-navy">Trayectoria</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Una historia de conexión</h2>
          </Reveal>
          <ol className="relative mt-10 space-y-8 border-l-2 border-brand/20 pl-8">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.y} delay={i * 80}>
                <li className="relative">
                  <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border-4 border-white bg-brand shadow-glow" />
                  <p className="text-xs font-extrabold tracking-widest text-brand">{t.y}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-navy">{t.t}</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-navy/65">{t.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBanner title="¿Quieres trabajar con nosotros?" subtitle="Hablemos de cómo conectar tu operación" ctaLabel="Contáctanos" ctaHref="/contacto" />
    </>
  );
}
