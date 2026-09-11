import Link from "next/link";
import { cx } from "@/lib/format";

type Props = {
  light?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  asLink?: boolean;
};

export function Logo({ light = false, size = "md", className, asLink = true }: Props) {
  const scale = size === "lg" ? "text-[44px]" : size === "sm" ? "text-[24px]" : "text-[32px]";
  const waves = size === "lg" ? "h-11 w-7" : size === "sm" ? "h-6 w-4" : "h-8 w-5";
  const sub = size === "lg" ? "text-[10px]" : size === "sm" ? "text-[6.5px]" : "text-[8px]";

  const content = (
    <span className={cx("group inline-flex select-none flex-col leading-none", className)}>
      <span className="flex items-end gap-0.5">
        <span
          className={cx(
            "font-black italic tracking-[-0.06em] leading-none transition-colors duration-500",
            scale,
            light ? "text-white" : "text-navy",
          )}
        >
          RFI
        </span>
        <svg viewBox="0 0 24 40" className={cx(waves, "mb-0.5 overflow-visible")} fill="none" aria-hidden="true">
          <path d="M5.7 14.3A8 8 0 0 1 5.7 25.7" stroke="#2170f0" strokeWidth="3.2" strokeLinecap="round" className="animate-wave" style={{ animationDelay: "0ms" }} />
          <path d="M9.9 10.1A14 14 0 0 1 9.9 29.9" stroke="#2170f0" strokeWidth="3.2" strokeLinecap="round" className="animate-wave" style={{ animationDelay: "250ms" }} />
          <path d="M14.1 5.9A20 20 0 0 1 14.1 34.1" stroke="#2170f0" strokeWidth="3.2" strokeLinecap="round" className="animate-wave" style={{ animationDelay: "500ms" }} />
        </svg>
      </span>
      <span
        className={cx(
          "mt-1 font-extrabold uppercase tracking-[0.34em] transition-colors duration-500",
          sub,
          light ? "text-white/85" : "text-navy/80",
        )}
      >
        Comunicaciones
      </span>
    </span>
  );

  if (!asLink) return content;
  return (
    <Link href="/" aria-label="RFI Comunicaciones - Inicio" className="inline-flex">
      {content}
    </Link>
  );
}
