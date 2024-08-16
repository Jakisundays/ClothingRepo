"use client";

import * as React from "react";
import Image from "next/image";
import { type StoredFile } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Lightbox from "react-spring-lightbox";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type CarouselApi = UseEmblaCarouselType["1"];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters["0"];

interface ProductImageCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[];
  options?: CarouselOptions;
}

export function ProductImageCarousel({
  images,
  className,
  options,
  ...props
}: ProductImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const renderHeader = ({ close }: { close: () => void }) => (
    <div className="flex justify-end p-4">
      <button onClick={close} className="text-gray-800 hover:text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    },
    [scrollNext, scrollPrev]
  );

  const onSelect = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const gotoPrevious = () =>
    selectedIndex > 0 && setSelectedIndex(selectedIndex - 1);

  const gotoNext = () =>
    selectedIndex + 1 < images.length && setSelectedIndex(selectedIndex + 1);

  if (images.length === 0) {
    return (
      <div
        aria-label="Product Placeholder"
        role="img"
        aria-roledescription="placeholder"
        className="flex aspect-square size-full flex-1 items-center justify-center bg-secondary"
      >
        <Icons.placeholder
          className="size-9 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div
      aria-label="Product image carousel"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div
          className="-ml-4 flex touch-pan-y"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {images.map((image, index) => (
            <div
              className="relative aspect-square min-w-0 flex-[0_0_100%] pl-4"
              key={index}
            >
              <Image
                aria-label={`Slide ${index + 1} of ${images.length}`}
                role="group"
                key={index}
                aria-roledescription="slide"
                src={image.url}
                alt={image.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover cursor-pointer"
                priority={index === 0}
                onClick={() => openLightbox(index)}
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 ? (
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="mr-0.5 aspect-square size-7 rounded-none sm:mr-2 sm:size-8"
            disabled={prevBtnDisabled}
            onClick={scrollPrev}
          >
            <ChevronLeftIcon className="size-3 sm:size-4" aria-hidden="true" />
            <span className="sr-only">Previous slide</span>
          </Button>
          {images.map((image, i) => (
            <Button
              key={i}
              variant="outline"
              size="icon"
              className={cn(
                "group relative aspect-square size-full max-w-[100px] rounded-none shadow-sm hover:bg-transparent focus-visible:ring-foreground",
                i === selectedIndex && "ring-1 ring-foreground"
              )}
              onClick={() => scrollTo(i)}
              onKeyDown={handleKeyDown}
            >
              <div className="absolute inset-0 z-10 bg-zinc-950/20 group-hover:bg-zinc-950/40" />
              <Image
                src={image.url}
                alt={image.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
              <span className="sr-only">
                Slide {i + 1} of {images.length}
              </span>
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="ml-0.5 aspect-square size-7 rounded-none sm:ml-2 sm:size-8"
            disabled={nextBtnDisabled}
            onClick={scrollNext}
          >
            <ChevronRightIcon className="size-3 sm:size-4" aria-hidden="true" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      ) : null}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={images.map((image) => ({
          src: image.url,
          alt: image.name,
        }))}
        currentIndex={selectedIndex}
        /* Add styling */
        className="bg-secondary"
        /* Use single or double click to zoom */
        // singleClickToZoom

        /* react-spring config for open/close animation */
        pageTransitionConfig={{
          from: { transform: "scale(0.75)", opacity: 0 },
          enter: { transform: "scale(1)", opacity: 1 },
          leave: { transform: "scale(0.75)", opacity: 0 },
          config: { mass: 1, tension: 320, friction: 32 },
        }}
        renderHeader={() => renderHeader({ close: closeLightbox })} // Pass the close function
      />
    </div>
  );
}