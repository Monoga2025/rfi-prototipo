"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SECTORS } from "@/lib/site";
import { cx } from "@/lib/format";

const inputCls =
  "h-12 w-full rounded-xl border border-navy/12 bg-white px-4 text-sm text-navy outline-none transition placeholder:text-navy/35 focus:border-brand focus:ring-4 focus:ring-brand/15";

export function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cx("block", className)}>
      <span className="mb-1.5 block text-xs font-bold text-navy/70">{label}</span>
      {children}
    </label>
  );
}

function SuccessBox({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8 text-center animate-pop">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_10px_30px_-8px_rgba(16,185,129,.7)]">
        <Icon name="check" size={30} strokeWidth={3} />
      </div>
      <h3 className="mt-4 text-xl font-extrabold text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-navy/65">{text}</p>
      <button onClick={onReset} className="mt-5 text-sm font-semibold text-brand hover:underline">
        Enviar otra solicitud
      </button>
    </div>
  );
}

export function QuoteForm({ productSlug, productName }: { productSlug?: string; productName?: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    sector: "",
    interest: productName ?? "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productSlug }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <SuccessBox
        title="¡Solicitud recibida!"
        text="Un ingeniero comercial revisará tu requerimiento y te enviará una propuesta en menos de 24 horas hábiles."
        onReset={() => {
          setStatus("idle");
          setForm({ name: "", email: "", phone: "", company: "", sector: "", interest: "", message: "" });
        }}
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {productName && (
        <div className="flex items-center gap-3 rounded-2xl border border-brand/20 bg-brand-50 px-4 py-3 text-sm">
          <Icon name="tag" size={16} className="text-brand" />
          <span className="text-navy/80">
            Cotizando: <span className="font-bold text-navy">{productName}</span>
          </span>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre completo *">
          <input required value={form.name} onChange={set("name")} className={inputCls} placeholder="Tu nombre" />
        </Field>
        <Field label="Correo corporativo *">
          <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="nombre@empresa.com" />
        </Field>
        <Field label="Teléfono / WhatsApp">
          <input value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+57 300 000 0000" />
        </Field>
        <Field label="Empresa">
          <input value={form.company} onChange={set("company")} className={inputCls} placeholder="Nombre de la empresa" />
        </Field>
        <Field label="Sector">
          <div className="relative">
            <select value={form.sector} onChange={set("sector")} className={cx(inputCls, "appearance-none pr-9")}>
              <option value="">Selecciona…</option>
              {SECTORS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <Icon name="chevron-down" size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/50" />
          </div>
        </Field>
        <Field label="¿Qué necesitas?">
          <input value={form.interest} onChange={set("interest")} className={inputCls} placeholder="Ej. 40 radios DMR + repetidora" />
        </Field>
      </div>
      <Field label="Cuéntanos sobre tu operación">
        <textarea
          rows={4}
          value={form.message}
          onChange={set("message")}
          className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-navy/35 focus:border-brand focus:ring-4 focus:ring-brand/15"
          placeholder="Zona geográfica, número de usuarios, cobertura requerida, plazos…"
        />
      </Field>
      {status === "error" && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">No pudimos enviar la solicitud. Inténtalo de nuevo.</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-arrow shine inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? <Icon name="loader" size={16} className="animate-spin" /> : <Icon name="send" size={16} />}
        Enviar solicitud de cotización
      </button>
    </form>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <SuccessBox
        title="¡Mensaje enviado!"
        text="Gracias por escribirnos. Te responderemos en el transcurso del día hábil."
        onReset={() => {
          setStatus("idle");
          setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        }}
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre *">
          <input required value={form.name} onChange={set("name")} className={inputCls} placeholder="Tu nombre" />
        </Field>
        <Field label="Correo *">
          <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="nombre@empresa.com" />
        </Field>
        <Field label="Teléfono">
          <input value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+57 300 000 0000" />
        </Field>
        <Field label="Asunto">
          <input value={form.subject} onChange={set("subject")} className={inputCls} placeholder="¿En qué te ayudamos?" />
        </Field>
      </div>
      <Field label="Mensaje *">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-navy/35 focus:border-brand focus:ring-4 focus:ring-brand/15"
          placeholder="Escribe tu mensaje…"
        />
      </Field>
      {status === "error" && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">No pudimos enviar el mensaje. Inténtalo de nuevo.</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-arrow shine inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600 disabled:opacity-60"
      >
        {status === "sending" ? <Icon name="loader" size={16} className="animate-spin" /> : <Icon name="send" size={16} />}
        Enviar mensaje
      </button>
    </form>
  );
}
