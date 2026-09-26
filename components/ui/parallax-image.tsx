"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A full-bleed photograph that eases through its own frame as the page moves.
 *
 * The travel is deliberately small — a few percent — because the point is to
 * stop the band feeling like a pasted-in rectangle, not to put on a show. It
 * animates transform only, and does nothing at all under reduced motion.
 */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  travel = 6,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  travel?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y, scale: 1 + travel / 50 }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="size-full object-cover"
        />
      </motion.div>
    </div>
  );
}
