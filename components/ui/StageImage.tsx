"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

type StageImageProps = Omit<ImageProps, "onError"> & {
  /** Rendered instead of the image when the file is missing or fails to load. */
  fallback: ReactNode;
};

/** next/image that swaps to a designed fallback, so a missing photo never shows a broken icon on stage. */
export function StageImage({ fallback, alt, ...props }: StageImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

  if (failedSrc === props.src) return <>{fallback}</>;

  return <Image alt={alt} {...props} onError={() => setFailedSrc(props.src)} />;
}
