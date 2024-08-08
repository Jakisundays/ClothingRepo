import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { formatCurrencyAR, toTitleCase } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { AddToCartForm } from "./_components/add-to-cart-form";
import { Shell } from "@/components/shells/shell";
import db from "@/db";
import { Product, products } from "@/db/schema";
import { ProductInventory } from "@/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
    metadataBase: new URL(
      `https://alterego4k.com.ar/product/${params.product_id}`
    ),
    title: toTitleCase(product.name),
    description: product.description,
  };
}

export default async function ProductPage({
  params: { product_id },
}: ProductPageProps) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      inventory: true,
      sizeGuide: true,
    },
    where: eq(products.id, Number(product_id)),
  });

  if (!product) {
    notFound();
  }

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
            <h2 className="line-clamp-1 text-2xl font-bold font-unna">
              {product.name}{" "}
              {getTotalStock(product.inventory) === 0 && (
                <Badge variant="destructive" className="font-inter ml-5">
                  Agotado
                </Badge>
              )}
            </h2>
            <p className="text-base text-muted-foreground">
              {formatCurrencyAR(Number(product.price))}
            </p>
          </div>
          <Separator className="my-1.5" />
          {/* <p className="text-base text-muted-foreground">
            {getTotalStock(product.inventory)} en stock
          </p> */}
          <AddToCartForm
            product={product as Product}
            showBuyNow={true}
            soldOut={getTotalStock(product.inventory) === 0}
          />
          <Separator className="mt-5" />
          <Accordion
            type="single"
            collapsible
            className="w-full"
            // defaultValue="Descripción"
          >
            <AccordionItem value="Descripción" className="border-none">
              <AccordionTrigger>Descripción</AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  "No hay descripción disponible para este producto."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="GuiaDeTalles" className="border-none">
              <AccordionTrigger>Guía de talles</AccordionTrigger>
              <AccordionContent>
                <Image
                  src={product.sizeGuide!}
                  alt={`Guía de talles para ${product.name}`}
                  width={500}
                  height={325}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="md:hidden" />
        </div>
      </div>
    </Shell>
  );
}
