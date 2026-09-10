import type { Metadata } from "next";
import { AttendeeView } from "@/components/attendee/AttendeeView";
import { formatEventDate, formatEventTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "TIM ATIEP — Event Guide",
  description:
    "Speakers, poems, and how to order TIM ATIEP (The Tree of Shade) by Adut Loi Akok — launch at Unipod Hall, University of Juba.",
};

export default function AttendeePage() {
  return <AttendeeView dateLabel={formatEventDate()} timeLabel={formatEventTime()} />;
}
