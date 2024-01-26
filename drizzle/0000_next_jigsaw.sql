DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('new', 'clothing', 'shoes', 'accessories');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_secret" varchar(191),
	"items" json DEFAULT 'null'::json,
	"closed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(191),
	"email" varchar(191) NOT NULL,
	"token" varchar(191) NOT NULL,
	"newsletter" boolean DEFAULT false NOT NULL,
	"marketing" boolean DEFAULT false NOT NULL,
	"transactional" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"items" json DEFAULT 'null'::json,
	"quantity" integer,
	"amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"name" varchar(191),
	"email" varchar(191),
	"address_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"details_submitted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(191) NOT NULL,
	"description" text,
	"images" json DEFAULT 'null'::json,
	"new" "category" NOT NULL,
	"subcategory" varchar(191),
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"inventory" integer DEFAULT 0 NOT NULL,
	"tags" json DEFAULT 'null'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
