/**
 * NEO — Adapter Router
 * © 2025 Luciana Fisher. All rights reserved.
 *
 * Central adapter selection logic.
 * Core may call this function, but core never touches platform DOM.
 *
 * By contributing to this file, contributors acknowledge that their
 * contributions are made for inclusion in the NEO system and grant
 * Luciana Fisher a perpetual, worldwide, irrevocable right to use,
 * modify, sublicense, and distribute those contributions as part of NEO.
 *
 * Use, modification, or contribution to this file is subject to
 * the governing terms outlined in the repository documentation,
 * including CONTRIBUTING.md and applicable project charters.
 */

import { adapter as instagram } from "./instagram/adapter.js";
import { adapter as x } from "./x/adapter.js";
import { adapter as youtube } from "./youtube/adapter.js";

/**
 * Select and instantiate the appropriate adapter for the current page.
 * Returns null if the platform is unsupported.
 *
 * @param {string=} url
 * @returns {ReturnType<typeof instagram>|ReturnType<typeof x>|ReturnType<typeof youtube>|null}
 */
export function pickAdapter(url = location.href) {
  const { hostname } = new URL(url);

  if (hostname === "www.instagram.com" || hostname.endsWith(".instagram.com")) {
    return instagram();
  }

  if (
    hostname === "x.com" ||
    hostname.endsWith(".x.com") ||
    hostname === "twitter.com" ||
    hostname.endsWith(".twitter.com")
  ) {
    return x();
  }

  if (
    hostname === "www.youtube.com" ||
    hostname.endsWith(".youtube.com") ||
    hostname === "youtu.be"
  ) {
    return youtube();
  }

  return null;
}

/**
 * Explicit adapter registry.
 * Useful for tests, diagnostics, or future tooling.
 */
export const adapters = {
  instagram,
  x,
  youtube,
};
