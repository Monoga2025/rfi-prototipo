import { cookies } from "next/headers";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, cartItems, products } from "@/db/schema";

export const CART_COOKIE = "rfi_cart_sid";

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

export type CartPayload = {
  items: CartLine[];
  count: number;
  subtotal: number;
};

export async function readSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

export async function getOrCreateSessionId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_COOKIE)?.value;
  if (existing) return existing;
  const sid = crypto.randomUUID();
  store.set(CART_COOKIE, sid, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 120,
  });
  return sid;
}

export async function getCartPayload(sessionId: string | null): Promise<CartPayload> {
  if (!sessionId) return { items: [], count: 0, subtotal: 0 };
  const rows = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      name: products.name,
      slug: products.slug,
      sku: products.sku,
      price: products.price,
      image: products.image,
      brand: brands.name,
      stock: products.stock,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .innerJoin(brands, eq(products.brandId, brands.id))
    .where(eq(cartItems.sessionId, sessionId))
    .orderBy(cartItems.id);

  const items: CartLine[] = rows.map((r) => ({ ...r, price: Number(r.price) }));
  const count = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.quantity * i.price, 0);
  return { items, count, subtotal };
}

export async function addToCart(sessionId: string, productId: number, quantity: number) {
  const [existing] = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.sessionId, sessionId), eq(cartItems.productId, productId)))
    .limit(1);
  if (existing) {
    await db
      .update(cartItems)
      .set({ quantity: existing.quantity + quantity })
      .where(eq(cartItems.id, existing.id));
  } else {
    await db.insert(cartItems).values({ sessionId, productId, quantity });
  }
}

export async function updateCartItem(sessionId: string, itemId: number, quantity: number) {
  if (quantity <= 0) {
    await db.delete(cartItems).where(and(eq(cartItems.id, itemId), eq(cartItems.sessionId, sessionId)));
    return;
  }
  await db
    .update(cartItems)
    .set({ quantity })
    .where(and(eq(cartItems.id, itemId), eq(cartItems.sessionId, sessionId)));
}

export async function removeCartItem(sessionId: string, itemId: number) {
  await db.delete(cartItems).where(and(eq(cartItems.id, itemId), eq(cartItems.sessionId, sessionId)));
}

export async function clearCart(sessionId: string) {
  await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
}
