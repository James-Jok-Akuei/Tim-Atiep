"use client";

import { QRCodeSVG } from "qrcode.react";
import { book } from "@/data/presentationData";

/** Cream-framed QR code for the order link. Size it with a width class. */
export function OrderQrCode({ className = "" }: { className?: string }) {
  return (
    <div className={`aspect-square shrink-0 rounded-2xl bg-clean-white p-[4%] ${className}`}>
      <QRCodeSVG
        value={book.purchaseLink}
        size={512}
        level="M"
        marginSize={0}
        bgColor="#FFFFFF"
        fgColor="#1B2B47"
        title={`Order ${book.fullTitle}`}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
