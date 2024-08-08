"use client";

import * as React from "react";
import type { CartLineItem, ProductInventory } from "@/types";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import { deleteCartItem, updateCartItem } from "@/lib/actions/cart";
import { catchError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";

export function UpdateCart(cartLineItem: CartLineItem) {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const [productDetails, setProductDetails] =
    React.useState<ProductInventory | null>(null);

  React.useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`/api/product/${cartLineItem.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product Inventory");
      }
      const data = await response.json();
      const wantedProductInventory = findSize(
        data.inventory,
        cartLineItem.size
      );
      setProductDetails(wantedProductInventory);
    };

    fetchProductDetails();
  }, [cartLineItem.id, cartLineItem.size]);

  React.useEffect(() => {
    if (productDetails && cartLineItem.quantity > productDetails.quantity) {
      startTransition(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemIndex = cart.findIndex(
          (item: CartLineItem) =>
            item.id === cartLineItem.id && item.size === cartLineItem.size
        );
        if (itemIndex !== -1) {
          cart[itemIndex].quantity = productDetails.quantity;
          updateLocalStorageCart(cart);
        }
      });
    }
  }, [productDetails, cartLineItem]);

  const updateLocalStorageCart = (updatedCart: any) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDecrement = () => {
    startTransition(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemIndex = cart.findIndex(
        (item: CartLineItem) =>
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
    if (productDetails && cartLineItem.quantity < productDetails.quantity) {
      startTransition(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemIndex = cart.findIndex(
          (item: CartLineItem) =>
            item.id === cartLineItem.id && item.size === cartLineItem.size
        );
        if (itemIndex !== -1) {
          cart[itemIndex].quantity += 1;
          updateLocalStorageCart(cart);
        }
      });
    }
  };

  const handleDelete = () => {
    startTransition(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const { id, size } = cartLineItem;
      const updatedCart = cart.filter(
        (item: CartLineItem) => !(item.id === id && item.size === size)
      );
      updateLocalStorageCart(updatedCart);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (productDetails && newQuantity > productDetails.quantity) {
      return;
    }
    startTransition(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemIndex = cart.findIndex(
        (item: CartLineItem) =>
          item.id === cartLineItem.id && item.size === cartLineItem.size
      );
      if (itemIndex !== -1) {
        if (newQuantity <= 0) {
          cart.splice(itemIndex, 1);
        } else {
          cart[itemIndex].quantity = newQuantity;
        }
        updateLocalStorageCart(cart);
      }
    });
  };

  const findSize = (
    arr: ProductInventory[],
    targetSize: string
  ): ProductInventory | null => {
    return arr.find((item) => item.size === targetSize) || null;
  };

  return (
    <div className="flex w-full items-center justify-between space-x-2 xs:w-auto xs:justify-normal">
      <div className="flex items-center">
        <Button
          id={`${cartLineItem.id}-decrement`}
          variant="outline"
          size="icon"
          className="size-8 rounded-r-none"
          onClick={handleDecrement}
          disabled={isPending}
        >
          <MinusIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">Retirar un artículo</span>
        </Button>
        <Input
          id={`${cartLineItem.id}-quantity`}
          type="number"
          min="0"
          className="h-8 w-14 rounded-none border-x-0"
          value={cartLineItem.quantity}
          onChange={handleChange}
          disabled={isPending}
        />
        <Button
          id={`${cartLineItem.id}-increment`}
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
        id={`${cartLineItem.id}-delete`}
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
