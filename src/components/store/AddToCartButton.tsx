"use client";

import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/format";

type Props = {
  productId: number;
  name: string;
  stock: number;
  quantity?: number;
  variant?: "primary" | "outline" | "dark" | "icon";
  className?: string;
  label?: string;
};

export function AddToCartButton({ productId, name, stock, quantity = 1, variant = "primary", className, label }: Props) {
  const { add, busyId } = useCart();
  const busy = busyId === productId;
  const disabled = stock <= 0;

  const base = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";
  const styles = {
    primary: "rounded-full bg-brand px-5 py-3 text-sm text-white shadow-glow hover:bg-brand-600 hover:-translate-y-0.5",
    outline: "rounded-full border border-navy/15 bg-white px-5 py-3 text-sm text-navy hover:border-navy hover:bg-navy hover:text-white",
    dark: "rounded-full bg-navy px-5 py-3 text-sm text-white hover:bg-brand",
    icon: "h-10 w-10 rounded-full bg-navy text-white hover:bg-brand hover:scale-105",
  }[variant];

  return (
    <button
      onClick={() => add(productId, quantity, { name })}
      disabled={disabled || busy}
      className={cx(base, styles, className)}
      aria-label={label ?? "Agregar al carrito"}
    >
      {busy ? (
        <Icon name="loader" size={16} className="animate-spin" />
      ) : (
        <Icon name="cart" size={variant === "icon" ? 17 : 16} />
      )}
      {variant !== "icon" && <span>{disabled ? "Agotado" : (label ?? "Agregar al carrito")}</span>}
    </button>
  );
}
