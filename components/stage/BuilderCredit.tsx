import { siteBuilder } from "@/data/presentationData";

/**
 * Standing credit in the stage's bottom-left corner, shown on every slide.
 * Quiet enough not to compete with the programme; capped in width so it never
 * reaches the centred control bar. Below 1280px wide it drops the role and
 * email so it stays two lines and clear of slide content.
 */
export function BuilderCredit() {
  const site = siteBuilder.website.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      data-builder-credit
      className="fixed bottom-[2.2vh] left-[2vw] z-30 hidden max-w-[calc(50vw-14rem)] text-[0.95rem] leading-snug text-clean-white-faint md:block"
    >
      <p className="whitespace-nowrap">
        Website by{" "}
        <a href={`mailto:${siteBuilder.email}`} className="font-semibold text-clean-white-muted hover:text-clean-white">
          {siteBuilder.name}
        </a>
        <span className="hidden xl:inline"> · {siteBuilder.role}</span>
      </p>
      <p className="whitespace-nowrap">
        <span className="hidden xl:inline">{siteBuilder.email} · </span>
        <a
          href={siteBuilder.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tree-red-soft hover:text-clean-white"
        >
          {site}
        </a>
      </p>
    </div>
  );
}
