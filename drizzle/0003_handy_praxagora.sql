DROP TABLE "carts";--> statement-breakpoint
DROP TABLE "email_preferences";--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payment_id" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "ip_address" varchar(15);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "build_version" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "captured" boolean;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "collector_id" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "currency_id" varchar(3);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "date_approved" varchar;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "date_created" varchar;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "date_last_updated" varchar;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "description" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payment_info_id" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "installments" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "issuer_id" varchar(10);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "live_mode" boolean;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "money_release_date" varchar;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "money_release_status" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "operation_type" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "order_id" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "order_type" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payer_email" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payer_id" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payment_method_id" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payment_type_id" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "processing_mode" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "status" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "status_detail" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "transaction_amount" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "transaction_amount_refunded" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "net_received_amount" varchar;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "total_paid_amount" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "quantity";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "amount";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "address_id";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN IF EXISTS "details_submitted";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_info_id_unique" UNIQUE("payment_info_id");