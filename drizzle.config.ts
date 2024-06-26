import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";
import { env } from "./env.mjs";

// export default defineConfig({
//   schema: "./db/schema.ts",
//   driver: "pg",
//   out: "./drizzle",
  // dbCredentials: {
  //   connectionString: env.POSTGRES_URL!,
  // },
//   verbose: true,
//   strict: true,
// }) satisfies Config;

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: env.POSTGRES_URL!,
  },
}) satisfies Config;