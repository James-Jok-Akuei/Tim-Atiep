"use client";

import { QRCodeSVG } from "qrcode.react";
import { SITE_URL } from "@/data/presentationData";

const guideUrl = new URL("/mobile", SITE_URL);

/**
 * The attendee guide on the live site. Always the deployed address, so phones
 * can reach it even when the stage runs from a laptop on localhost.
 */
export const eventGuide = {
  href: guideUrl.toString(),
  display: `${guideUrl.host}${guideUrl.pathname}`,
};

/** Compact "scan for the event guide" card linking attendees to /mobile. */
export function GuideQrCode({ className = "" }: { className?: string }) {
  return (
    <div
      className={`items-center gap-4 rounded-2xl border border-indigo-line bg-indigo-raised/95 p-3 pr-5 ${className}`}
    >
      <div className="aspect-square w-[min(14vh,14vw)] shrink-0 rounded-lg bg-clean-white p-[6%]">
        <QRCodeSVG
          value={eventGuide.href}
          size={256}
          level="M"
          marginSize={0}
          bgColor="#FFFFFF"
          fgColor="#1B2B47"
          title="Open the event guide"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex flex-col gap-1 text-left">
        <p className="text-stage-label uppercase tracking-[0.25em] text-tree-red-soft">Event guide</p>
        <p className="text-stage-small leading-snug text-clean-white">
          Scan for speakers,
          <br />
          poems &amp; ordering
        </p>
        <p className="font-mono text-stage-label text-clean-white-faint">{eventGuide.display}</p>
      </div>
    </div>
  );
}
