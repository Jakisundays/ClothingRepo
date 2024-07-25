"use client";
import { ImagesSlider } from "@/components/acertenity/images-slider";
import { motion } from "framer-motion";
import React from "react";

export default function CarouselNew() {
  const images = [
    "https://images.unsplash.com/photo-1720329461027-f34c265b1d91?q=80&w=3520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1720329461017-d6ed9f66beb5?q=80&w=3520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        <motion.p className="font-bold text-xl md:text-6xl text-center text-white py-4">
          Encuentra tu otra mitad
          <br />
          crea tu Alter Ego
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
}
