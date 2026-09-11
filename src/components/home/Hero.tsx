"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { HERO_FEATURES } from "@/lib/site";
import { cx } from "@/lib/format";

const SLIDES = [
  { lines: ["Operaciones", "más seguras", "y eficientes"], tag: "RFI" },
  { lines: ["Cobertura", "donde otros", "no llegan"], tag: "Satelital" },
  { lines: ["Tecnología", "de misión", "crítica"], tag: "Radio digital" },
];

export function Hero() {
  const [slide, setSlide] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x, y });
  };

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_68%_38%,rgba(33,112,240,0.36),transparent_60%),radial-gradient(ellipse_45%_40%_at_18%_85%,rgba(33,112,240,0.16),transparent_55%),linear-gradient(180deg,#060b16_0%,#08122a_55%,#060b16_100%)]" />
      <div className="absolute inset-0 grid-lines opacity-80" />
      <div className="absolute inset-0 noise" />
      <div className="absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-brand/15 blur-3xl animate-drift" />
      <div className="absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-brand-600/20 blur-3xl animate-drift" style={{ animationDelay: "-6s" }} />

      {/* Mountains */}
      <svg className="absolute bottom-0 left-0 h-[46%] w-full" viewBox="0 0 1440 420" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="mtn1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#101d3a" stopOpacity="0.9" />
            <stop offset="1" stopColor="#060b16" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="mtn2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#172a52" stopOpacity="0.55" />
            <stop offset="1" stopColor="#060b16" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M0 420V300L120 240L260 290L380 200L520 262L650 170L780 236L900 150L1040 220L1160 172L1300 244L1440 190V420Z" fill="url(#mtn2)" />
        <path d="M0 420V340L160 300L300 330L430 270L560 320L700 250L830 306L980 240L1120 300L1260 262L1440 320V420Z" fill="url(#mtn1)" />
      </svg>

      <Container className="relative">
        <div className="grid min-h-[90svh] items-center gap-10 pb-40 pt-[120px] lg:min-h-[780px] lg:grid-cols-12 lg:gap-6 lg:pb-44 lg:pt-[130px]">
          {/* Left copy */}
          <div className="lg:col-span-5">
            <p className="eyebrow text-white/70 animate-rise" style={{ animationDelay: "80ms" }}>
              Conectamos lo esencial
            </p>
            <h1 className="mt-4 text-[52px] font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-[68px] lg:text-[74px]">
              <span className="block animate-rise" style={{ animationDelay: "160ms" }}>
                Comunicación
              </span>
              <span
                className="block bg-gradient-to-r from-brand-300 via-brand to-brand-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-rise"
                style={{ animationDelay: "260ms", animation: "rise .9s cubic-bezier(.2,.65,.2,1) .26s both, shimmer 6s linear 1.2s infinite" }}
              >
                sin límites
              </span>
            </h1>
            <p className="mt-6 max-w-[420px] text-[17px] leading-relaxed text-white/80 animate-rise" style={{ animationDelay: "360ms" }}>
              Soluciones integrales en radiocomunicación, comunicación satelital y redes para operaciones que mantienen el mundo en movimiento.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-rise" style={{ animationDelay: "460ms" }}>
              <Link
                href="/tienda"
                className="btn-arrow shine inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600"
              >
                Explora nuestros equipos <Icon name="arrow-right" size={16} />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white hover:text-navy"
              >
                Habla con un ingeniero
              </Link>
            </div>
          </div>

          {/* Radio stage */}
          <div className="lg:col-span-4">
            <div
              ref={stageRef}
              onMouseMove={onMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              className="relative mx-auto h-[440px] w-full max-w-[400px] sm:h-[520px] animate-fade"
              style={{ animationDelay: "300ms" }}
            >
              <div className="absolute left-1/2 top-1/2 h-[68%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/35 blur-3xl animate-pulse-glow" />

              {/* signal rings */}
              <div className="pointer-events-none absolute left-1/2 top-[14%] -translate-x-1/2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/40 animate-ping-slow"
                    style={{ animationDelay: `${i * 0.85}s` }}
                  />
                ))}
              </div>

              {/* back parallelogram (large, behind the radio) */}
              <div
                className="clip-para absolute left-[-14%] top-[14%] h-[58%] w-[74%] bg-gradient-to-br from-brand-300 via-brand to-brand-700 shadow-glow transition-transform duration-700 ease-out"
                style={{ transform: `translate(${tilt.x * -22}px, ${tilt.y * -16}px)` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.22)_50%,transparent_65%)] bg-[length:250%_100%] animate-shimmer" />
              </div>
              {/* second parallelogram (lower right, behind the radio) */}
              <div
                className="clip-para absolute bottom-[6%] right-[-12%] h-[44%] w-[60%] bg-gradient-to-tr from-brand-700 via-brand-500 to-brand-300 opacity-90 transition-transform duration-700 ease-out"
                style={{ transform: `translate(${tilt.x * 18}px, ${tilt.y * 14}px)` }}
              />

              {/* rock / ground */}
              <div className="absolute bottom-[1%] left-1/2 h-[16%] w-[86%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,#131d33_0%,#0a1224_55%,transparent_72%)]" />
              <div className="absolute bottom-[4%] left-1/2 h-8 w-[62%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-xl" />

              {/* radio cutout in front of the shapes */}
              <div
                className="absolute inset-x-0 bottom-[5%] top-[1%] flex items-end justify-center transition-transform duration-700 ease-out"
                style={{ transform: `translate(${tilt.x * 10}px, ${tilt.y * 8}px)` }}
              >
                <div className="relative h-full animate-float">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/img/hero-radio-cut.png"
                    alt="Radio Motorola digital de dos vías"
                    className="h-full w-auto max-w-none object-contain drop-shadow-[0_36px_44px_rgba(0,0,0,0.7)]"
                  />
                  {/* light sweep masked with the radio silhouette */}
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    style={{
                      WebkitMaskImage: "url(/img/hero-radio-cut.png)",
                      maskImage: "url(/img/hero-radio-cut.png)",
                      WebkitMaskSize: "100% 100%",
                      maskSize: "100% 100%",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-brand-200/40 to-transparent animate-scan" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/25 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* floating chips */}
              <div className="absolute -left-4 top-[30%] hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] font-semibold backdrop-blur-md animate-float sm:block" style={{ animationDelay: "-3s" }}>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                Señal DMR activa
              </div>
              <div className="absolute -right-6 top-[58%] hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] font-semibold backdrop-blur-md animate-float sm:block" style={{ animationDelay: "-1.5s" }}>
                IP68 · 28 h batería
              </div>
            </div>
          </div>

          {/* Right copy */}
          <div className="relative lg:col-span-3 lg:pl-6">
            <div className="relative h-[92px]">
              {SLIDES.map((s, i) => (
                <p
                  key={i}
                  aria-hidden={slide !== i}
                  className={cx(
                    "eyebrow absolute inset-0 text-[13px] leading-[1.75] tracking-[0.3em] text-white/85 transition-all duration-700",
                    slide === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  )}
                >
                  {s.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-brand" />
              <span key={slide} className="text-xs font-bold uppercase tracking-[0.3em] text-white animate-fade">
                {SLIDES[slide].tag}
              </span>
            </div>

            {/* vertical indicator */}
            <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={cx(
                    "text-[11px] font-semibold tracking-widest transition-all duration-500",
                    slide === i ? "text-white" : "text-white/35 hover:text-white/70",
                  )}
                  aria-label={`Ir al mensaje ${i + 1}`}
                >
                  0{i + 1}
                  <span className={cx("mx-auto mt-1 block h-px bg-brand transition-all duration-500", slide === i ? "w-5" : "w-0")} />
                </button>
              ))}
              <span className="mt-2 h-14 w-px bg-gradient-to-b from-white/40 to-transparent" />
              <Icon name="arrow-down" size={16} className="text-white/70 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className="absolute inset-x-5 bottom-8 lg:inset-x-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
            {HERO_FEATURES.map((f, i) => (
              <div key={f.title} className="flex items-center gap-3 animate-rise" style={{ animationDelay: `${600 + i * 90}ms` }}>
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 text-white transition hover:border-brand hover:bg-brand">
                  <Icon name={f.icon} size={17} />
                </span>
                <p className="text-[12px] font-semibold leading-tight text-white/90">
                  {f.title}
                  <span className="block font-normal text-white/70">{f.subtitle}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-right text-[10px] font-semibold tracking-[0.38em] text-white/50">
            TIERRA · MAR · AIRE · MÁS ALLÁ
          </p>
        </div>
      </Container>
    </section>
  );
}
