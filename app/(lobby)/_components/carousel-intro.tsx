"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselIntro() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3600 }),
  ]);

  const imageUrl = "https://images.unsplash.com/photo-1720329461027-f34c265b1d91";
  const imageParams = "?auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className="h-44 md:h-[calc(100vh-65px)] overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex h-full">
        <div className="flex-none w-full min-w-0 h-full relative">
          <picture>
            <source
              srcSet={`${imageUrl}?q=80&w=480${imageParams} 480w, ${imageUrl}?q=80&w=800${imageParams} 800w, ${imageUrl}?q=80&w=1200${imageParams} 1200w, ${imageUrl}?q=80&w=1600${imageParams} 1600w, ${imageUrl}?q=80&w=2400${imageParams} 2400w`}
              sizes="(max-width: 600px) 480px, (max-width: 960px) 800px, (max-width: 1280px) 1200px, 1600px"
            />
            <img
              src={`${imageUrl}?q=80&w=1600${imageParams}`}
              className="image h-full w-full absolute inset-0 object-cover object-center"
              alt="Hero-image"
              style={{ opacity: 1, willChange: 'auto', transform: 'none' }}
            />
          </picture>
        </div>
        <div className="flex-none w-full min-w-0 h-full relative">
          <picture>
            <source
              srcSet={`${imageUrl}?q=80&w=480${imageParams} 480w, ${imageUrl}?q=80&w=800${imageParams} 800w, ${imageUrl}?q=80&w=1200${imageParams} 1200w, ${imageUrl}?q=80&w=1600${imageParams} 1600w, ${imageUrl}?q=80&w=2400${imageParams} 2400w`}
              sizes="(max-width: 600px) 480px, (max-width: 960px) 800px, (max-width: 1280px) 1200px, 1600px"
            />
            <img
              src={`${imageUrl}?q=80&w=1600${imageParams}`}
              className="image h-full w-full absolute inset-0 object-cover object-center"
              alt="Hero-image"
              style={{ opacity: 1, willChange: 'auto', transform: 'none' }}
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
