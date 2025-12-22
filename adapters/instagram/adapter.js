/**
 * NEO — Instagram Adapter (Stub)
 * © 2025 Luciana Fisher. All rights reserved.
 *
 * This adapter defines the Instagram DOM boundary for NEO.
 * It is intentionally incomplete: selector stability work
 * will be introduced incrementally.
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
  name: "IGAdapter",
  version: "1.0.0",
  adapterHash: "TBD", // CI injects later
};

export function createInstagramAdapter() {
  class IG extends BaseStubAdapter {
    findRootOrNull() {
      const selectors = ["[data-neo-ig-root]"]; // placeholder on purpose

      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          return { root: el, selectorsTried: selectors };
        }
      }

      return { root: null, selectorsTried: selectors };
    }
  }

  return new IG("ig", INFO, { debounceMs: 350 });
}
