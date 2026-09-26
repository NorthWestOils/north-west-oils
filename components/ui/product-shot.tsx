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
  shadow = true,
  shadowWidth = "58%",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  shadow?: boolean;
  shadowWidth?: string;
}) {
  return (
    <div className={cn("relative flex items-end justify-center", className)}>
      {shadow ? (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-[6%] -translate-x-1/2 rounded-[50%]"
          style={{
            width: shadowWidth,
            background:
              "radial-gradient(ellipse at center, rgba(23,26,18,0.26) 0%, rgba(23,26,18,0.11) 45%, rgba(23,26,18,0) 72%)",
          }}
        />
      ) : null}
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
