"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = () => {
  const [currentImage, setCurrentImage] = useState(
    "https://i.pinimg.com/564x/1c/79/64/1c7964c71fce11fd48942cc3b08663f1.jpg"
  );

  const handleMouseEnter = () => {
    setCurrentImage(
      "https://i.pinimg.com/564x/fe/d0/e3/fed0e38c6a887f56cdf7f0f2ef182927.jpg"
    );
  };

  const handleMouseLeave = () => {
    setCurrentImage(
      "https://i.pinimg.com/564x/1c/79/64/1c7964c71fce11fd48942cc3b08663f1.jpg"
    );
  };

  return (
    <Link href={'/product/1'} className="flex flex-col justify-center items-center gap-3 p-8 cursor-pointer">
      <Image
        src={currentImage}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width={350}
        height={350}
        alt="product"
      />
      <label className="text-lg font-semibold tracking-normal">Name</label>
    </Link>
  );
};

export default ProductCard;
