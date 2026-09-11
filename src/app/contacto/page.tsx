import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/Forms";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contacto", description: "Habla con un ingeniero de RFI Comunicaciones. Bogotá, Colombia." };

export default function ContactoPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Contacto"
        title={<>Habla con <span className="text-brand-300">un ingeniero</span></>}
        description="Cuéntanos qué necesita tu operación y te respondemos el mismo día hábil."
        breadcrumb={[{ label: "Contacto" }]}
      />
      <section className="bg-mist py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <Reveal>
              <div className="rounded-3xl border border-navy/8 bg-white p-6 shadow-soft sm:p-8">
                <h2 className="text-xl font-extrabold text-navy">Envíanos un mensaje</h2>
                <p className="mt-1 text-sm text-navy/60">Todos los campos marcados con * son obligatorios.</p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} variant="right">
              <div className="space-y-4">
                <div className="rounded-3xl bg-navy p-6 text-white">
                  <p className="eyebrow text-brand-300">Canales directos</p>
                  <ul className="mt-4 space-y-4 text-sm">
                    <li>
                      <a href={SITE.phoneHref} className="flex items-center gap-3 transition hover:text-brand-300">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Icon name="phone" size={17} /></span>
                        <span><span className="block text-xs text-white/50">Teléfono</span>{SITE.phone}</span>
                      </a>
                    </li>
                    <li>
                      <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-brand-300">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Icon name="message" size={17} /></span>
                        <span><span className="block text-xs text-white/50">WhatsApp</span>+57 300 123 4567</span>
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition hover:text-brand-300">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Icon name="mail" size={17} /></span>
                        <span><span className="block text-xs text-white/50">Correo</span>{SITE.email}</span>
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Icon name="pin" size={17} /></span>
                      <span><span className="block text-xs text-white/50">Oficina y laboratorio</span>{SITE.address}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Icon name="clock" size={17} /></span>
                      <span><span className="block text-xs text-white/50">Horario</span>{SITE.hours}</span>
                    </li>
                  </ul>
                </div>
                <div className="relative overflow-hidden rounded-3xl border border-navy/8 bg-white p-6">
                  <div className="absolute inset-0 grid-lines-light" />
                  <div className="relative">
                    <p className="text-sm font-bold text-navy">Soporte de emergencia 24/7</p>
                    <p className="mt-1 text-xs text-navy/60">Para clientes con contrato de mantenimiento crítico.</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-lg font-extrabold text-brand">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> +57 310 555 0199
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
