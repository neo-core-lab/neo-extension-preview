/**
 * NEO — Adapter Stability Guard
 * © 2025 Luciana Fisher. All rights reserved.
 *
 * Stability enforcement for adapters.
 * This guard exists to fail fast when platform DOM assumptions no longer hold.
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

import {} from "./types.js"; // keeps tooling aware of module boundary; no runtime deps

/**
 * @typedef {"ig"|"x"|"yt"} Platform
 */

/**
 * @typedef {Object} AdapterStabilityErrorPayload
 * @property {Platform} platform
 * @property {string} reason
 * @property {string=} code              // stable classifier, e.g. "ROOT_NOT_FOUND"
 * @property {string[]=} selectors       // selectors that failed (if any)
 * @property {string} adapterName
 * @property {string=} adapterVersion
 * @property {"warn"|"error"=} severity
 */

export class AdapterStabilityError extends Error {
  /**
   * @param {AdapterStabilityErrorPayload} payload
   */
  constructor(payload) {
    super(`[NEO][${payload.adapterName}] ${payload.reason}`);
    this.name = "AdapterStabilityError";
    this.payload = { severity: "error", ...payload };
  }
}

/**
 * Fail-fast guard: throw on any DOM assumption failure.
 * @param {AdapterStabilityErrorPayload} payload
 * @returns {never}
 */
export function adapterStabilityGuard(payload) {
  throw new AdapterStabilityError(payload);
}
