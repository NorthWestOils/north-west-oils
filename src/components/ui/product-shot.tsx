import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A packshot standing on a surface rather than sitting in a card.
 *
 * The shadow is a soft radial ellipse under the pack, which is what gives the
 * cut-out weight. Product images are never cropped or stretched — `contain`
 * only, so the printed label keeps its proportions.
 */
export function ProductShot({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("relative flex items-end justify-center", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn("relative h-full w-auto object-contain", imageClassName)}
      />
    </div>
  );
}
