"use client";

import { QRCodeSVG } from "qrcode.react";
import { useSyncExternalStore } from "react";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

const LOCAL_HOST = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/;

const subscribe = () => () => {};
const getOrigin = () => window.location.origin;

/**
 * Where phones should land: NEXT_PUBLIC_SITE_URL when set (the deployed
 * address), otherwise the address this page is being served from.
 */
export function useGuideUrl() {
  const origin = useSyncExternalStore(subscribe, getOrigin, () => null);
  const base = process.env.NEXT_PUBLIC_SITE_URL || origin;
  if (!base) return null;
  const url = new URL("/mobile", base);
  return {
    href: url.toString(),
    display: `${url.host}${url.pathname}`,
    isLocal: LOCAL_HOST.test(url.hostname),
  };
}

/** Compact "scan for the event guide" card linking attendees to /mobile. */
export function GuideQrCode({ className = "" }: { className?: string }) {
  const guide = useGuideUrl();
  if (!guide) return null;

  return (
    <div
      className={`items-center gap-4 rounded-2xl border border-indigo-line bg-indigo-raised/95 p-3 pr-5 ${className}`}
    >
      <div className="aspect-square w-[min(14vh,14vw)] shrink-0 rounded-lg bg-clean-white p-[6%]">
        <QRCodeSVG
          value={guide.href}
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
        <p className="font-mono text-stage-label text-clean-white-faint">{guide.display}</p>
        {guide.isLocal && (
          <PlaceholderBadge className="mt-1 text-[0.65rem]">Set NEXT_PUBLIC_SITE_URL</PlaceholderBadge>
        )}
      </div>
    </div>
  );
}
