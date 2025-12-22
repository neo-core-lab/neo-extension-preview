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
  version: "1.0.0",
  adapterHash: "TBD",
};

export function adapter() {
  class YT extends BaseStubAdapter {
    findRootOrNull() {
      const selectors = ["[data-neo-yt-root]"]; // placeholder on purpose
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) return { root: el, selectorsTried: selectors };
      }
      return { root: null, selectorsTried: selectors };
    }
  }

  return new YT("yt", INFO, { debounceMs: 300 });
}
