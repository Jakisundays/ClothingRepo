ALTER TABLE "products" ALTER COLUMN "inventory" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "inventory" SET DEFAULT 'null'::json;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "inventory" DROP NOT NULL;