import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const STARS = [
  [6, 18], [12, 62], [20, 30], [28, 80], [35, 12], [42, 50], [50, 22], [57, 70], [63, 40], [70, 15], [78, 58], [85, 28], [92, 66], [96, 20], [15, 90], [46, 88], [74, 86],
];

export function CtaBanner({
  title = "Un mundo más conectado",
  subtitle = "es un mundo de más oportunidades",
  ctaLabel = "Hablemos de tu proyecto",
  ctaHref = "/cotizacion",
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#02061a] py-14 text-white lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_120%,rgba(33,112,240,0.35),transparent_60%)]" />
      {STARS.map(([x, y], i) => (
        <span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white animate-blink"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 7) * 0.4}s`, opacity: 0.7 }}
        />
      ))}
      <div className="planet absolute -bottom-[560px] left-1/2 h-[700px] w-[1500px] -translate-x-[35%] rounded-[50%] sm:-bottom-[600px] lg:-translate-x-[30%]" />
      <div className="absolute bottom-0 left-1/2 h-[1px] w-[1100px] -translate-x-[35%] rounded-full bg-gradient-to-r from-transparent via-brand-300/70 to-transparent blur-[1px]" />
      <span className="absolute left-[62%] top-[30%] h-2 w-2 rounded-full bg-brand-300 shadow-[0_0_16px_4px_rgba(125,176,255,.8)] animate-orbit" style={{ ["--orbit" as string]: "140px" }} />

      <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <Reveal>
          <h2 className="text-[30px] leading-[1.15] tracking-tight sm:text-[36px]">
            <span className="block font-extrabold">{title}</span>
            <span className="block font-light text-white/90">{subtitle}</span>
          </h2>
        </Reveal>
        <Reveal delay={150} variant="right">
          <Link
            href={ctaHref}
            className="btn-arrow shine inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-400"
          >
            {ctaLabel} <Icon name="arrow-right" size={16} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
