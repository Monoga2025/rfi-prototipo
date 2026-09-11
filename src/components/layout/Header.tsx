"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/components/cart/CartProvider";
import { QuickSearch } from "./QuickSearch";
import { NAV, SITE } from "@/lib/site";
import { cx } from "@/lib/format";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, setDrawerOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open || searchOpen;

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-500",
        solid ? "bg-white/88 shadow-[0_1px_0_rgba(11,23,48,0.08)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between gap-4 px-5 lg:px-8">
        <Logo light={!solid} />

        <nav
          className={cx(
            "hidden items-center rounded-full border p-1 transition-colors duration-500 lg:flex",
            solid ? "border-navy/10 bg-white" : "border-white/15 bg-white/[0.06] backdrop-blur-md",
          )}
        >
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "relative rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300",
                  solid
                    ? active
                      ? "bg-navy text-white"
                      : "text-navy/75 hover:bg-mist hover:text-navy"
                    : active
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            aria-label="Buscar"
            onClick={() => setSearchOpen((v) => !v)}
            className={cx(
              "grid h-10 w-10 place-items-center rounded-full transition",
              solid ? "text-navy hover:bg-mist" : "text-white hover:bg-white/10",
            )}
          >
            <Icon name={searchOpen ? "x" : "search"} size={20} />
          </button>
          <button
            aria-label="Abrir carrito"
            onClick={() => setDrawerOpen(true)}
            className={cx(
              "relative grid h-10 w-10 place-items-center rounded-full transition",
              solid ? "text-navy hover:bg-mist" : "text-white hover:bg-white/10",
            )}
          >
            <Icon name="cart" size={20} />
            <span
              key={cart.count}
              className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white ring-2 ring-white/20 animate-pop"
            >
              {cart.count}
            </span>
          </button>
          <Link
            href="/cotizacion"
            className="btn-arrow shine ml-1 hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow transition hover:bg-brand-600 md:inline-flex"
          >
            Solicita una cotización <Icon name="arrow-right" size={15} />
          </Link>
          <button
            aria-label="Menú"
            onClick={() => setOpen((v) => !v)}
            className={cx(
              "grid h-10 w-10 place-items-center rounded-full transition lg:hidden",
              solid ? "text-navy hover:bg-mist" : "text-white hover:bg-white/10",
            )}
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-navy/8 bg-white/95 backdrop-blur-xl animate-fade">
          <div className="mx-auto max-w-[760px] px-5 py-4 lg:px-8">
            <QuickSearch autoFocus onNavigate={() => setSearchOpen(false)} />
            <div className="mt-3 flex flex-wrap gap-2">
              {["Motorola R7", "Iridium", "Garmin inReach", "Antenas", "Baterías"].map((s) => (
                <Link
                  key={s}
                  href={`/tienda?q=${encodeURIComponent(s)}`}
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full border border-navy/10 px-3 py-1 text-xs font-medium text-navy/70 transition hover:border-brand hover:text-brand"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={cx(
          "fixed inset-x-0 top-[78px] bottom-0 z-40 overflow-y-auto bg-white transition-all duration-500 lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <div className="flex h-full flex-col px-6 py-6">
          <nav className="flex flex-col divide-y divide-navy/8">
            {[{ href: "/", label: "Inicio" }, ...NAV, { href: "/tienda", label: "Tienda" }, { href: "/contacto", label: "Contacto" }].map(
              (item, i) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className="flex items-center justify-between py-4 text-lg font-bold text-navy animate-rise"
                >
                  {item.label}
                  <Icon name="arrow-up-right" size={18} className="text-brand" />
                </Link>
              ),
            )}
          </nav>
          <Link
            href="/cotizacion"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-white shadow-glow"
          >
            Solicita una cotización <Icon name="arrow-right" size={16} />
          </Link>
          <div className="mt-auto pt-8 text-sm text-navy/60">
            <p className="font-semibold text-navy">{SITE.phone}</p>
            <p>{SITE.email}</p>
            <p>{SITE.city}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
