"use client";

import { QRCodeSVG } from "qrcode.react";
import { OrderQrCode } from "@/components/stage/OrderQrCode";
import { useGuideUrl } from "@/components/stage/GuideQrCode";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { book } from "@/data/presentationData";
import { formatSsp } from "@/lib/format";

/** Large-screen side panel: order QR, price, and a QR that opens this guide on a phone. */
export function ScanPanel() {
  const guide = useGuideUrl();

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-indigo-line bg-indigo-raised/95 p-6 shadow-2xl">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-tree-red-soft">Order your copy</p>
        <p className="mt-2 font-display text-5xl font-semibold leading-none text-red-gradient">${book.price.usd}</p>
        <p className="mt-1 text-clean-white-muted">{formatSsp(book.price.ssp)}</p>
      </div>

      <div className="flex flex-col gap-3">
        <OrderQrCode className="w-full" />
        <p className="text-sm text-clean-white-muted">
          Scan to order on WhatsApp
          <span className="block font-mono text-clean-white">{book.stockist.phoneDisplay}</span>
        </p>
      </div>

      {guide && (
        <div className="flex items-center gap-4 border-t border-indigo-line pt-5">
          <div className="aspect-square w-24 shrink-0 rounded-lg bg-clean-white p-2">
            <QRCodeSVG
              value={guide.href}
              size={192}
              level="M"
              marginSize={0}
              bgColor="#FFFFFF"
              fgColor="#1B2B47"
              title="Open this guide on your phone"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-clean-white">Open this guide on your phone</p>
            <p className="truncate font-mono text-xs text-clean-white-faint">{guide.display}</p>
            {guide.isLocal && <PlaceholderBadge className="mt-2 text-[0.6rem]">Set NEXT_PUBLIC_SITE_URL</PlaceholderBadge>}
          </div>
        </div>
      )}
    </div>
  );
}
