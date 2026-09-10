import { NextResponse, userAgent, type NextRequest } from "next/server";

/**
 * Phones opening the root URL get the attendee guide. Tablets and laptops
 * keep the stage deck, and /stage always serves the deck regardless.
 */
export function proxy(request: NextRequest) {
  if (userAgent(request).device.type === "mobile") {
    return NextResponse.redirect(new URL("/mobile", request.url));
  }
}

export const config = {
  matcher: "/",
};
