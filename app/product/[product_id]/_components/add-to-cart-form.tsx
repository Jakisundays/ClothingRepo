"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { updateCartItemSchema } from "@/lib/validations/cart";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Product } from "@/db/schema";

interface AddToCartFormProps {
  product: Product;
  showBuyNow?: boolean;
  soldOut: boolean;
}

type Inputs = z.infer<typeof updateCartItemSchema>;

export function AddToCartForm({
  product,
  showBuyNow,
  soldOut,
}: AddToCartFormProps) {
  const id = React.useId();
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const [isBuyingNow, setIsBuyingNow] = React.useState(false);
  const [size, setSize] = React.useState<string | null>(
    product.inventory?.[0]?.size ?? null
  );

  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: soldOut ? 0 : 1,
      size: product.inventory ? product.inventory[0].size : "",
    },
  });

  React.useEffect(() => {
    const currentInventory = product.inventory?.find(
      (item) => item.size === size
    )?.quantity;
    if (currentInventory && form.getValues("quantity") > currentInventory) {
      form.setValue("quantity", currentInventory);
    }
  }, [size, product.inventory, form]);

  const addToLocalStorageCart = ({ quantity, size }: Inputs) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = cart.findIndex(
      (item: any) => item.id === product.id && item.size === size
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  async function onSubmit({ quantity, size }: Inputs) {
    setIsAddingToCart(true);
    addToLocalStorageCart({ quantity, size });
    toast.success("Product added to cart");

    setIsAddingToCart(false);
  }

  const buyNow = ({ quantity, size }: Inputs) => {
    setIsBuyingNow(true);
    addToLocalStorageCart({ quantity, size });

    setIsBuyingNow(false);
    window.location.href = "/cart";
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex max-w-[260px] gap-4",
          showBuyNow ? "flex-col" : "flex-row"
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <Button
            id={`${id}-decrement`}
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-r-none"
            onClick={() =>
              form.setValue(
                "quantity",
                Math.max(1, form.getValues("quantity") - 1)
              )
            }
            disabled={isAddingToCart}
          >
            <MinusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Retirar un artículo</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={
                      size === product.inventory?.[0]?.size
                        ? product.inventory?.[0]?.quantity
                        : product.inventory?.[1]?.quantity
                    }
                    className="h-8 w-16 rounded-none border-x-0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);

                      if (isNaN(parsedValue)) return;

                      const currentInventory = product.inventory?.find(
                        (item) => item.size === size
                      )?.quantity;

                      if (currentInventory && parsedValue <= currentInventory) {
                        field.onChange(parsedValue);
                      } else if (currentInventory) {
                        field.onChange(currentInventory);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id={`${id}-increment`}
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-l-none"
            onClick={() => {
              const currentInventory = product.inventory?.find(
                (item) => item.size === size
              )?.quantity;

              if (
                currentInventory &&
                form.getValues("quantity") < currentInventory
              ) {
                form.setValue("quantity", form.getValues("quantity") + 1);
              }
            }}
            disabled={isAddingToCart}
          >
            <PlusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Añadir un producto</span>
          </Button>
        </div>
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="space-x-3">
              <FormControl>
                <RadioGroup
                  onValueChange={(e) => {
                    setSize(e);
                    field.onChange(e);
                  }}
                  defaultValue={field.value}
                  className="flex space-x-6 my-4"
                  disabled={soldOut}
                >
                  {product.inventory?.map((info, i) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={i}
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={info.size}
                          disabled={info.quantity === 0}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{info.size}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2.5">
          {showBuyNow ? (
            <Button
              type="button"
              aria-label="Compra ya"
              size="sm"
              className="w-full"
              onClick={() =>
                buyNow({
                  quantity: form.getValues("quantity"),
                  size: form.getValues("size"),
                })
              }
              disabled={isBuyingNow || soldOut}
            >
              {isBuyingNow && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Compra ya
            </Button>
          ) : null}
          <Button
            aria-label="Añadir al carrito"
            type="submit"
            variant={showBuyNow ? "outline" : "default"}
            size="sm"
            className="w-full"
            disabled={isAddingToCart || soldOut}
          >
            {isAddingToCart && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Añadir al carrito
          </Button>
        </div>
      </form>
    </Form>
  );
}
