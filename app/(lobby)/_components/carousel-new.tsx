"use client";
import { ImagesSlider } from "@/components/acertenity/images-slider";
import { motion } from "framer-motion";
import React from "react";

export default function CarouselNew() {
  const images = [
    "https://scontent.faep25-1.fna.fbcdn.net/v/t39.30808-6/438738432_18313666987181495_469355161487489707_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_9HZ3n2GRSkQ7kNvgFPFIye&_nc_ht=scontent.faep25-1.fna&oh=00_AYCnsqX4HdXb2w4ug5DmgdebbofXD0g-WPUxnVqPe38oFg&oe=669E0436",
    "https://scontent.faep25-1.fna.fbcdn.net/v/t39.30808-6/440133036_18313667005181495_568547076304317839_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BsBqLQR2UY0Q7kNvgFUaT5a&_nc_ht=scontent.faep25-1.fna&oh=00_AYBopgic0wPrh5xxvjaYvaO7dy71yqy9k8uj57aiO_0wyA&oe=669E2460",
  ];
  return (
    <ImagesSlider className="h-full min-h-[calc(100vh-60px)]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Encuentra tu otra mitad
          <br />
          crea tu Alter Ego
        </motion.p>
        {/* <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button> */}
      </motion.div>
    </ImagesSlider>
  );
}
