import type { CartItem, ProductInventory } from "@/types";
import type { CheckoutItem, StoredFile } from "@/types";

import {
  pgTable,
  decimal,
  integer,
  json,
  serial,
  text,
  timestamp,
  varchar,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";


export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  inventory: json("inventory").$type<ProductInventory[] | null>().default(null),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: integer("quantity"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressId: integer("address_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export const emailPreferences = pgTable("email_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  // token: varchar("token", { length: 191 }).notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type EmailPreference = typeof emailPreferences.$inferSelect;
export type NewEmailPreference = typeof emailPreferences.$inferInsert;

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  // clientSecret: varchar("client_secret", { length: 191 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  detailsSubmitted: boolean("details_submitted").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
