import { products } from "@/db/schema";
import * as z from "zod";

export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(0),
  // subcategory: z.string().optional().nullable(),
});

export const checkoutItemSchema = cartItemSchema.extend({
  price: z.number(),
});

export const cartLineItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  images: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
      })
    )
    .optional()
    .nullable(),
  // category: z.enum(products.category.enumValues),
  // subcategory: z.string().optional().nullable(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  inventory: z.number().default(0),
  quantity: z.number(),
});

export const deleteCartItemSchema = z.object({
  productId: z.number(),
});

export const deleteCartItemsSchema = z.object({
  productIds: z.array(z.number()),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().min(0).default(1),
  size: z.string()
});
