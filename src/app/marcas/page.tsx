import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getBrandCounts, getBrands } from "@/lib/data";
import { IMG } from "@/db/seed-data";

export const metadata: Metadata = { title: "Marcas", description: "Distribuidores autorizados de Motorola Solutions, ICOM, Hytera, Garmin, Iridium, Inmarsat, Sinclair y Kenwood en Colombia." };

export default async function MarcasPage() {
  const [brands, counts] = await Promise.all([getBrands(), getBrandCounts()]);
  return (
    <>
      <PageHero
        eyebrow="Marcas que nos respaldan"
        title={<>Tecnología líder <span className="text-brand-300">a nivel mundial</span></>}
        description="Somos distribuidores autorizados de los fabricantes más confiables del planeta. Eso significa equipos originales, garantía real y soporte certificado."
        breadcrumb={[{ label: "Marcas" }]}
        image={IMG.catRadios}
      />
      <section className="bg-mist py-14 lg:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {brands.map((b, i) => (
              <Reveal key={b.id} delay={(i % 2) * 100}>
                <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white p-7">
                  <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-[0.08] transition-transform duration-700 group-hover:scale-150" style={{ background: b.accent }} />
                  <div className="flex items-start justify-between gap-4">
                    <BrandLogo slug={b.slug} />
                    <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-semibold text-navy/60">{b.country}</span>
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-navy/70">{b.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/55">
                      <Icon name="box" size={14} /> {counts[b.slug] ?? 0} productos en tienda
                    </span>
                    <Link href={`/tienda?brand=${b.slug}`} className="btn-arrow inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition group-hover:bg-brand">
                      Ver productos <Icon name="arrow-right" size={14} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 grid gap-6 rounded-3xl bg-navy p-8 text-white lg:grid-cols-3 lg:p-12">
            {[
              { icon: "badge-check", t: "Distribuidor autorizado", d: "Certificaciones vigentes con cada fabricante y acceso directo a garantías y RMA." },
              { icon: "cpu", t: "Ingenieros certificados", d: "Nuestro equipo se entrena cada año en las fábricas y academias de las marcas." },
              { icon: "refresh", t: "Actualizaciones y firmware", d: "Mantén tus equipos al día con las últimas funciones y parches de seguridad." },
            ].map((x) => (
              <div key={x.t} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-brand-300"><Icon name={x.icon} size={22} /></span>
                <div>
                  <p className="font-bold">{x.t}</p>
                  <p className="mt-1 text-sm text-white/65">{x.d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
      <CtaBanner title="¿Buscas una marca específica?" subtitle="Consíguela con garantía oficial y soporte local" ctaLabel="Solicitar cotización" />
    </>
  );
}
