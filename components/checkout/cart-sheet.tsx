"use client";
import Link from "next/link";

import { getCart } from "@/lib/fetchers/cart";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartLineItems } from "@/components/checkout/cart-line-items";
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export function CartSheet() {
  const pathname = usePathname();
  // console.log({ pathname });
  // const cartLineItems = await getCart()
  const [cart, setCart] = useState(cartLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   const storedCart = localStorage.getItem("cart");
  //   if (storedCart) {
  //     setCart(JSON.parse(storedCart));
  //   }
  // }, []);

  // console.log({ cart });

  // const removeFromCart = (productId) => {
  //   setCart((prevCart) => {
  //     const updatedCart = { ...prevCart };
  //     // delete updatedCart[productId];
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });
  // };

  const itemCount = cart.reduce(
    (total: any, item: any) => total + Number(item.quantity),
    0
  );

  const cartTotal = cart.reduce(
    (total: any, item: any) => total + item.quantity * Number(item.price),
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="outline"
          size="icon"
          className={cn("relative", pathname === '/cart' && 'hidden')}
        >
          {itemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 size-6 justify-center rounded-full p-2.5"
            >
              {itemCount}
            </Badge>
          )}
          <Icons.cart className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
          <Separator />
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <CartLineItems items={cart} className="flex-1" />
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal.toFixed(2))}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => (window.location.href = "/cart")}
                  >
                    Continue to checkout
                  </Button>
                  {/* <Link
                    aria-label="View your cart"
                    href="/cart"
                    className={buttonVariants({
                      size: "sm",
                      className: "w-full",
                    })}
                  > window.location.href = "/cart";
                    Continue to checkout
                  </Link> */}
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart
              className="mb-4 size-16 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
            <SheetTrigger asChild>
              <Link
                aria-label="Add items to your cart to checkout"
                href="/"
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-sm text-muted-foreground",
                  })
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
