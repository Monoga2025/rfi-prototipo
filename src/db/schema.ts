import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  tagline: varchar("tagline", { length: 200 }).notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  country: varchar("country", { length: 80 }).notNull().default(""),
  description: text("description").notNull().default(""),
  accent: varchar("accent", { length: 20 }).notNull().default("#2170f0"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  sku: varchar("sku", { length: 60 }).notNull().unique(),
  name: varchar("name", { length: 220 }).notNull(),
  shortDescription: text("short_description").notNull().default(""),
  description: text("description").notNull().default(""),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  oldPrice: numeric("old_price", { precision: 12, scale: 2 }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  brandId: integer("brand_id")
    .notNull()
    .references(() => brands.id),
  image: text("image").notNull().default(""),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  specs: jsonb("specs").$type<{ label: string; value: string }[]>().notNull().default([]),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  stock: integer("stock").notNull().default(0),
  isNew: boolean("is_new").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  isOpenBox: boolean("is_open_box").notNull().default(false),
  isDeal: boolean("is_deal").notNull().default(false),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("4.5"),
  reviewsCount: integer("reviews_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 80 }).notNull(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 80 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  company: varchar("company", { length: 160 }).notNull().default(""),
  address: text("address").notNull().default(""),
  city: varchar("city", { length: 120 }).notNull().default(""),
  notes: text("notes").notNull().default(""),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull(),
  shipping: numeric("shipping", { precision: 12, scale: 2 }).notNull().default("0"),
  total: numeric("total", { precision: 12, scale: 2 }).notNull(),
  status: varchar("status", { length: 40 }).notNull().default("recibido"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  productName: varchar("product_name", { length: 220 }).notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  company: varchar("company", { length: 160 }).notNull().default(""),
  sector: varchar("sector", { length: 120 }).notNull().default(""),
  interest: varchar("interest", { length: 160 }).notNull().default(""),
  message: text("message").notNull().default(""),
  productSlug: varchar("product_slug", { length: 160 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  subject: varchar("subject", { length: 200 }).notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Brand = typeof brands.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
