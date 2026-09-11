import { Hero } from "@/components/home/Hero";
import { Solutions } from "@/components/home/Solutions";
import { Brands } from "@/components/home/Brands";
import { Featured } from "@/components/home/Featured";
import { Projects } from "@/components/home/Projects";
import { Services } from "@/components/home/Services";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getBrands, getCategories, getProductBySlug } from "@/lib/data";

export default async function HomePage() {
  const [categories, brands, r7] = await Promise.all([getCategories(), getBrands(), getProductBySlug("motorola-r7")]);

  return (
    <>
      <Hero />
      <Solutions categories={categories} />
      <Brands brands={brands} />
      <Featured product={r7 ? { id: r7.id, slug: r7.slug, name: r7.name, stock: r7.stock } : null} />
      <Projects />
      <Services />
      <CtaBanner />
    </>
  );
}
