import Link from "next/link";
import type { Brand } from "@/db/schema";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Brands({ brands }: { brands: Brand[] }) {
  const loop = [...brands, ...brands];
  return (
    <section className="bg-white pb-6 pt-2">
      <Container>
        <Reveal className="flex items-center gap-4">
          <p className="eyebrow text-navy">Marcas que nos respaldan</p>
          <span className="h-1 w-1 rounded-full bg-navy/40" />
          <p className="text-xs text-navy/55">Tecnología líder a nivel mundial</p>
        </Reveal>

        <Reveal delay={120} className="mt-5 flex items-center gap-4">
          <div className="mask-x relative flex-1 overflow-hidden">
            <div className="flex w-max items-center gap-14 py-4 pr-14 animate-marquee hover:[animation-play-state:paused]">
              {loop.map((b, i) => (
                <Link
                  key={`${b.slug}-${i}`}
                  href={`/tienda?brand=${b.slug}`}
                  title={b.name}
                  className="shrink-0 opacity-60 grayscale transition-all duration-500 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                >
                  <BrandLogo slug={b.slug} />
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/marcas"
            aria-label="Ver todas las marcas"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-brand hover:bg-brand hover:text-white"
          >
            <Icon name="arrow-right" size={18} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
