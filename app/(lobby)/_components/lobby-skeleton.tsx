import { ContentSection } from "@/components/shells/content-section";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";
import introBg from "@/public/intro/intro-3.webp";
import Image from "next/image";

export function LobbySkeleton() {
  return (
    <div className="h-full min-h-[calc(100vh-80px)]">
      <div className="h-full min-h-[60vh] md:min-h-[calc(50vh-20px)] block bg-cover bg-center relative">
        <Image
          alt="AlterEgo4k-bg"
          src={introBg}
          // quality={100}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
          priority
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
