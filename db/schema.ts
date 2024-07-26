import type { ProductInventory } from "@/types";
import type { CheckoutItem, StoredFile } from "@/types";
import { relations } from "drizzle-orm";

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
  numeric,
  jsonb,
  bigint,
} from "drizzle-orm/pg-core";
import { Items } from "mercadopago/dist/clients/commonTypes";

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

export const productsRelations = relations(products, ({ many }) => ({
  orders: many(orders),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  items: json("items").$type<Items[] | null>().default(null),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  payment: one(payments, {
    fields: [orders.id],
    references: [payments.order_id],
  }),
}));

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  payment_id: varchar("payment_id"),
  ip_address: varchar("ip_address", { length: 15 }),
  build_version: varchar("build_version", { length: 50 }),
  captured: boolean("captured"),
  collector_id: integer("collector_id"),
  currency_id: varchar("currency_id", { length: 3 }),
  date_approved: varchar("date_approved"),
  date_created: varchar("date_created"),
  date_last_updated: varchar("date_last_updated"),
  description: varchar("description", { length: 255 }),
  payment_info_id: varchar("payment_info_id").unique(),
  installments: integer("installments"),
  issuer_id: varchar("issuer_id", { length: 10 }),
  live_mode: boolean("live_mode"),
  metadata: jsonb("metadata"),
  money_release_date: varchar("money_release_date"),
  money_release_status: varchar("money_release_status", { length: 50 }),
  operation_type: varchar("operation_type", { length: 50 }),
  order_id: integer("order_id").references(() => orders.id), // Foreign key to orders table
  order_type: varchar("order_type", { length: 50 }),
  payer_email: varchar("payer_email", { length: 255 }),
  payer_id: varchar("payer_id", { length: 50 }),
  payment_method_id: varchar("payment_method_id", { length: 50 }),
  payment_type_id: varchar("payment_type_id", { length: 50 }),
  processing_mode: varchar("processing_mode", { length: 50 }),
  status: varchar("status", { length: 50 }),
  status_detail: varchar("status_detail", { length: 50 }),
  transaction_amount: integer("transaction_amount"),
  transaction_amount_refunded: integer("transaction_amount_refunded"),
  net_received_amount: varchar("net_received_amount"),
  total_paid_amount: varchar("total_paid_amount"),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.order_id],
    references: [orders.id],
  }),
}));

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
