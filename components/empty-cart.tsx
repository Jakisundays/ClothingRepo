import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] w-full px-4 md:px-0">
      <div className="grid gap-8 text-center">
        <div className="flex items-center justify-center">
          <Link href="/">
            <ShoppingCart className="h-20 w-20 text-gray-900 dark:text-gray-50" />
            <span className="sr-only">Alter ego 4K</span>
          </Link>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Tu carrito está vacío
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Parece que aún no has agregado ningún producto a tu carrito.
          </p>
        </div>

        <Link
          className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          href="/"
        >
          Explorar Productos
        </Link>
      </div>
    </div>
  );
}
