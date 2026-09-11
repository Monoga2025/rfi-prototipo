import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { cx } from "@/lib/format";

type Crumb = { href?: string; label: string };

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  breadcrumb?: Crumb[];
  children?: ReactNode;
  compact?: boolean;
  image?: string;
  align?: "left" | "center";
};

export function PageHero({ eyebrow, title, description, breadcrumb, children, compact, image, align = "left" }: Props) {
  return (
    <section className={cx("relative overflow-hidden bg-ink text-white", compact ? "pb-10 pt-[110px]" : "pb-16 pt-[130px] lg:pb-20 lg:pt-[150px]")}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_75%_20%,rgba(33,112,240,0.35),transparent_60%),linear-gradient(180deg,#060b16_0%,#0a1428_100%)]" />
      <div className="absolute inset-0 grid-lines opacity-70" />
      <div className="absolute inset-0 noise" />
      <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl animate-drift" />
      {image && (
        <div className="clip-diag-l-sm absolute inset-y-0 right-0 hidden w-[46%] overflow-hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="h-full w-full object-cover opacity-70 transition-transform duration-[8000ms] hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        </div>
      )}
      <Container className={cx("relative", align === "center" && "text-center")}>
        {breadcrumb && (
          <nav aria-label="Ruta" className={cx("mb-5 flex flex-wrap items-center gap-1.5 text-xs text-white/60 animate-fade", align === "center" && "justify-center")}>
            <Link href="/" className="inline-flex items-center gap-1 hover:text-white">
              <Icon name="home" size={13} /> Inicio
            </Link>
            {breadcrumb.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <Icon name="chevron-right" size={12} className="text-white/30" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-brand-300">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow text-white/70 animate-rise">{eyebrow}</p>}
        <h1
          className={cx(
            "mt-3 max-w-[760px] font-extrabold leading-[1.02] tracking-[-0.03em] text-white animate-rise",
            compact ? "text-[34px] sm:text-[42px]" : "text-[40px] sm:text-[56px] lg:text-[64px]",
            align === "center" && "mx-auto",
          )}
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {description && (
          <p className={cx("mt-5 max-w-[560px] text-[16px] leading-relaxed text-white/75 animate-rise", align === "center" && "mx-auto")} style={{ animationDelay: "160ms" }}>
            {description}
          </p>
        )}
        {children && (
          <div className="mt-8 animate-rise" style={{ animationDelay: "240ms" }}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
