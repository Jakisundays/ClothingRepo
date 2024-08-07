import { eq } from "drizzle-orm";
import db from "@/db";
import { products } from "./schema";

export const getProductById = async (id: number) => {
  const product = await db
    .select({ inventory: products.inventory })
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return product[0] || null;
};
