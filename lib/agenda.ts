import { event, type AgendaItem } from "@/data/presentationData";

// Programme times are Juba wall-clock "HH:MM" on the event day.
const EVENT_DAY = event.startsAt.slice(0, 10);
const EVENT_OFFSET = event.startsAt.slice(19);

/** Absolute timestamp for a programme time, correct whatever the laptop's timezone. */
export const agendaTime = (hhmm: string) => new Date(`${EVENT_DAY}T${hhmm}:00${EVENT_OFFSET}`).getTime();

/** "14:20" → "2:20" (the programme runs within one afternoon). */
export function clockLabel(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}`;
}

export const durationMinutes = (item: AgendaItem) => (agendaTime(item.end) - agendaTime(item.start)) / 60_000;

/** Index of the item running at `now`, or -1 before, between and after. */
export function activeAgendaIndex(items: AgendaItem[], now: number | null) {
  if (now === null) return -1;
  return items.findIndex((item) => now >= agendaTime(item.start) && now < agendaTime(item.end));
}
