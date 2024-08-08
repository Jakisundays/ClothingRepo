"use server";

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";
import db from "@/db";
import { products, type Product } from "@/db/schema";
// import type { Category } from "@/types";
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  lt,
  lte,
  sql,
} from "drizzle-orm";

import { z } from "zod";

import {
  getProductSchema,
  type getProductsSchema,
} from "@/lib/validations/product";

// See the unstable_cache API docs: https://nextjs.org/docs/app/api-reference/functions/unstable_cache
export async function getFeaturedProducts() {
  try {
    return await cache(
      async () => {
        return db
          .select({
            id: products.id,
            name: products.name,
            images: products.images,
            description: products.description,
            price: products.price,
            inventory: products.inventory,
            createdAt: products.createdAt,
            updatedAt: products.updatedAt,
          })
          .from(products)
          .limit(8)
          .groupBy(products.id);
        // .orderBy(
        //   // desc(sql<number>`count(${products.images})`),
        //   desc(products.createdAt)
        // );
      },
      [],
      { revalidate: 10 }
    )();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export type FeaturedProductsPromise = ReturnType<typeof getFeaturedProducts>;

// See the unstable_noStore API docs: https://nextjs.org/docs/app/api-reference/functions/unstable_noStore
export async function getProducts(input: z.infer<typeof getProductsSchema>) {
  noStore();
  try {
    const [column, order] = (input.sort?.split(".") as [
      keyof Product | undefined,
      "asc" | "desc" | undefined
    ]) ?? ["createdAt", "desc"];
    const [minPrice, maxPrice] = input.price_range?.split("-") ?? [];
    // const categories =
    //   (input.categories?.split(".") as Product["category"][]) ?? [];
    // const subcategories = input.subcategories?.split(".") ?? [];

    const transaction = await db.transaction(async (tx) => {
      const data = await tx
        .select({
          id: products.id,
          name: products.name,
          description: products.description,
          images: products.images,
          // category: products.category,
          // subcategory: products.subcategory,
          price: products.price,
          inventory: products.inventory,
          // tags: products.tags,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
        })
        .from(products)
        .limit(input.limit)
        .offset(input.offset)
        // .where(
        //   and(
        //     categories.length
        //       ? inArray(products.category, categories)
        //       : undefined,
        //     subcategories.length
        //       ? inArray(products.subcategory, subcategories)
        //       : undefined,
        //     minPrice ? gte(products.price, minPrice) : undefined,
        //     maxPrice ? lte(products.price, maxPrice) : undefined
        //   )
        // )
        .groupBy(products.id)
        .orderBy(
          column && column in products
            ? order === "asc"
              ? asc(products[column])
              : desc(products[column])
            : desc(products.createdAt)
        );

      const count = await tx
        .select({
          count: sql<number>`count(*)`,
        })
        .from(products)
        // .where(
        //   and(
        //     categories.length
        //       ? inArray(products.category, categories)
        //       : undefined,
        //     subcategories.length
        //       ? inArray(products.subcategory, subcategories)
        //       : undefined,
        //     minPrice ? gte(products.price, minPrice) : undefined,
        //     maxPrice ? lte(products.price, maxPrice) : undefined,
        //   )
        // )
        .execute()
        .then((res) => res[0]?.count ?? 0);

      const pageCount = Math.ceil(count / input.limit);

      return {
        data,
        pageCount,
      };
    });

    return transaction;
  } catch (err) {
    console.error(err);
    return {
      data: [],
      pageCount: 0,
    };
  }
}

export async function getNextProductId(
  rawInput: z.infer<typeof getProductSchema>
) {
  noStore();
  try {
    const input = getProductSchema.parse(rawInput);

    const product = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      where: and(gt(products.id, input.id)),
      orderBy: asc(products.id),
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product.id;
  } catch (err) {
    console.error(err);
    throw err instanceof Error
      ? err.message
      : err instanceof z.ZodError
      ? err.issues.map((issue) => issue.message).join("\n")
      : new Error("Unknown error.");
  }
}

export async function getPreviousProductId(
  rawInput: z.infer<typeof getProductSchema>
) {
  noStore();
  try {
    const input = getProductSchema.parse(rawInput);

    const product = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      where: and(lt(products.id, input.id)),
      orderBy: desc(products.id),
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product.id;
  } catch (err) {
    console.error(err);
    throw err instanceof Error
      ? err.message
      : err instanceof z.ZodError
      ? err.issues.map((issue) => issue.message).join("\n")
      : new Error("Unknown error.");
  }
}
