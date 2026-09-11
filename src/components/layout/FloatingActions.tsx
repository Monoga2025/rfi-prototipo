"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";
import { cx } from "@/lib/format";

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = 20;
  const c = 2 * Math.PI * r;

  return (
    <>
      <div className="fixed left-0 top-0 z-[65] h-[3px] w-full bg-transparent">
        <div className="h-full bg-gradient-to-r from-brand-400 via-brand to-brand-600 transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="group fixed bottom-6 left-6 z-[55] flex items-center gap-2 rounded-full bg-[#25D366] py-2.5 pl-2.5 pr-4 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,.7)] transition hover:-translate-y-1"
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/20">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-white/30" />
          <Icon name="message" size={17} />
        </span>
        <span className="hidden sm:inline">Habla con un ingeniero</span>
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        className={cx(
          "fixed bottom-6 right-6 z-[55] grid h-12 w-12 place-items-center rounded-full bg-white text-navy shadow-card transition-all duration-500 hover:-translate-y-1",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r={r} stroke="#e6ecf5" strokeWidth="3" fill="none" />
          <circle
            cx="24"
            cy="24"
            r={r}
            stroke="#2170f0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - progress)}
          />
        </svg>
        <Icon name="arrow-up" size={18} />
      </button>
    </>
  );
}
