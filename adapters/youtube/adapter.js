/**
 * NEO — YouTube Adapter (Stub)
 * © 2025 Luciana Fisher. All rights reserved.
 *
 * This adapter is intentionally incomplete.
 * Selectors will be introduced incrementally during stability work.
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

import { BaseStubAdapter } from "../_base-stub.js";

const INFO = {
  name: "youtube-adapter",
  version: "1.0.1",
  adapterHash: "TBD",
};

function isWatchContext() {
  const p = location.pathname || "";
  const urlLooksWatch = p === "/watch" || p.startsWith("/watch");
  const hasWatchShell = !!document.querySelector("ytd-watch-flexy");
  return urlLooksWatch || hasWatchShell;
}

/**
 * Verification: prevents false positives (sidebar / related / shorts / experiments).
 * We accept only elements that:
 * - live inside ytd-watch-flexy
 * - AND are the ytd-comments module OR contain comment thread renderers
 */
function verifyCommentsRoot(el) {
  if (!el) return false;

  // Must be inside main watch shell
  if (!el.closest("ytd-watch-flexy")) return false;

  // Strong structural signals
  const isCommentsModule =
    typeof el.matches === "function" && el.matches("ytd-comments#comments");

  const containsCommentsModule = !!el.querySelector("ytd-comments#comments");
  const containsThreads = !!el.querySelector("ytd-comment-thread-renderer");

  // Accept ytd-comments module even before threads load (async), but do NOT accept
  // generic containers unless threads exist.
  if (isCommentsModule) return true;
  if (containsCommentsModule) return true;
  if (containsThreads) return true;

  return false;
}

export function adapter() {
  class YT extends BaseStubAdapter {
    findRootOrNull() {
      // Guard: if we’re not in a watch-like context, fail-open (do nothing).
      if (!isWatchContext()) {
        return { root: null, selectorsTried: ["GUARD:not_watch_context"] };
      }

      const selectorsTried = [];

      // Best-first candidates (anchor-based)
      const selectors = [
        "ytd-comments#comments",          // most stable
        "#comments ytd-comments",         // common wrapper variant
        "#comments",                      // fallback wrapper
        "ytd-comments#comments #sections",
        "#comments #sections",
      ];

      for (const sel of selectors) {
        selectorsTried.push(sel);
        const el = document.querySelector(sel);
        if (el && verifyCommentsRoot(el)) {
          return { root: el, selectorsTried };
        }
      }

      // Fallback path: search within watch shell (independent discovery route)
      selectorsTried.push("FALLBACK:watch_shell_query");
      const shell = document.querySelector("ytd-watch-flexy");
      if (shell) {
        const el =
          shell.querySelector("ytd-comments#comments") ||
          shell.querySelector("ytd-comments");

        if (el && verifyCommentsRoot(el)) {
          return { root: el, selectorsTried };
        }
      }

      return { root: null, selectorsTried };
    }
  }
  return new YT("yt", INFO, { debounceMs: 300 });
}
