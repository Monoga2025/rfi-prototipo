"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { AddToCartButton } from "./AddToCartButton";
import { formatCOP } from "@/lib/format";

export function BuyBox({ productId, slug, name, stock, price }: { productId: number; slug: string; name: string; stock: number; price: number }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="rounded-2xl border border-navy/8 bg-mist/60 p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex h-12 items-center rounded-full border border-navy/12 bg-white">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center text-navy hover:text-brand" aria-label="Disminuir">
            <Icon name="minus" size={16} />
          </button>
          <span className="w-8 text-center text-sm font-extrabold text-navy">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(Math.max(1, stock), q + 1))} className="grid h-12 w-12 place-items-center text-navy hover:text-brand" aria-label="Aumentar">
            <Icon name="plus" size={16} />
          </button>
        </div>
        <AddToCartButton productId={productId} name={name} stock={stock} quantity={qty} className="h-12 flex-1 px-6" />
      </div>
      <p className="mt-3 text-xs text-navy/55">
        Total: <span className="font-bold text-navy">{formatCOP(price * qty)}</span> · IVA incluido
      </p>
      <Link
        href={`/cotizacion?producto=${slug}`}
        className="btn-arrow mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white"
      >
        <Icon name="file-text" size={16} /> Solicitar cotización por volumen <Icon name="arrow-right" size={15} />
      </Link>
    </div>
  );
}
