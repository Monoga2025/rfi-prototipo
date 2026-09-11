"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { staticProducts } from "@/lib/data";

export type CartLine = {
  id: number;
  productId: number;
  quantity: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  image: string;
  brand: string;
  stock: number;
};

export type CartPayload = { items: CartLine[]; count: number; subtotal: number };
export type Toast = { id: number; title: string; description?: string; tone?: "success" | "info" | "error" };

type CartContextValue = {
  cart: CartPayload;
  loading: boolean;
  busyId: number | null;
  add: (productId: number, quantity?: number, meta?: { name?: string }) => Promise<void>;
  update: (itemId: number, quantity: number) => Promise<void>;
  remove: (itemId: number) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  toasts: Toast[];
  notify: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const EMPTY: CartPayload = { items: [], count: 0, subtotal: 0 };
const STORAGE_KEY = "rfi-static-cart";

function recompute(items: CartLine[]): CartPayload {
  return { items, count: items.reduce((total, item) => total + item.quantity, 0), subtotal: items.reduce((total, item) => total + item.quantity * item.price, 0) };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartPayload>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const persist = useCallback((next: CartPayload) => {
    setCart(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.items));
  }, []);

  const refresh = useCallback(async () => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const items = saved ? (JSON.parse(saved) as CartLine[]) : [];
      setCart(recompute(items));
    } catch {
      setCart(EMPTY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const notify = useCallback((toast: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3800);
  }, []);
  const dismiss = useCallback((id: number) => setToasts((current) => current.filter((item) => item.id !== id)), []);

  const add = useCallback(async (productId: number, quantity = 1, meta?: { name?: string }) => {
    const product = staticProducts.find((item) => item.id === productId);
    if (!product) return;
    setBusyId(productId);
    setCart((current) => {
      const existing = current.items.find((item) => item.productId === productId);
      const items = existing
        ? current.items.map((item) => item.productId === productId ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) } : item)
        : [...current.items, { id: productId, productId, quantity: Math.min(product.stock, quantity), name: product.name, slug: product.slug, sku: product.sku, price: Number(product.price), image: product.image, brand: product.brand.name, stock: product.stock }];
      const next = recompute(items);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.items));
      return next;
    });
    notify({ title: "Agregado al carrito", description: meta?.name ?? product.name, tone: "success" });
    setDrawerOpen(true);
    setBusyId(null);
  }, [notify]);

  const update = useCallback(async (itemId: number, quantity: number) => {
    setCart((current) => {
      const next = recompute(current.items.map((item) => item.id === itemId ? { ...item, quantity } : item).filter((item) => item.quantity > 0));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.items));
      return next;
    });
  }, []);
  const remove = useCallback(async (itemId: number) => update(itemId, 0), [update]);
  const clear = useCallback(async () => persist(EMPTY), [persist]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const value = useMemo<CartContextValue>(() => ({ cart, loading, busyId, add, update, remove, clear, refresh, drawerOpen, setDrawerOpen, toasts, notify, dismiss }), [cart, loading, busyId, add, update, remove, clear, refresh, drawerOpen, toasts, notify, dismiss]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
