"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function CarouselIntro() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3600 }),
  ]);

  return (
    <div
      className="bg-red-800 h-[calc(100vh-65px)] overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex h-full">
        <div className="flex-none w-full min-w-0 h-full bg-cover bg-center bg-[url('https://i.pinimg.com/originals/d4/1f/9d/d41f9d596799e030c536ada49ed9e267.gif')]">
          1
        </div>
        <div className="flex-none w-full min-w-0 h-full bg-cover bg-center bg-[url('https://i.pinimg.com/originals/7a/61/fe/7a61fe192013a896351c2a315238a36e.gif')]">
          2
        </div>
        {/* <div className="flex-none w-full min-w-0 h-full bg-cover bg-center bg-[url('https://wallpapers.com/images/high/4k-ultra-hd-dark-cubic-flooring-evbe3x10z58k0ikd.webp')]">
          3
        </div> */}
      </div>
    </div>
  );
}
