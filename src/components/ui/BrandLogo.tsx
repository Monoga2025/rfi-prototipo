import { cx } from "@/lib/format";

export function BrandLogo({ slug, className, mono = false }: { slug: string; className?: string; mono?: boolean }) {
  const c = (color: string) => (mono ? "currentColor" : color);

  switch (slug) {
    case "motorola":
      return (
        <span className={cx("inline-flex items-center gap-2", className)}>
          <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
            <circle cx="16" cy="16" r="15" fill="none" stroke={c("#0b1730")} strokeWidth="2.4" />
            <path d="M8 23 12.5 9l3.5 8 3.5-8L24 23h-3.2l-2.2-7-2.6 6.4-2.6-6.4-2.2 7z" fill={c("#0b1730")} />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-black italic tracking-tight" style={{ color: c("#0b1730") }}>MOTOROLA</span>
            <span className="text-[9px] font-bold tracking-[0.18em]" style={{ color: c("#0b1730") }}>SOLUTIONS</span>
          </span>
        </span>
      );
    case "icom":
      return (
        <span className={cx("inline-flex items-center", className)}>
          <span className="text-[26px] font-black tracking-tight" style={{ color: c("#0b1730") }}>IC</span>
          <span className="relative mx-[1px] inline-grid h-6 w-6 place-items-center">
            <span className="absolute inset-0 rounded-full border-[3px]" style={{ borderColor: c("#e11d2e") }} />
          </span>
          <span className="text-[26px] font-black tracking-tight" style={{ color: c("#0b1730") }}>M</span>
        </span>
      );
    case "hytera":
      return (
        <span className={cx("relative inline-flex items-center", className)}>
          <span className="text-[26px] font-bold tracking-tight" style={{ color: c("#0b1730") }}>Hytera</span>
          <svg viewBox="0 0 24 16" className="absolute -right-4 -top-1 h-4 w-6" aria-hidden="true">
            <path d="M2 14 C6 4, 14 2, 22 2 C16 6, 12 10, 8 14z" fill={c("#0f9d8f")} />
            <path d="M8 14 C12 10, 16 6, 22 2 C18 10, 14 14, 8 14z" fill={c("#2170f0")} opacity="0.8" />
          </svg>
        </span>
      );
    case "garmin":
      return (
        <span className={cx("inline-flex items-center gap-1", className)}>
          <span className="text-[22px] font-black tracking-[0.04em]" style={{ color: c("#0b1730") }}>GARMIN</span>
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path d="M8 1 15 14H1z" fill={c("#0369a1")} />
          </svg>
        </span>
      );
    case "iridium":
      return (
        <span className={cx("inline-flex items-center gap-2", className)}>
          <svg viewBox="0 0 40 24" className="h-6 w-10" aria-hidden="true">
            {[
              [4, 12, 1.4],
              [9, 7, 1.6],
              [9, 17, 1.6],
              [15, 4, 1.8],
              [15, 20, 1.8],
              [21, 9, 1.5],
              [21, 15, 1.5],
              [27, 12, 2],
              [33, 6, 1.4],
              [33, 18, 1.4],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill={c(i % 3 === 0 ? "#f59e0b" : "#fbbf24")} />
            ))}
          </svg>
          <span className="text-[24px] font-semibold tracking-tight" style={{ color: c("#0b1730") }}>iridium</span>
        </span>
      );
    case "inmarsat":
      return (
        <span className={cx("inline-flex items-center gap-1.5", className)}>
          <span className="text-[24px] font-bold tracking-tight" style={{ color: c("#0b1730") }}>inmarsat</span>
          <svg viewBox="0 0 22 22" className="h-5 w-5" aria-hidden="true">
            <path d="M3 18 Q11 2 19 8" fill="none" stroke={c("#0891b2")} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M7 19 Q12 9 18 12" fill="none" stroke={c("#65a30d")} strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </span>
      );
    case "sinclair":
      return (
        <span className={cx("inline-flex items-baseline", className)}>
          <span className="text-[21px] font-black tracking-[0.12em]" style={{ color: c("#0b1730") }}>SINCL</span>
          <span className="text-[21px] font-black tracking-[0.12em]" style={{ color: c("#2170f0") }}>A</span>
          <span className="text-[21px] font-black tracking-[0.12em]" style={{ color: c("#0b1730") }}>IR</span>
        </span>
      );
    case "kenwood":
      return (
        <span className={cx("inline-flex items-center", className)}>
          <span className="text-[22px] font-black tracking-[0.06em]" style={{ color: c("#b91c1c") }}>KENWOOD</span>
        </span>
      );
    default:
      return <span className={cx("text-xl font-black", className)}>{slug}</span>;
  }
}
