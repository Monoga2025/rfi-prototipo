export function formatCOP(value: number | string): string {
  const n = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);
}

export function discountPercent(price: number | string, oldPrice?: number | string | null): number | null {
  if (!oldPrice) return null;
  const p = Number(price);
  const o = Number(oldPrice);
  if (!o || o <= p) return null;
  return Math.round(((o - p) / o) * 100);
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
