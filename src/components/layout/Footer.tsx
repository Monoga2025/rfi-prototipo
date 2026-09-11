"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

const COLS = [
  [
    { href: "/tienda", label: "Equipos" },
    { href: "/marcas", label: "Marcas" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/servicios", label: "Servicios" },
  ],
  [
    { href: "/nosotros", label: "Nosotros" },
    { href: "/blog", label: "Blog" },
    { href: "/contacto", label: "Contacto" },
    { href: "/soporte", label: "Soporte" },
  ],
];

export function Footer() {
  return (
    <footer className="relative border-t border-navy/8 bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_auto_auto_1.4fr_1fr] lg:gap-14">
          <div>
            <Logo size="lg" />
            <p className="mt-5 max-w-[260px] text-sm leading-relaxed text-navy/60">
              Soluciones integrales en radiocomunicación, comunicación satelital y redes para operaciones críticas en Colombia.
            </p>
          </div>

          {COLS.map((col, i) => (
            <nav key={i} className="flex flex-col gap-3 lg:border-l lg:border-navy/10 lg:pl-10">
              {col.map((l) => (
                <Link key={l.href} href={l.href} className="group inline-flex items-center gap-2 text-sm font-medium text-navy/75 transition hover:text-brand">
                  <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="flex flex-col gap-3 text-sm text-navy/75 lg:border-l lg:border-navy/10 lg:pl-10">
            <a href={SITE.phoneHref} className="flex items-center gap-3 transition hover:text-brand">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-mist text-navy"><Icon name="phone" size={15} /></span>
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition hover:text-brand">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-mist text-navy"><Icon name="mail" size={15} /></span>
              {SITE.email}
            </a>
            <p className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-mist text-navy"><Icon name="pin" size={15} /></span>
              {SITE.city}
            </p>
          </div>

          <div className="lg:border-l lg:border-navy/10 lg:pl-10">
            <p className="text-sm font-semibold leading-relaxed text-navy">
              Tecnología
              <br />
              que te mantiene
              <br />
              conectado
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-brand animate-blink" style={{ animationDelay: `${i * 220}ms` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-navy/8 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-navy/55">© 2026 RFI Comunicaciones. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            {[
              { icon: "linkedin", label: "LinkedIn" },
              { icon: "instagram", label: "Instagram" },
              { icon: "youtube", label: "YouTube" },
            ].map((s) => (
              <a
                key={s.icon}
                href="#"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-navy/10 text-navy transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
              >
                <Icon name={s.icon} size={16} />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Volver arriba"
              className="ml-3 grid h-10 w-10 place-items-center rounded-full bg-brand text-white shadow-glow transition hover:-translate-y-1 hover:bg-brand-600"
            >
              <Icon name="arrow-up" size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
