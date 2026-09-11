"use client";

import { agendaLead, type AgendaItem } from "@/data/presentationData";
import { activeAgendaIndex, clockLabel, durationMinutes } from "@/lib/agenda";
import { useEventNow } from "@/lib/useEventNow";

/** The running order for phones; on the day, the current item is highlighted. */
export function ProgrammeList({ items }: { items: AgendaItem[] }) {
  const active = activeAgendaIndex(items, useEventNow());

  return (
    <ol className="divide-y divide-indigo-line overflow-hidden rounded-2xl border border-indigo-line bg-indigo-raised/60">
      {items.map((item, i) => {
        const isNow = i === active;
        return (
          <li
            key={item.start}
            aria-current={isNow ? "time" : undefined}
            className={`grid grid-cols-[4rem_1fr] gap-3 px-4 py-3 ${isNow ? "bg-tree-red/15" : ""}`}
          >
            <span className="pt-0.5 font-mono text-sm tabular-nums text-tree-red-soft">
              {clockLabel(item.start)}
              <span className="block text-xs text-clean-white-faint">{durationMinutes(item)} min</span>
            </span>
            <div className="min-w-0">
              <p className="font-medium text-clean-white">
                {item.title}
                {isNow && (
                  <span className="ml-2 rounded-full bg-tree-red px-2 py-0.5 align-middle text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-clean-white">
                    Now
                  </span>
                )}
              </p>
              <p className="text-sm text-clean-white-muted">{agendaLead(item)}</p>
              {item.detail && <p className="mt-1 text-sm italic text-clean-white-faint">{item.detail}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
