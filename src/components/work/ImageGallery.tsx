"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  isHovered: boolean;
  index: number;
}

export function ImageGallery({ images, isHovered, index }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    if (images.length <= 1) return;

    const isTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      window.innerWidth < 1025;

    if (!isTouch && !isHovered) {
      timeout = setTimeout(() => setCurrent(0), 0);
      return () => clearTimeout(timeout);
    }

    const cycle = () => {
      interval = setInterval(() => {
        setCurrent((c) => (c + 1) % images.length);
      }, isTouch ? 2000 : 1000);
    };

    if (isTouch) {
      timeout = setTimeout(() => {
        setCurrent((c) => (c + 1) % images.length);
        cycle();
      }, 2000 * index);
    } else {
      cycle();
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [images.length, isHovered, index]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt="work image"
          className="work-image"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={index === 0 && i === 0}
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.4s ease",
            objectFit: "cover",
            willChange: "opacity",
          }}
        />
      ))}
    </>
  );
}
