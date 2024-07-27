import { ContentSection } from "@/components/shells/content-section";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";

export function LobbySkeleton() {
  return (
    <div className="h-full min-h-[calc(100vh-80px)]">
      <div
        className="h-full min-h-[60vh]  md:min-h-[calc(50vh-20px)] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/intro/intro-1.jpg)" }}
      />
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
