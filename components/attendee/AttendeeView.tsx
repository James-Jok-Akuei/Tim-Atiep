import { CalendarDays, Clock, MapPin, Maximize2, MessageCircle, MonitorPlay, Phone, Trophy } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ProgrammeList } from "@/components/attendee/ProgrammeList";
import { ScanPanel } from "@/components/attendee/ScanPanel";
import { AmbientParticles } from "@/components/stage/AmbientParticles";
import { AnimatedBook } from "@/components/ui/AnimatedBook";
import { BookCover } from "@/components/ui/BookCover";
import { FittedImage } from "@/components/ui/FittedImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MILESTONE_ICONS } from "@/components/ui/milestoneIcons";
import { Monogram } from "@/components/ui/Monogram";
import { PhotoFallback } from "@/components/ui/PhotoFallback";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { ShadeTree } from "@/components/ui/ShadeTree";
import { StageImage } from "@/components/ui/StageImage";
import {
  HONOURED_ROLES,
  SPEAKER_ROLE_LABEL,
  agenda,
  author,
  authorBooks,
  book,
  endorsement,
  event,
  foreword,
  gallery,
  invitation,
  milestones,
  poems,
  siteBuilder,
  speakers,
  type ForewordBlock,
} from "@/data/presentationData";
import { formatSsp } from "@/lib/format";

const SECTIONS = [
  { id: "invitation", label: "Invitation" },
  { id: "programme", label: "Programme" },
  { id: "speakers", label: "Speakers" },
  { id: "author", label: "The Author" },
  { id: "book", label: "The Book" },
  { id: "foreword", label: "Foreword" },
  { id: "journey", label: "Journey" },
  { id: "poems", label: "Poems" },
  { id: "books", label: "Books" },
  { id: "gallery", label: "Gallery" },
  { id: "order", label: "Order" },
];

const honoured = HONOURED_ROLES.flatMap((role) => speakers.filter((s) => s.role === role));

const primaryButton =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-tree-red px-5 py-3 font-semibold text-clean-white transition-colors hover:bg-tree-red-deep";
const secondaryButton =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-tree-red/40 px-5 py-3 font-medium text-clean-white transition-colors hover:border-tree-red hover:bg-tree-red/10";

type AttendeeViewProps = {
  dateLabel: string;
  timeLabel: string;
};

/** Scrollable one-page event guide for phones scanned in from the venue. */
export function AttendeeView({ dateLabel, timeLabel }: AttendeeViewProps) {
  return (
    <div className="attendee-view relative min-h-dvh pb-28 text-clean-white lg:pb-0">
      <div className="relative z-40 hidden border-b border-indigo-line bg-indigo-deep/60 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-2.5 text-sm">
          <p className="text-clean-white-muted">You&apos;re viewing the attendee guide, made for phones.</p>
          <Link href="/stage" className="inline-flex items-center gap-2 font-medium text-tree-red-soft transition-colors hover:text-clean-white">
            <MonitorPlay className="size-4" />
            Presenting? Open the stage presentation →
          </Link>
        </div>
      </div>
      <header className="relative isolate flex min-h-[calc(100svh-8rem)] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 text-center">
        <ShadeTree className="absolute inset-x-0 bottom-0 top-[8%]" />
        <AmbientParticles />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
        <div className="flex flex-col items-center gap-4 lg:items-start lg:text-left">
          <Eyebrow>
            {event.name}
            {event.host && ` · Hosted by ${event.host}`}
          </Eyebrow>
          <h1 className="font-display text-[clamp(3.5rem,17vw,7rem)] font-bold leading-none tracking-tight text-cover-title">
            {book.title}
          </h1>
          <p className="font-display text-3xl italic text-clean-white sm:text-4xl">{book.subtitle}</p>
          <p className="text-lg text-clean-white-muted">
            A poetry collection by <span className="text-clean-white">{book.author}</span>
          </p>

          <ul className="mt-4 flex flex-col items-center gap-2 text-clean-white-muted lg:items-start">
            <IconLine icon={<CalendarDays />}>{dateLabel}</IconLine>
            <IconLine icon={<Clock />}>{timeLabel}</IconLine>
            <IconLine icon={<MapPin />}>{event.venue}</IconLine>
          </ul>

          <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
            <a href={book.purchaseLink} target="_blank" rel="noopener noreferrer" className={primaryButton}>
              <MessageCircle className="size-5" />
              Order your copy
            </a>
            <a href="#speakers" className={secondaryButton}>
              Meet the speakers
            </a>
          </div>
        </div>
        <AnimatedBook eager className="hidden w-64 lg:block xl:w-72" />
        </div>
      </header>

      <nav aria-label="Sections" className="sticky top-0 z-30 border-y border-indigo-line bg-indigo-base/95">
        <ul className="mx-auto flex max-w-2xl gap-1 overflow-x-auto px-4 py-2 lg:max-w-6xl lg:px-8 [scrollbar-width:none]">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm text-clean-white-muted transition-colors hover:bg-indigo-raised hover:text-clean-white"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="invitation" aria-labelledby="invitation-title" className="scroll-mt-16 border-b border-indigo-line bg-indigo-raised/60">
        <div className="mx-auto grid max-w-2xl items-center gap-8 px-5 py-10 sm:px-8 lg:max-w-6xl lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-12 lg:py-14">
          <a
            href={invitation.image}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the invitation full size"
            className="group relative block overflow-hidden rounded-2xl border border-tree-red/30 shadow-2xl"
          >
            <StageImage
              src={invitation.image}
              alt={invitation.alt}
              width={invitation.width}
              height={invitation.height}
              sizes="(min-width: 1024px) 416px, 90vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              fallback={null}
            />
            {/* Small corner icon: stays clear of the flyer's headline, names and author plate. */}
            <span aria-hidden className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-indigo-base/85 text-clean-white">
              <Maximize2 className="size-4" />
            </span>
          </a>
          <div className="flex flex-col gap-4">
            <Eyebrow>The Invitation</Eyebrow>
            <h2 id="invitation-title" className="text-balance font-display text-4xl font-semibold leading-tight text-clean-white">
              Join us under the <span className="italic text-red-gradient">Tree of Shade</span>
            </h2>
            <ul className="flex flex-col gap-2 text-clean-white-muted">
              <IconLine icon={<CalendarDays />}>
                {dateLabel} · {timeLabel}
              </IconLine>
              <IconLine icon={<MapPin />}>{event.venue}</IconLine>
            </ul>
            <ul className="mt-2 flex flex-col gap-3 border-l-2 border-tree-red/50 pl-4">
              {honoured.map((s) => (
                <li key={s.id}>
                  <p className="text-xs uppercase tracking-[0.2em] text-tree-red-soft">{SPEAKER_ROLE_LABEL[s.role]}</p>
                  <p className="font-display text-xl text-clean-white">{s.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-2xl px-5 py-14 sm:px-8 lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-12">
        <div className="flex min-w-0 flex-col gap-20">
        <Section id="programme" eyebrow="Programme" title="Order of the day">
          <ProgrammeList items={agenda} />
        </Section>

        <Section id="speakers" eyebrow="Trees of Shade" title="Today's speakers">
          <ol className="flex flex-col gap-4">
            {speakers.map((s) => (
              <li key={s.id}>
                <article className="flex gap-4 rounded-2xl border border-indigo-line bg-indigo-raised/60 p-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-tree-red/30 bg-indigo-raised sm:size-24">
                    {s.avatar ? (
                      <StageImage
                        src={s.avatar}
                        alt={s.avatarFit === "contain" ? `${s.name} logo` : `Portrait of ${s.name}`}
                        fill
                        sizes="96px"
                        className={s.avatarFit === "contain" ? "bg-clean-white object-contain p-[6%]" : "object-cover"}
                        style={{ objectPosition: s.avatarPosition }}
                        fallback={<Monogram name={s.name} className="text-3xl" />}
                      />
                    ) : (
                      <Monogram name={s.name} className="text-3xl" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-tree-red-soft">{SPEAKER_ROLE_LABEL[s.role]}</p>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-clean-white">{s.name}</h3>
                    {(s.title || s.affiliation) && (
                      <p className="text-sm text-clean-white-muted">{[s.title, s.affiliation].filter(Boolean).join(" · ")}</p>
                    )}
                    {s.bio && <p className="mt-2 text-sm leading-relaxed text-clean-white-muted">{s.bio}</p>}
                    {s.speechTopic && (
                      <p className="mt-2 font-display text-lg italic leading-snug text-tree-red-soft">{s.speechTopic}</p>
                    )}
                    {s.tribute && <p className="mt-1 text-sm leading-relaxed text-clean-white-muted">{s.tribute}</p>}
                    {s.isPlaceholder && <PlaceholderBadge className="mt-2 text-[0.65rem]" />}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="author" eyebrow="About the Author" title={author.name}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative aspect-[4/5] w-44 shrink-0 self-center overflow-hidden rounded-2xl border border-tree-red/30 bg-indigo-raised sm:w-48 sm:self-start">
              <StageImage
                src={author.portrait}
                alt={author.portraitAlt}
                fill
                sizes="192px"
                className="object-cover"
                style={{ objectPosition: author.portraitPosition }}
                fallback={<Monogram name={author.name} className="text-5xl" />}
              />
            </div>
            <div className="flex flex-col gap-4">
              {author.bio.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-clean-white-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <ul className="mt-6 flex flex-col gap-3">
            {author.honours.map((h) => (
              <li key={h.title} className="flex items-start gap-3 rounded-xl border border-indigo-line bg-indigo-raised/60 px-4 py-3">
                <Trophy className="mt-0.5 size-5 shrink-0 text-tree-red-soft" />
                <p>
                  <span className="mr-2 font-mono text-sm text-tree-red-soft">{h.year}</span>
                  <span className="font-medium text-clean-white">{h.title}</span>
                  {h.by && <span className="block text-sm text-clean-white-muted">{h.by}</span>}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-clean-white-faint">
            <span className="mr-2 uppercase tracking-[0.2em] text-tree-red-soft">Featured in</span>
            {author.featuredIn.join(" · ")}
          </p>
        </Section>

        <Section id="book" eyebrow="The Book" title={book.fullTitle}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <BookCover className="w-36 shrink-0 self-center sm:w-44 sm:self-start" />
            <div className="flex flex-col gap-4">
              <p className="font-display text-lg italic leading-snug text-clean-white">&ldquo;{book.tagline}&rdquo;</p>
              <p className="leading-relaxed text-clean-white-muted">{book.description}</p>
              <ul className="flex flex-wrap gap-2">
                {book.themes.map((theme) => (
                  <li key={theme} className="rounded-full border border-tree-red/30 px-3 py-1 text-sm text-tree-red-soft">
                    {theme}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-clean-white-faint">Published by {book.publisher}</p>
            </div>
          </div>
        </Section>

        <Section id="foreword" eyebrow="Words on the Book" title="Praise & foreword">
          <figure className="rounded-2xl border border-tree-red/30 bg-indigo-raised/60 p-6">
            <blockquote className="flex flex-col gap-3">
              {endorsement.lead && <p className="leading-relaxed text-clean-white-muted">{endorsement.lead}</p>}
              <p className="font-display text-xl italic leading-snug text-clean-white">&ldquo;{endorsement.highlight}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold text-clean-white">— {endorsement.author}</span>
              <span className="block text-clean-white-muted">{endorsement.role}</span>
            </figcaption>
          </figure>

          <article className="mt-8 flex flex-col gap-4">
            <h3 className="font-display text-2xl font-semibold text-clean-white">Foreword</h3>
            <ForewordBlocks blocks={foreword.blocks.slice(0, 1)} />
            <details className="group">
              <summary className="cursor-pointer list-none font-medium text-tree-red-soft [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Read the full foreword →</span>
                <span className="hidden group-open:inline">Show less</span>
              </summary>
              <div className="mt-4 flex flex-col gap-4">
                <ForewordBlocks blocks={foreword.blocks.slice(1)} />
              </div>
            </details>
            <p className="text-sm text-clean-white-muted">
              <span className="font-semibold text-clean-white">{foreword.author}</span> · {foreword.role}
            </p>
          </article>
        </Section>

        <Section id="journey" eyebrow="The Journey of Becoming" title="From the shade of a tree to the page">
          <ol className="ml-5 flex flex-col gap-8 border-l border-tree-red/30 pl-8">
            {milestones.map((m, i) => {
              const Icon = MILESTONE_ICONS[m.icon];
              const isNow = i === milestones.length - 1;
              return (
                <li key={m.id} className="relative">
                  <span
                    className={`absolute -left-[3.25rem] top-0 grid size-10 place-items-center rounded-full border ${
                      isNow ? "border-tree-red bg-tree-red text-clean-white" : "border-tree-red/50 bg-indigo-raised text-tree-red-soft"
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <p className="text-xs uppercase tracking-[0.2em] text-clean-white-faint">
                    {m.period ? `${m.period} · ` : ""}
                    {m.place}
                  </p>
                  <h3 className={`mt-1 font-display text-2xl font-semibold ${isNow ? "text-tree-red-soft" : "text-clean-white"}`}>
                    {m.title}
                  </h3>
                  <p className="mt-1 leading-relaxed text-clean-white-muted">{m.description}</p>
                </li>
              );
            })}
          </ol>
        </Section>

        <Section id="poems" eyebrow="From the collection" title="Poems">
          <div className="grid gap-4 lg:grid-cols-2">
            {poems.map((poem) => (
              <figure key={poem.id} className="rounded-2xl border border-indigo-line bg-indigo-raised/60 p-6">
                <figcaption className="font-display text-3xl font-semibold text-cover-title">{poem.title}</figcaption>
                <div className="mt-4 flex flex-col gap-4 font-display text-xl italic leading-snug text-clean-white">
                  {poem.stanzas.map((stanza, i) => (
                    <p key={i}>
                      {stanza.map((line, j) => (
                        <span key={j} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
                {poem.isPlaceholder && (
                  <PlaceholderBadge className="mt-5 text-[0.65rem]">Sample text — not from the book</PlaceholderBadge>
                )}
              </figure>
            ))}
          </div>
        </Section>

        <Section id="books" eyebrow="The Collection" title={`Books by ${author.name}`}>
          <div className="grid gap-4 sm:grid-cols-3">
            {authorBooks.map((b) => (
              <figure key={b.id} className="overflow-hidden rounded-2xl border border-indigo-line bg-indigo-raised/60">
                <div className="relative aspect-[4/5]">
                  <FittedImage
                    src={b.image}
                    alt={b.imageAlt}
                    sizes="(min-width: 640px) 260px, 90vw"
                    className="size-full"
                    fallback={<PhotoFallback src={b.image} showPath={false} />}
                  />
                  {b.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-tree-red px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-clean-white">
                      {b.badge}
                    </span>
                  )}
                </div>
                <figcaption className="p-4">
                  <p className="font-display text-xl font-semibold leading-tight text-clean-white">{b.title}</p>
                  {b.subtitle && <p className="mt-1 text-sm italic text-clean-white-muted">{b.subtitle}</p>}
                  {b.tagline && <p className="mt-2 text-sm text-clean-white-faint">{b.tagline}</p>}
                  {b.photos && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {b.photos.map((src) => (
                        <div key={src} className="relative aspect-square overflow-hidden rounded-lg border border-indigo-line">
                          <StageImage src={src} alt={`${b.title} — photo`} fill sizes="130px" className="object-cover" fallback={null} />
                        </div>
                      ))}
                    </div>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="gallery" eyebrow="Gallery" title="Moments along the way">
          <div className="-mx-5 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:block lg:columns-3 lg:gap-4 lg:overflow-visible lg:px-0">
            {gallery.map((img) => (
              <figure key={img.id} className="w-[80%] shrink-0 snap-center sm:w-[70%] lg:mb-4 lg:w-auto lg:break-inside-avoid">
                <div className="overflow-hidden rounded-2xl border border-indigo-line bg-indigo-raised">
                  {/* Natural shape: the whole photo, no cropping. */}
                  <StageImage
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 450px, 80vw"
                    className="h-auto w-full"
                    fallback={
                      <div className="aspect-[4/5]">
                        <PhotoFallback src={img.src} showPath={false} />
                      </div>
                    }
                  />
                </div>
                <figcaption className="mt-2 text-sm text-clean-white-muted">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="order" eyebrow="Get your copy" title="Take the shade home">
          <div className="flex flex-col gap-6 rounded-3xl border border-tree-red/30 bg-indigo-raised/60 p-6">
            <p className="font-display text-6xl font-semibold leading-none text-red-gradient">
              ${book.price.usd}
              <span className="mt-2 block font-sans text-xl font-normal text-clean-white-muted">
                {formatSsp(book.price.ssp)}
              </span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={book.purchaseLink} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                <MessageCircle className="size-5" />
                Order on WhatsApp
              </a>
              <a href={`tel:${book.stockist.phone}`} className={secondaryButton}>
                <Phone className="size-5" />
                {book.stockist.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-3 text-clean-white-muted">
              <MapPin className="mt-0.5 size-5 shrink-0 text-tree-red-soft" />
              <p>
                <span className="block font-medium text-clean-white">{book.stockist.name}</span>
                {book.stockist.location}
              </p>
            </div>
          </div>
        </Section>
        </div>

        <aside className="sticky top-20 hidden lg:block">
          <ScanPanel />
        </aside>
      </main>

      <footer className="border-t border-indigo-line px-5 py-10 text-center text-sm text-clean-white-faint">
        <p className="font-display text-xl text-clean-white">
          {book.title} · <span className="italic">{book.subtitle}</span>
        </p>
        <p className="mt-1">
          {book.author} · Published by {book.publisher}
        </p>
        <Link href="/stage" className="mt-4 inline-flex items-center gap-2 text-clean-white-muted transition-colors hover:text-tree-red-soft">
          <MonitorPlay className="size-4" />
          Stage presentation
        </Link>
        <p className="mt-6 border-t border-indigo-line/60 pt-5 text-xs text-clean-white-faint">
          Website built by{" "}
          <a
            href={`mailto:${siteBuilder.email}`}
            className="font-medium text-clean-white-muted underline-offset-4 transition-colors hover:text-tree-red-soft hover:underline"
          >
            {siteBuilder.name}
          </a>{" "}
          · {siteBuilder.role}
          <span className="block">{siteBuilder.email}</span>
          <span className="mt-2 block">
            Need a website?{" "}
            <a
              href={siteBuilder.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-tree-red-soft underline-offset-4 transition-colors hover:text-clean-white hover:underline"
            >
              Book a consultation at sudo-portfolios.com
            </a>
          </span>
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-indigo-line bg-indigo-base/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-semibold leading-none text-red-gradient">${book.price.usd}</p>
            <p className="text-xs text-clean-white-muted">{formatSsp(book.price.ssp)}</p>
          </div>
          <a
            href={book.purchaseLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${primaryButton} py-2.5`}
          >
            <MessageCircle className="size-5" />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 text-balance font-display text-4xl font-semibold leading-tight text-clean-white">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ForewordBlocks({ blocks }: { blocks: ForewordBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        typeof block === "string" ? (
          <p key={i} className="leading-relaxed text-clean-white-muted">
            {block}
          </p>
        ) : (
          <blockquote
            key={i}
            className="border-l-2 border-tree-red/50 pl-4 font-display text-lg italic leading-snug text-clean-white"
          >
            {block.verse.map((line, j) => (
              <span key={j} className="block">
                {line}
              </span>
            ))}
          </blockquote>
        ),
      )}
    </>
  );
}

function IconLine({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 [&_svg]:size-4 [&_svg]:text-tree-red-soft">
      {icon}
      {children}
    </li>
  );
}
