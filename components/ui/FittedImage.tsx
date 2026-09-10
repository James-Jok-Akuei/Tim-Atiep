import type { ReactNode } from "react";
import { StageImage } from "./StageImage";

type FittedImageProps = {
  src: string;
  alt: string;
  /** Size hint for the sharp foreground image. */
  sizes: string;
  quality?: number;
  className?: string;
  fallback?: ReactNode;
};

/**
 * Shows the whole photo — never cropped or enlarged — over a dimmed, blurred
 * copy of itself that fills the rest of the frame.
 */
export function FittedImage({ src, alt, sizes, quality, className = "", fallback = null }: FittedImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div aria-hidden className="absolute inset-0 scale-110 blur-2xl brightness-[0.45]">
        <StageImage src={src} alt="" fill sizes="25vw" className="object-cover" fallback={null} />
      </div>
      <StageImage src={src} alt={alt} fill sizes={sizes} quality={quality} className="object-contain" fallback={fallback} />
    </div>
  );
}
