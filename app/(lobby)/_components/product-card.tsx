"use client";

import { Product } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ id, name, images, price }: Product) => {
  const [currentImage, setCurrentImage] = useState(
    images
      ? images[0].url
      : "https://i.pinimg.com/564x/1c/79/64/1c7964c71fce11fd48942cc3b08663f1.jpg"
  );

  const handleMouseEnter = () => {
    setCurrentImage(
      images
        ? images[1].url
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

  function extractIntegerPart(decimalString: string): number {
    // Parse the string as a float and then truncate it to an integer
    const number = parseFloat(decimalString);
    return Math.floor(number);
  }

  return (
    <Link
      href={`/product/${id}`}
      className="flex flex-col justify-center items-center gap-1 p-6 cursor-pointer font-unna text-center"
    >
      <Image
        src={currentImage}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width={350}
        height={350}
        alt="product"
      />
      <label className="tracking-normal">{name}</label>
      <label className="tracking-normal">$ {extractIntegerPart(price)}</label>
    </Link>
  );
};

export default ProductCard;
