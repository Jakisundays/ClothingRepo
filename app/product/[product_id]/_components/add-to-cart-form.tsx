"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { addToCart } from "@/lib/actions/cart";
// import { showErrorToast } from "@/lib/handle-error"
import { Label } from "@/components/ui/label";
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
}

type Inputs = z.infer<typeof updateCartItemSchema>;

export function AddToCartForm({ product, showBuyNow }: AddToCartFormProps) {
  const id = React.useId();
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const [isBuyingNow, setIsBuyingNow] = React.useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
      size: product.inventory ? product.inventory[0].size : "Talle 1",
    },
  });

  const addToLocalStorageCart = ({ quantity, size }: Inputs) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Find if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item: any) => item.id === product.id && item.size === size
    );

    if (existingProductIndex !== -1) {
      // If product already exists, update the quantity
      cart[existingProductIndex].quantity += quantity;
    } else {
      // If product does not exist, add it to the cart
      cart.push({ ...product, quantity, size });
    }

    // Save the updated cart back to local storage
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
                Math.max(0, form.getValues("quantity") - 1)
              )
            }
            disabled={isAddingToCart}
          >
            <MinusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Remove one item</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    className="h-8 w-16 rounded-none border-x-0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (isNaN(parsedValue)) return;
                      field.onChange(parsedValue);
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
            onClick={() =>
              form.setValue("quantity", form.getValues("quantity") + 1)
            }
            disabled={isAddingToCart}
          >
            <PlusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Add one item</span>
          </Button>
        </div>
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="space-x-3">
              {/* <FormLabel>Talle</FormLabel> */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-6 my-4"
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
              aria-label="Buy now"
              size="sm"
              className="w-full"
              onClick={async () =>
                buyNow({
                  quantity: form.getValues("quantity"),
                  size: form.getValues("size"),
                })
              }
              disabled={isBuyingNow}
            >
              {isBuyingNow && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Buy now
            </Button>
          ) : null}
          <Button
            aria-label="Add to cart"
            type="submit"
            variant={showBuyNow ? "outline" : "default"}
            size="sm"
            className="w-full"
            disabled={isAddingToCart}
          >
            {isAddingToCart && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Add to cart
          </Button>
        </div>
      </form>
    </Form>
  );
}
