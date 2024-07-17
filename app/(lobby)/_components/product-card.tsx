"use client";

import { Product } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ id, name, images }: Product) => {
  const [currentImage, setCurrentImage] = useState(
    images
      ? images[0].url
      : "https://i.pinimg.com/564x/1c/79/64/1c7964c71fce11fd48942cc3b08663f1.jpg"
  );

  const handleMouseEnter = () => {
    setCurrentImage(
      images
        ? images[0].url
        // ? images[1].url
        : "https://i.pinimg.com/564x/1c/79/64/1c7964c71fce11fd48942cc3b08663f1.jpg"
    );
  };

  const handleMouseLeave = () => {
    setCurrentImage(
      images
        ? images[0].url
        : "https://i.pinimg.com/564x/1c/79/64/1c7964c71fce11fd48942cc3b08663f1.jpg"
    );
  };

  return (
    <Link
      href={`/product/${id}`}
      className="flex flex-col justify-center items-center gap-3 p-8 cursor-pointer"
    >
      <Image
        src={currentImage}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width={350}
        height={350}
        alt="product"
      />
      <label className="text-lg font-semibold tracking-normal">{name}</label>
    </Link>
  );
};

export default ProductCard;
