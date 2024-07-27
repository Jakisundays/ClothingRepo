import { type getFeaturedProducts } from "@/lib/fetchers/product";

import ProductCard from "./product-card";

interface LobbyProps {
  productsPromise: ReturnType<typeof getFeaturedProducts>;
}

export default async function Lobby({ productsPromise }: LobbyProps) {
  const products = await productsPromise;
  return (
    <div className="h-full min-h-[calc(100vh-80px)]">
      <div
        className="h-full min-h-[60vh]  md:min-h-[calc(50vh-20px)] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/intro/intro-1.jpg)" }}
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
