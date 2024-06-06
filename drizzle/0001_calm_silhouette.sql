ALTER TABLE "carts" DROP COLUMN IF EXISTS "client_secret";--> statement-breakpoint
ALTER TABLE "email_preferences" DROP COLUMN IF EXISTS "token";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "new";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "subcategory";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "tags";