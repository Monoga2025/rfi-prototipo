import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/home/CtaBanner";
import { BLOG_POSTS } from "@/lib/site";

export const metadata: Metadata = { title: "Blog", description: "Guías, comparativas y novedades en radiocomunicación y tecnología satelital." };

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <>
      <PageHero compact eyebrow="Blog RFI" title={<>Conocimiento que <span className="text-brand-300">conecta</span></>} description="Guías prácticas, comparativas y novedades para equipos de operaciones y tecnología." breadcrumb={[{ label: "Blog" }]} />
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <Reveal>
            <article className="group grid overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-soft lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
                <span className="absolute left-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">{featured.category}</span>
              </div>
              <div className="flex flex-col p-8 lg:p-10">
                <p className="text-xs text-navy/50">{featured.date} · {featured.readTime} de lectura</p>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight text-navy lg:text-3xl">{featured.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-navy/65">{featured.excerpt}</p>
                <Link href="/contacto" className="btn-arrow mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand">
                  Leer artículo <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </article>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-navy backdrop-blur">{p.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs text-navy/50">{p.date} · {p.readTime}</p>
                    <h3 className="mt-2 text-lg font-extrabold leading-snug text-navy">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/65">{p.excerpt}</p>
                    <Link href="/contacto" className="btn-arrow mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand">
                      Leer más <Icon name="arrow-right" size={15} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner title="¿Tienes una pregunta técnica?" subtitle="Nuestros ingenieros la responden" ctaLabel="Escríbenos" ctaHref="/contacto" />
    </>
  );
}
