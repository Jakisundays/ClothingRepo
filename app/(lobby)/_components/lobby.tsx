import { type getFeaturedProducts } from "@/lib/fetchers/product";

import ProductCard from "./product-card";
import Image from "next/image";
import introBgMobile from "@/public/intro/intro.png";
import introBg from "@/public/intro/intro.gif";

interface LobbyProps {
  productsPromise: ReturnType<typeof getFeaturedProducts>;
}

export default async function Lobby({ productsPromise }: LobbyProps) {
  const products = await productsPromise;
  return (
    <div className="h-full min-h-[calc(100vh-80px)] flex flex-col relative">
      <div className="h-full min-h-[55vh] md:min-h-[45vh] block bg-cover bg-center relative">
        <Image
          alt="AlterEgo4k-bg"
          src={introBgMobile}
          // quality={100}
          fill
          className="block md:hidden"
          sizes="100vw"
          priority
        />
        <Image
          alt="AlterEgo4k-bg"
          src={introBg}
          // quality={100}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="hidden md:block"
          sizes="100vw"
          priority
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
