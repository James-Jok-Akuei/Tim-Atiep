import { PresentationContainer, type StageSlide } from "@/components/stage/PresentationContainer";
import { AuthorBooksSlide } from "@/components/stage/slides/AuthorBooksSlide";
import { AuthorJourneySlide } from "@/components/stage/slides/AuthorJourneySlide";
import { AuthorSlide } from "@/components/stage/slides/AuthorSlide";
import { GallerySlide } from "@/components/stage/slides/GallerySlide";
import { InvitationSlide } from "@/components/stage/slides/InvitationSlide";
import { PoetrySlide } from "@/components/stage/slides/PoetrySlide";
import { PurchaseQRSlide } from "@/components/stage/slides/PurchaseQRSlide";
import { QuoteSlide } from "@/components/stage/slides/QuoteSlide";
import { SpeakerSlide } from "@/components/stage/slides/SpeakerSlide";
import { WelcomeSlide } from "@/components/stage/slides/WelcomeSlide";
import {
  author,
  authorBooks,
  endorsement,
  foreword,
  gallery,
  milestones,
  poems,
  speakers,
} from "@/data/presentationData";
import { formatEventDate, formatEventTime } from "@/lib/format";

const slides: StageSlide[] = [
  {
    id: "welcome",
    title: "Welcome",
    showcaseReader: true,
    content: <WelcomeSlide dateLabel={formatEventDate()} timeLabel={formatEventTime()} />,
  },
  {
    id: "invitation",
    title: "The Invitation",
    content: <InvitationSlide speakers={speakers} dateLabel={formatEventDate()} timeLabel={formatEventTime()} />,
  },
  { id: "author", title: "About the Author", content: <AuthorSlide author={author} /> },
  { id: "journey", title: "The Journey", content: <AuthorJourneySlide milestones={milestones} /> },
  { id: "speakers", title: "Speakers", content: <SpeakerSlide speakers={speakers} /> },
  { id: "praise", title: "Praise · PLO Lumumba", content: <QuoteSlide quote={endorsement} /> },
  { id: "foreword", title: "Foreword · Moses Makuei", content: <QuoteSlide quote={foreword.excerpt} /> },
  { id: "poems", title: `Poems · ${poems.length} excerpts`, content: <PoetrySlide poems={poems} /> },
  { id: "books", title: "Books by the Author", content: <AuthorBooksSlide authorName={author.name} books={authorBooks} /> },
  { id: "gallery", title: "Gallery", content: <GallerySlide images={gallery} /> },
  { id: "order", title: "Get Your Copy", content: <PurchaseQRSlide />, showcaseReader: true },
];

export default function Home() {
  return <PresentationContainer slides={slides} />;
}
