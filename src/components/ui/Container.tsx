import type { ReactNode } from "react";
import { cx } from "@/lib/format";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[1280px] px-5 lg:px-8", className)}>{children}</div>;
}
