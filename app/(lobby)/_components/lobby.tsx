import Link from "next/link";

import { productCategories } from "@/config/products";
import { type getFeaturedProducts } from "@/lib/fetchers/product";
import { Button } from "@/components/ui/button";

import { ContentSection } from "@/components/shells/content-section";
import { Shell } from "@/components/shells/shell";

import { CategoryCard } from "./category-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import CarouselIntro from "./carousel-intro";
import ProductCard from "./product-card";

interface LobbyProps {
  productsPromise: ReturnType<typeof getFeaturedProducts>;
}

export default async function Lobby({ productsPromise }: LobbyProps) {
  // See the "Parallel data fetching" docs: https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
  const [products] = await Promise.all([productsPromise]);

  return (
    <>
      <CarouselIntro />
      <div className="flex flex-wrap">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
    // <Shell className="w-full">

    //   <section className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
    //     <h1 className="text-balance font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
    //       Alter Ego
    //     </h1>
    //     <p className="max-w-[42rem] text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8">
    //       descrpcion cool
    //     </p>
    //     <div className="flex flex-wrap items-center justify-center gap-4">
    //       <Button asChild>
    //         <Link href="/products">
    //           Buy now
    //           <span className="sr-only">Buy now</span>
    //         </Link>
    //       </Button>
    //       <Button variant="outline" asChild>
    //         <Link href="/dashboard/stores">
    //           Sell now
    //           <span className="sr-only">Sell now</span>
    //         </Link>
    //       </Button>
    //     </div>
    //   </section>
    //   <section className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //     {productCategories.map((category) => (
    //       <CategoryCard key={category.title} category={category} />
    //     ))}
    //   </section>
    //   <ContentSection
    //     title="Featured products"
    //     description="Explore products from around the world"
    //     href="/products"
    //     linkText="View all products"
    //     className="pt-8 md:pt-10 lg:pt-12"
    //   >
    //     {products.map((product) => (
    //       <ProductCard key={product.id} product={product} />
    //     ))}
    //   </ContentSection>
    // </Shell>
  );
}
