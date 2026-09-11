import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink pt-[78px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(33,112,240,0.35),transparent_60%)]" />
      <div className="absolute inset-0 grid-lines" />
      <Container className="relative text-center">
        <p className="eyebrow text-brand-300">Error 404 · Sin señal</p>
        <h1 className="mt-4 text-6xl font-extrabold tracking-tight sm:text-8xl">404</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">La página que buscas está fuera de cobertura. Volvamos a un punto con señal.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-arrow inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">
            Ir al inicio <Icon name="arrow-right" size={16} />
          </Link>
          <Link href="/tienda" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-navy">
            Ver la tienda
          </Link>
        </div>
      </Container>
    </section>
  );
}
