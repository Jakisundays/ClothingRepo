import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, desc, eq, not } from "drizzle-orm";

import { formatPrice, toTitleCase } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// import { ProductCard } from "@/components/product-card"
import { ProductImageCarousel } from "@/components/product-image-carousel";

import { AddToCartForm } from "./_components/add-to-cart-form";
// import { UpdateProductRatingButton } from "./_components/update-product-rating-button"
import { Shell } from "@/components/shells/shell";
import db from "@/db";
import { Product, products } from "@/db/schema";
import { ProductInventory } from "@/types";

interface ProductPageProps {
  params: {
    product_id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await db.query.products.findFirst({
    columns: {
      name: true,
      description: true,
    },
    where: eq(products.id, Number(params.product_id)),
  });

  if (!product) {
    return {};
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: toTitleCase(product.name),
    description: product.description,
  };
}

export default async function ProductPage({
  params: { product_id },
}: ProductPageProps) {
  //   const productId = decodeURIComponent(params.productId)

  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      inventory: true,
      // rating: true,
      // storeId: true,
    },
    where: eq(products.id, Number(product_id)),
  });

  if (!product) {
    notFound();
  }

  //   const otherProducts = store
  //     ? await db
  //         .select({
  //           id: products.id,
  //           name: products.name,
  //           price: products.price,
  //           images: products.images,
  //           category: categories.name,
  //           inventory: products.inventory,
  //           rating: products.rating,
  //         })
  //         .from(products)
  //         .leftJoin(categories, eq(products.categoryId, categories.id))
  //         .limit(4)
  //         .where(
  //           and(
  //             eq(products.storeId, product.storeId),
  //             not(eq(products.id, productId))
  //           )
  //         )
  //         .orderBy(desc(products.inventory))
  //     : []

  // const product = {
  //   id: "STREET2024",
  //   name: "Unisex Streetwear Bomber Jacket",
  //   description:
  //     "Elevate your street style with this unisex bomber jacket. Featuring a sleek design, durable zippers, ribbed cuffs, and a bold graphic print on the back.",
  //   price: 149.99,
  //   images: [
  //     {
  //       id: "1",
  //       name: "Jacket",
  //       url: "https://i.pinimg.com/564x/1c/79/64/1c7964c71fce11fd48942cc3b08663f1.jpg",
  //     },
  //     {
  //       id: "2",
  //       name: "Jacket",
  //       url: "https://i.pinimg.com/564x/fe/d0/e3/fed0e38c6a887f56cdf7f0f2ef182927.jpg",
  //     },
  //   ],
  //   inventory: 100,
  // };

  function getTotalStock(inventory: ProductInventory[] | null): number {
    if (!inventory) {
      return 0;
    }
    let totalStock = 0;
    inventory.forEach((item) => {
      totalStock += item.quantity;
    });
    return totalStock;
  }

  return (
    <Shell className="pb-12 md:pb-14">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>
            <p className="text-base text-muted-foreground">
              {formatPrice(product.price)}
            </p>
          </div>
          <Separator className="my-1.5" />
          <p className="text-base text-muted-foreground">
            {getTotalStock(product.inventory)} in stock
          </p>
          <AddToCartForm product={product as Product} showBuyNow={true} />
          <Separator className="mt-5" />
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="description"
          >
            <AccordionItem value="description" className="border-none">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="md:hidden" />
        </div>
      </div>
    </Shell>
  );
}
