DROP TABLE "order_items";--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "items" json DEFAULT 'null'::json;