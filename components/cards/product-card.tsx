"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/db/schema";
import { CheckIcon, EyeOpenIcon, PlusIcon } from "@radix-ui/react-icons";

import { addToCart } from "@/lib/actions/cart";
import { catchError, cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { PlaceholderImage } from "@/components/placeholder-image";
import { useToast } from "../ui/use-toast";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Pick<
    Product,
    "id" | "name" | "price" | "images" | "inventory" | "description"
  >;
  variant?: "default" | "switchable";
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isAddingToCart, startAddingToCart] = React.useTransition();
  const { toast } = useToast();

  return (
    <Card
      className={cn("size-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link aria-label={product.name} href={`/product/${product.id}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product.images?.length ? (
              <Image
                src={
                  product.images[0]?.url ?? "/images/product-placeholder.webp"
                }
                alt={product.images[0]?.name ?? product.name}
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                loading="lazy"
              />
            ) : (
              <PlaceholderImage className="rounded-none" asChild />
            )}
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{product.name}</span>
      </Link>
      <Link href={`/product/${product.id}`} tabIndex={-1}>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {product.price}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        {variant === "default" ? (
          <div className="flex w-full items-center space-x-2">
            <Button
              aria-label="Añadir al carrito"
              size="sm"
              className="h-8 w-full rounded-sm"
              onClick={() => {
                startAddingToCart(async () => {
                  try {
                    await addToCart({
                      productId: product.id,
                      quantity: 1,
                    });
                    toast({ title: "Added to cart." });
                  } catch (err) {
                    catchError(err, toast);
                  }
                });
              }}
              disabled={isAddingToCart}
            >
              {isAddingToCart && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Añadir al carrito
            </Button>
            <Link
              href={`/preview/product/${product.id}`}
              title="Preview"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "icon",
                  className: "h-8 w-8 shrink-0",
                })
              )}
            >
              <EyeOpenIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">Preview</span>
            </Link>
          </div>
        ) : (
          <Button
            aria-label={
              isAddedToCart ? "Quitar del carrito" : "Añadir al carrito"
            }
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => {
              startAddingToCart(async () => {
                await onSwitch?.();
              });
            }}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <CheckIcon className="mr-2 size-4" aria-hidden="true" />
            ) : (
              <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            )}
            {isAddedToCart ? "Añadidido" : "Añadir al carrito"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
