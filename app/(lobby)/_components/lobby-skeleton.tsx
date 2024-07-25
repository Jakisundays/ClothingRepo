import { ContentSection } from "@/components/shells/content-section";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";
import CarouselIntro from "./carousel-intro";

export function LobbySkeleton() {
  return (
    <div className="flex flex-col">
      <CarouselIntro />
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
