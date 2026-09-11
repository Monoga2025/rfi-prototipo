"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { cx, formatCOP } from "@/lib/format";

const SHIPPING = [
  { id: "bogota", label: "Envío en Bogotá", desc: "Entrega en 24 horas hábiles", price: 18000 },
  { id: "nacional", label: "Envío nacional", desc: "2 a 3 días hábiles, asegurado", price: 35000 },
  { id: "recoger", label: "Recoger en tienda", desc: "Calle 100 # 19-54, Bogotá", price: 0 },
];

type Success = { orderId: number; total: number; items: { name: string; quantity: number }[] };

export default function CheckoutPage() {
  const { cart, loading, refresh } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", city: "Bogotá", address: "", notes: "", shipping: "bogota" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);

  const shipping = SHIPPING.find((s) => s.id === form.shipping)?.price ?? 0;
  const total = cart.subtotal + shipping;
  const field = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value })),
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = (await res.json()) as { error?: string; orderId?: number; total?: number; items?: { name: string; quantity: number }[] };
      if (!res.ok) throw new Error(data.error ?? "No pudimos procesar tu pedido");
      setSuccess({ orderId: data.orderId!, total: data.total!, items: data.items ?? [] });
      await refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <>
        <PageHero compact eyebrow="Pedido confirmado" title={<>¡Gracias, {form.name.split(" ")[0]}!</>} breadcrumb={[{ href: "/tienda", label: "Tienda" }, { label: "Pedido" }]} />
        <section className="bg-mist py-14">
          <Container>
            <div className="mx-auto max-w-2xl rounded-3xl border border-navy/8 bg-white p-8 shadow-soft animate-pop">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Icon name="check" size={36} strokeWidth={3} />
              </div>
              <h2 className="mt-5 text-center text-2xl font-extrabold text-navy">Pedido #{String(success.orderId).padStart(5, "0")} recibido</h2>
              <p className="mt-2 text-center text-sm text-navy/60">
                Enviamos la confirmación a <span className="font-semibold text-navy">{form.email}</span>. Un asesor te contactará para coordinar el pago y la entrega.
              </p>
              <ul className="mt-6 divide-y divide-navy/8 rounded-2xl border border-navy/8">
                {success.items.map((i) => (
                  <li key={i.name} className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-navy/80">{i.name}</span>
                    <span className="font-semibold text-navy">× {i.quantity}</span>
                  </li>
                ))}
                <li className="flex justify-between bg-mist/60 px-4 py-3 text-sm font-extrabold text-navy">
                  <span>Total</span>
                  <span>{formatCOP(success.total)}</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/tienda" className="rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy hover:border-navy">
                  Seguir comprando
                </Link>
                <Link href="/" className="btn-arrow inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
                  Volver al inicio <Icon name="arrow-right" size={15} />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero compact eyebrow="Último paso" title="Finalizar compra" breadcrumb={[{ href: "/tienda", label: "Tienda" }, { href: "/carrito", label: "Carrito" }, { label: "Checkout" }]} />
      <section className="bg-mist py-10 lg:py-14">
        <Container>
          {!loading && cart.items.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-3xl border border-navy/8 bg-white p-12 text-center">
              <h2 className="text-xl font-extrabold text-navy">No hay productos en tu carrito</h2>
              <Link href="/tienda" className="mt-5 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">
                Ir a la tienda
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_400px]">
              <div className="space-y-6">
                <Card title="1. Datos de contacto" icon="user">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Nombre completo *" required {...field("name")} placeholder="Ana Martínez" />
                    <Input label="Correo electrónico *" type="email" required {...field("email")} placeholder="ana@empresa.com" />
                    <Input label="Teléfono / WhatsApp" {...field("phone")} placeholder="+57 300 123 4567" />
                    <Input label="Empresa (opcional)" {...field("company")} placeholder="Nombre de la empresa" />
                  </div>
                </Card>
                <Card title="2. Entrega" icon="truck">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {SHIPPING.map((s) => (
                      <label
                        key={s.id}
                        className={cx(
                          "cursor-pointer rounded-2xl border p-4 transition",
                          form.shipping === s.id ? "border-brand bg-brand-50 shadow-[0_0_0_4px_rgba(33,112,240,0.12)]" : "border-navy/10 hover:border-navy/30",
                        )}
                      >
                        <input type="radio" name="shipping" value={s.id} checked={form.shipping === s.id} onChange={() => setForm((f) => ({ ...f, shipping: s.id }))} className="sr-only" />
                        <p className="text-sm font-bold text-navy">{s.label}</p>
                        <p className="mt-0.5 text-xs text-navy/60">{s.desc}</p>
                        <p className="mt-2 text-sm font-extrabold text-brand">{s.price === 0 ? "Gratis" : formatCOP(s.price)}</p>
                      </label>
                    ))}
                  </div>
                  {form.shipping !== "recoger" && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_2fr]">
                      <Input label="Ciudad *" required {...field("city")} />
                      <Input label="Dirección de entrega *" required {...field("address")} placeholder="Calle 00 # 00-00, oficina / bodega" />
                    </div>
                  )}
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-xs font-bold text-navy/70">Notas para el pedido</span>
                    <textarea {...field("notes")} rows={3} placeholder="Horarios de recepción, frecuencias a programar, referencia de orden de compra…" className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15" />
                  </label>
                </Card>
                <Card title="3. Pago" icon="credit-card">
                  <p className="text-sm text-navy/70">
                    Al confirmar, generamos tu pedido y un asesor te enviará el enlace de pago seguro (PSE, tarjeta de crédito o transferencia) junto con la factura electrónica. Para empresas aceptamos órdenes de compra.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["PSE", "Visa", "Mastercard", "Transferencia", "Orden de compra"].map((m) => (
                      <span key={m} className="rounded-full border border-navy/10 bg-mist px-3 py-1 text-xs font-semibold text-navy/70">
                        {m}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>

              <aside className="h-fit lg:sticky lg:top-[110px]">
                <div className="rounded-3xl border border-navy/8 bg-white p-6 shadow-soft">
                  <h2 className="text-lg font-extrabold text-navy">Tu pedido</h2>
                  <ul className="mt-4 max-h-[300px] space-y-3 overflow-y-auto pr-1">
                    {cart.items.map((i) => (
                      <li key={i.id} className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={i.image} alt="" className="h-12 w-12 rounded-lg border border-navy/8 object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-navy">{i.name}</p>
                          <p className="text-xs text-navy/50">× {i.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-navy">{formatCOP(i.price * i.quantity)}</p>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-5 space-y-2 border-t border-navy/8 pt-4 text-sm">
                    <div className="flex justify-between text-navy/70"><dt>Subtotal</dt><dd className="font-semibold text-navy">{formatCOP(cart.subtotal)}</dd></div>
                    <div className="flex justify-between text-navy/70"><dt>Envío</dt><dd className="font-semibold text-navy">{shipping === 0 ? "Gratis" : formatCOP(shipping)}</dd></div>
                    <div className="flex justify-between border-t border-navy/8 pt-3"><dt className="font-bold text-navy">Total</dt><dd className="text-2xl font-extrabold text-navy">{formatCOP(total)}</dd></div>
                  </dl>
                  {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting || loading}
                    className="btn-arrow shine mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600 disabled:opacity-60"
                  >
                    {submitting ? <Icon name="loader" size={16} className="animate-spin" /> : <Icon name="lock" size={16} />}
                    Confirmar pedido
                  </button>
                  <p className="mt-3 text-center text-[11px] text-navy/50">Al confirmar aceptas nuestros términos y política de datos.</p>
                </div>
              </aside>
            </form>
          )}
        </Container>
      </section>
    </>
  );
}

function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-navy/8 bg-white p-6 shadow-soft">
      <h2 className="flex items-center gap-2 text-base font-extrabold text-navy">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand"><Icon name={icon} size={16} /></span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-navy/70">{label}</span>
      <input {...props} className="h-12 w-full rounded-xl border border-navy/12 bg-white px-4 text-sm text-navy outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15" />
    </label>
  );
}
