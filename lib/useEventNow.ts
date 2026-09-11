"use client";

import { useSyncExternalStore } from "react";
import { agendaTime } from "./agenda";

const TICK_MS = 15_000;

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, TICK_MS);
  return () => clearInterval(id);
};

/**
 * Current time, refreshed every 15 seconds. For rehearsals, `?now=15:30` in the
 * address previews the programme as it will look at that time on event day.
 */
function readNow() {
  const override = new URLSearchParams(window.location.search).get("now");
  if (override && /^\d{1,2}:\d{2}$/.test(override)) return agendaTime(override.padStart(5, "0"));
  return Math.floor(Date.now() / TICK_MS) * TICK_MS;
}

/** `null` during server render; the live time once in the browser. */
export function useEventNow(): number | null {
  return useSyncExternalStore(subscribe, readNow, () => null);
}
