/**
 * NEO — Core Utilities
 * © 2025 Luciana Fisher. All rights reserved.
 *
 * Pure utility helpers used by NEO Core and adapters.
 * No logging, no network, no storage.
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

/**
 * Debounce a function without leaking timers.
 *
 * @template {(...args:any[]) => any} T
 * @param {T} fn
 * @param {number} ms
 * @returns {T}
 */
export function debounce(fn, ms) {
  let t;
  return /** @type {T} */ (function (...args) {
    if (t !== undefined) window.clearTimeout(t);
    t = window.setTimeout(() => fn.apply(this, args), ms);
  });
}

/**
 * Infer page type from platform + location.
 * Best-effort only; adapters must still validate DOM assumptions.
 *
 * @param {"ig"|"x"|"yt"} p
 * @returns {"feed"|"post"|"replies"|"live"}
 */
export function pageTypeFor(p) {
  const path = location.pathname || "";

  if (p === "yt") {
    if (path.startsWith("/watch") || path.startsWith("/shorts")) return "post";
    if (path.startsWith("/live")) return "live";
    return "feed";
  }

  if (p === "ig") {
    if (/^\/(p|reel|tv)\//.test(path)) return "post";
    return "feed";
  }

  // X / Twitter
  if (/\/status\/\d+/.test(path)) return "replies";
  return "feed";
}

/**
 * Best-effort heuristic for login state.
 * Must never be relied on for security or persistence decisions.
 * Zero-log, zero-network.
 *
 * @returns {boolean}
 */
export function userLoggedInGuess() {
  const text = (document.body?.innerText || "").toLowerCase();
  if (text.includes("log in") || text.includes("sign up")) return false;
  return true;
}
