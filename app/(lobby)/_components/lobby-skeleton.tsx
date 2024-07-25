import { ContentSection } from "@/components/shells/content-section";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";
import CarouselIntro from "./carousel-intro";
import Image from "next/image";

export function LobbySkeleton() {
  return (
    <div className="flex flex-col">
      {/* <CarouselIntro /> */}
      <div className="h-full min-h-[calc(100vh-80px)] relative">
        <Image
          src="https://images.unsplash.com/photo-1720329461027-f34c265b1d91?q=80&w=3520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // placeholder="blur"
          // quality={100}
          fill
          alt="Hero-pic"
        />
      </div>
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
