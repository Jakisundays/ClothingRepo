import { Skeleton } from "@/components/ui/skeleton";
import { ContentSection } from "@/components/shells/content-section";
import { Shell } from "@/components/shells/shell";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";
import CarouselNew from "./carousel-new";
import Image from "next/image";
import CarouselIntro from "./carousel-intro";

export function LobbySkeleton() {
  return (
    <div>
      <CarouselIntro />
      {/* <CarouselNew /> */}
      {/* <Image
        src="https://images.unsplash.com/photo-1720329461027-f34c265b1d91?q=80&w=3520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="hero"
        height={100}
      /> */}
      {/* img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
            alt='Hero-image'
          /> */}

      <ContentSection
        title="Featured products"
        description="Explore products from around the world"
        href="/products"
        linkText="View all products"
        className="pt-8 md:pt-10 lg:pt-12 mx-2 my-5"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </ContentSection>
    </div>
  );
}
