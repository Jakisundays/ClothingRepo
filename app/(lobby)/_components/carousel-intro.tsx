"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselIntro() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3600 }),
  ]);

  return (
    <div
      className="h-44 md:h-[calc(100vh-65px)] overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex h-full">
        <div className="flex-none w-full min-w-0 h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1720329461027-f34c265b1d91?q=80&w=3520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]" />
        <div className="flex-none w-full min-w-0 h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1720329461027-f34c265b1d91?q=80&w=3520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]" />
      </div>
    </div>
  );
}
