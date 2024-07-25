import { type getFeaturedProducts } from "@/lib/fetchers/product";

import CarouselIntro from "./carousel-intro";
import ProductCard from "./product-card";
import CarouselNew from "./carousel-new";

interface LobbyProps {
  productsPromise: ReturnType<typeof getFeaturedProducts>;
}

export default async function Lobby({ productsPromise }: LobbyProps) {
  const products = await productsPromise;
  return (
    <>
      {/* <CarouselNew /> */}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
}
