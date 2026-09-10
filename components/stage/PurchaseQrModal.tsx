"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { book } from "@/data/presentationData";
import { formatSsp } from "@/lib/format";
import { EASE_STAGE } from "./motion";
import { OrderQrCode } from "./OrderQrCode";

type PurchaseQrModalProps = {
  open: boolean;
  onClose: () => void;
};

/** Large, projector-scannable "scan to order" popup. */
export function PurchaseQrModal({ open, onClose }: PurchaseQrModalProps) {
  const { price, stockist } = book;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="purchase-qr"
          role="dialog"
          aria-modal="true"
          aria-labelledby="purchase-qr-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-base/95 p-[4vh]"
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.45, ease: EASE_STAGE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full w-full max-w-6xl flex-col items-center gap-[4vh] rounded-3xl border border-indigo-line bg-indigo-raised p-[5vh] shadow-2xl md:flex-row md:gap-[5vw]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close purchase popup"
              className="absolute right-4 top-4 rounded-full p-2 text-clean-white-faint transition-colors hover:bg-indigo-line hover:text-clean-white"
            >
              <X className="size-6" />
            </button>

            <OrderQrCode className="w-[min(52vh,80vw)]" />

            <div className="flex flex-col gap-[2.5vh] text-center md:text-left">
              <p className="text-stage-label font-medium uppercase tracking-[0.3em] text-tree-red-soft">
                Scan to order
              </p>
              <h2
                id="purchase-qr-title"
                className="font-display text-stage-heading font-semibold text-clean-white"
              >
                {book.title}
                <span className="block text-stage-lead italic text-clean-white-muted">
                  {book.subtitle}
                </span>
              </h2>
              <p className="font-display text-stage-title font-semibold text-red-gradient">
                ${price.usd}
                <span className="block whitespace-nowrap font-sans text-stage-lead font-normal text-clean-white-muted">
                  {formatSsp(price.ssp)}
                </span>
              </p>
              <div className="text-stage-body text-clean-white-muted">
                <p className="text-clean-white">{stockist.name}</p>
                <p>{stockist.location}</p>
                <p className="font-mono tabular-nums text-clean-white">{stockist.phoneDisplay}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
