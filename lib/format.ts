import { event } from "@/data/presentationData";

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const formatSsp = (amount: number) => `SSP ${amount.toLocaleString("en-US")}`;

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => word && !word.endsWith("."))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/** e.g. "Saturday 12 September 2026" in Juba time. Call on the server and pass down. */
export function formatEventDate() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: event.timezone,
  }).format(new Date(event.startsAt));
}

/** e.g. "2:00 – 5:00 PM" in Juba time. Call on the server and pass down. */
export function formatEventTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: event.timezone,
  }).formatRange(new Date(event.startsAt), new Date(event.endsAt));
}
