import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/forms/Forms";
import { getProductBySlug } from "@/lib/data";
import { formatCOP } from "@/lib/format";

export const metadata: Metadata = { title: "Solicita una cotización", description: "Recibe una propuesta a la medida para radios, satelitales, GPS y servicios de ingeniería." };

export default async function CotizacionPage() {
  const product = await getProductBySlug("motorola-r7");

  return (
    <>
      <PageHero
        compact
        eyebrow="Cotización"
        title={<>Solicita una <span className="text-brand-300">cotización</span></>}
        description="Respondemos en menos de 24 horas hábiles con una propuesta técnica y comercial ajustada a tu operación."
        breadcrumb={[{ label: "Cotización" }]}
      />
      <section className="bg-mist py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <Reveal>
              <div className="rounded-3xl border border-navy/8 bg-white p-6 shadow-soft sm:p-8">
                <QuoteForm productSlug={product?.slug} productName={product?.name} />
              </div>
            </Reveal>
            <Reveal delay={120} variant="right">
              <div className="space-y-4">
                {product && (
                  <div className="overflow-hidden rounded-3xl border border-navy/8 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{product.brand.name}</p>
                      <p className="mt-1 font-bold text-navy">{product.name}</p>
                      <p className="mt-1 text-sm text-navy/60">Precio unitario de referencia: <span className="font-bold text-navy">{formatCOP(product.price)}</span></p>
                    </div>
                  </div>
                )}
                <div className="rounded-3xl bg-navy p-6 text-white">
                  <p className="eyebrow text-brand-300">¿Qué incluye?</p>
                  <ul className="mt-4 space-y-3 text-sm">
                    {[
                      "Análisis de tu necesidad por un ingeniero",
                      "Propuesta con equipos, accesorios y servicios",
                      "Precios por volumen y opciones de financiación",
                      "Plan de implementación y tiempos de entrega",
                      "Acompañamiento en licenciamiento de espectro",
                    ].map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <Icon name="check" size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-brand-300" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-navy/8 bg-white p-6">
                  <p className="text-sm font-bold text-navy">¿Prefieres hablar directamente?</p>
                  <a href="tel:+576017451234" className="mt-2 block text-lg font-extrabold text-brand">+57 601 745 1234</a>
                  <p className="text-xs text-navy/55">Lunes a viernes 8:00 a.m. – 6:00 p.m.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
