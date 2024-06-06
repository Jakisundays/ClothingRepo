"use client";

import * as React from "react";
import type { CartLineItem, CartLineItemWithSize } from "@/types";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import { deleteCartItem, updateCartItem } from "@/lib/actions/cart";
import { catchError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";

interface UpdateCartProps {
  cartLineItem: CartLineItemWithSize;
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
  const id = React.useId();
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const updateLocalStorageCart = (updatedCart: any) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDecrement = () => {
    startTransition(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemIndex = cart.findIndex(
        (item: CartLineItemWithSize) =>
          item.id === cartLineItem.id && item.size === cartLineItem.size
      );
      if (itemIndex !== -1) {
        cart[itemIndex].quantity = Math.max(0, cart[itemIndex].quantity - 1);
        if (cart[itemIndex].quantity === 0) {
          cart.splice(itemIndex, 1);
        }
        updateLocalStorageCart(cart);
      }
    });
  };

  const handleIncrement = () => {
    startTransition(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemIndex = cart.findIndex(
        (item: CartLineItemWithSize) =>
          item.id === cartLineItem.id && item.size === cartLineItem.size
      );
      if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
        updateLocalStorageCart(cart);
      }
    });
  };

  const handleDelete = () => {
    startTransition(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Assuming cartLineItem contains the ID and size of the item to be deleted
      const { id, size } = cartLineItem;

      // Filter out items with matching ID and size
      const updatedCart = cart.filter(
        (item: CartLineItemWithSize) => !(item.id === id && item.size === size)
      );

      updateLocalStorageCart(updatedCart);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemIndex = cart.findIndex(
        (item: any) => item.id === cartLineItem.id
      );
      if (itemIndex !== -1) {
        const newQuantity = Number(e.target.value);
        if (newQuantity <= 0) {
          cart.splice(itemIndex, 1);
        } else {
          cart[itemIndex].quantity = newQuantity;
        }
        updateLocalStorageCart(cart);
      }
    });
  };

  return (
    <div className="flex w-full items-center justify-between space-x-2 xs:w-auto xs:justify-normal">
      <div className="flex items-center">
        <Button
          id={`${id}-decrement`}
          variant="outline"
          size="icon"
          className="size-8 rounded-r-none"
          onClick={handleDecrement}
          disabled={isPending}
        >
          <MinusIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>
        <Input
          id={`${id}-quantity`}
          type="number"
          min="0"
          className="h-8 w-14 rounded-none border-x-0"
          value={cartLineItem.quantity}
          onChange={handleChange}
          disabled={isPending}
        />
        <Button
          id={`${id}-increment`}
          variant="outline"
          size="icon"
          className="size-8 rounded-l-none"
          onClick={handleIncrement}
          disabled={isPending}
        >
          <PlusIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>
      <Button
        id={`${id}-delete`}
        variant="outline"
        size="icon"
        className="size-8"
        onClick={handleDelete}
        disabled={isPending}
      >
        <TrashIcon className="size-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  );
}
