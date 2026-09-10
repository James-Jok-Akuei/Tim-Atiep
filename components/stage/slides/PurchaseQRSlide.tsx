"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { BookCover } from "@/components/ui/BookCover";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { book } from "@/data/presentationData";
import { formatSsp } from "@/lib/format";
import { fadeUp, staggerIn } from "../motion";
import { OrderQrCode } from "../OrderQrCode";
import { Slide } from "../Slide";

/** Book advert + scan-to-order: cover, price, stockist, and a QR code big enough to scan from the seats. */
export function PurchaseQRSlide() {
  const { price, stockist } = book;
  const displayLink = stockist.whatsapp.replace(/^https?:\/\//, "");

  return (
    <Slide>
      <motion.div
        variants={staggerIn(0.3, 0.15)}
        initial="hidden"
        animate="show"
        className="relative z-10 grid w-full max-w-[120rem] items-center gap-[5vh] md:grid-cols-[auto_1fr_auto] md:gap-[4vw]"
      >
        <motion.div variants={fadeUp} className="hidden md:block">
          <BookCover className="h-[54vh]" />
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-[3vh] text-center md:items-start md:text-left">
          <Eyebrow>Get your copy</Eyebrow>
          <h2 className="font-display text-stage-heading font-semibold leading-none text-clean-white">
            {book.title}
            <span className="mt-2 block font-normal italic text-clean-white-muted">{book.subtitle}</span>
          </h2>
          <p className="font-display text-stage-title font-semibold leading-none text-red-gradient">
            ${price.usd}
            <span className="mt-2 block whitespace-nowrap font-sans text-stage-lead font-normal text-clean-white-muted">
              {formatSsp(price.ssp)}
            </span>
          </p>
          <div className="flex flex-col gap-[1.2vh] text-stage-body">
            <p className="font-semibold text-clean-white">{stockist.name}</p>
            <p className="flex items-start gap-3 text-clean-white-muted">
              <MapPin className="mt-[0.3em] size-[1em] shrink-0 text-tree-red-soft" />
              {stockist.location}
            </p>
            <p className="flex items-center gap-3 font-mono tabular-nums text-clean-white">
              <Phone className="size-[1em] shrink-0 text-tree-red-soft" />
              {stockist.phoneDisplay}
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-[2vh]">
          <OrderQrCode className="w-[min(48vh,80vw)]" />
          <p className="text-stage-label uppercase tracking-[0.3em] text-tree-red-soft">Scan to order on WhatsApp</p>
          <p className="font-mono text-stage-body text-clean-white">{displayLink}</p>
        </motion.div>
      </motion.div>
    </Slide>
  );
}
