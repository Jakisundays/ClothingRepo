import * as React from "react";

import { getFeaturedProducts } from "@/lib/fetchers/product";

import Lobby from "./_components/lobby";
import { LobbySkeleton } from "./_components/lobby-skeleton";

export default function IndexPage() {
  const productsPromise = getFeaturedProducts();
  
  return (
      <Lobby {...{ productsPromise }} />
    // <React.Suspense fallback={<LobbySkeleton />}>
    // </React.Suspense>
  );
}
