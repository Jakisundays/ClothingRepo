import db from "@/db"; // Import your database instance or client
import { products } from "@/db/schema"; // Import the product schema
import { ProductInventory } from "@/types";
import { eq } from "drizzle-orm";

// Function to update product inventory
const updateProductInventory = async (
  productId: number,
  updatedInventory: ProductInventory[]
) => {
  try {
    // Update the product inventory in the database
    await db
      .update(products)
      .set({ inventory: updatedInventory })
      .where(eq(products.id, productId)); // Using equals for equality check

    console.log(`Inventory updated for product ID: ${productId}`);
  } catch (error) {
    console.error(
      `Failed to update inventory for product ID: ${productId}`,
      error
    );
    throw error; // Re-throw error to be handled by the caller
  }
};

export default updateProductInventory;
