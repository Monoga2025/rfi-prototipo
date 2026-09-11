import { seedBrands, seedCategories, seedProducts } from "@/db/seed-data";

export type Category = (typeof seedCategories)[number] & { id: number };
export type Brand = (typeof seedBrands)[number] & { id: number };
type SeedProduct = (typeof seedProducts)[number];

export type ProductFull = Omit<SeedProduct, "category" | "brand"> & {
  id: number;
  categoryId: number;
  brandId: number;
  category: Category;
  brand: Brand;
};

export type ProductQuery = {
  q?: string;
  cat?: string;
  brand?: string[];
  sort?: string;
  nuevo?: boolean;
  caja?: boolean;
  stock?: boolean;
  oferta?: boolean;
  min?: number;
  max?: number;
  page?: number;
  perPage?: number;
};

const categories: Category[] = seedCategories.map((category, index) => ({ ...category, id: index + 1 }));
const brands: Brand[] = seedBrands.map((brand, index) => ({ ...brand, id: index + 1 }));

export const staticProducts: ProductFull[] = seedProducts.map((product, index) => {
  const category = categories.find((item) => item.slug === product.category)!;
  const brand = brands.find((item) => item.slug === product.brand)!;
  return { ...product, id: index + 1, categoryId: category.id, brandId: brand.id, category, brand };
});

export async function ensureSeeded() {
  // Static exports use the seed dataset directly and never connect to PostgreSQL.
}

export async function getCategories() {
  return categories;
}

export async function getBrands() {
  return brands;
}

export async function getCategoryCounts() {
  return Object.fromEntries(categories.map((category) => [category.slug, staticProducts.filter((product) => product.categoryId === category.id).length]));
}

export async function getBrandCounts() {
  return Object.fromEntries(brands.map((brand) => [brand.slug, staticProducts.filter((product) => product.brandId === brand.id).length]));
}

function matches(product: ProductFull, params: ProductQuery) {
  const term = params.q?.trim().toLowerCase();
  if (term && ![product.name, product.sku, product.shortDescription, product.brand.name, product.category.name].some((value) => value.toLowerCase().includes(term))) return false;
  if (params.cat && product.category.slug !== params.cat) return false;
  if (params.brand?.length && !params.brand.includes(product.brand.slug)) return false;
  if (params.nuevo && !product.isNew) return false;
  if (params.caja && !product.isOpenBox) return false;
  if (params.oferta && !product.isDeal) return false;
  if (params.stock && product.stock <= 0) return false;
  if (params.min !== undefined && Number(product.price) < params.min) return false;
  return !(params.max !== undefined && Number(product.price) > params.max);
}

function sortProducts(items: ProductFull[], sort?: string) {
  return [...items].sort((a, b) => {
    switch (sort) {
      case "precio-asc": return Number(a.price) - Number(b.price);
      case "precio-desc": return Number(b.price) - Number(a.price);
      case "nombre": return a.name.localeCompare(b.name);
      case "nuevos": return Number(b.isNew) - Number(a.isNew) || b.id - a.id;
      case "valorados": return Number(b.rating) - Number(a.rating) || b.reviewsCount - a.reviewsCount;
      default: return Number(b.isFeatured) - Number(a.isFeatured) || Number(b.isNew) - Number(a.isNew) || b.reviewsCount - a.reviewsCount || a.id - b.id;
    }
  });
}

export async function queryProducts(params: ProductQuery) {
  const perPage = params.perPage ?? 12;
  const page = Math.max(1, params.page ?? 1);
  const filtered = sortProducts(staticProducts.filter((product) => matches(product, params)), params.sort);
  return { items: filtered.slice((page - 1) * perPage, page * perPage), total: filtered.length, page, perPage, pages: Math.max(1, Math.ceil(filtered.length / perPage)) };
}

export async function getProductBySlug(slug: string) {
  return staticProducts.find((product) => product.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 4) {
  return sortProducts(staticProducts.filter((product) => product.isFeatured), undefined).slice(0, limit);
}

export async function getRelatedProducts(product: ProductFull, limit = 4) {
  return sortProducts(staticProducts.filter((item) => item.categoryId === product.categoryId && item.id !== product.id), undefined).slice(0, limit);
}

export async function searchProductsQuick(q: string, limit = 6) {
  return staticProducts.filter((product) => matches(product, { q })).slice(0, limit);
}

export async function getPriceBounds() {
  const prices = staticProducts.map((product) => Number(product.price));
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
