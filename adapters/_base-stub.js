/**
 * NEO — Base Adapter Stub
 * © 2025 Luciana Fisher. All rights reserved.
 *
 * Adapters are the only code allowed to query platform DOM.
 * This stub enforces stability boundaries and emits minimal packets.
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

import { adapterStabilityGuard } from "../core/adapter-stability-guard.js";
import { debounce, pageTypeFor, userLoggedInGuess } from "../core/utils.js";

/**
 * Base adapter stub:
 * - Adapters are the only code allowed to query DOM.
 * - Fail-fast: throws AdapterStabilityError if root is missing.
 * - Emits empty packets until comment extraction is implemented.
 * - Zero-log: no console logging.
 */
export class BaseStubAdapter {
  /**
   * @param {"ig"|"x"|"yt"} platform
   * @param {{name:string, version:string, adapterHash:string}} info
   * @param {{debounceMs?:number}=} opts
   */
  constructor(platform, info, opts) {
    this.platform = platform;
    this.info = info;
    this.opts = opts || {};

    /** @type {null | ((pkt:any)=>void)} */
    this.cb = null;

    /** @type {MutationObserver|null} */
    this.obs = null;

    /** @type {boolean} */
    this.running = false;
  }

  async init() {
    return;
  }

  /**
   * Start watching. Safe to call once; subsequent calls re-start cleanly.
   * @param {(pkt:any)=>void} callback
   */
  watch(callback) {
    if (this.running) this.stop();
    this.running = true;

    this.cb = callback;
    const run = debounce(() => this._scanOrThrowAndEmit(), this.opts.debounceMs ?? 350);

    // initial pass
    this._scanOrThrowAndEmit();

    // observe DOM drift
    this.obs = new MutationObserver((muts) => {
      if (!this.running) return;

      let meaningful = false;
      for (const m of muts) {
        if (m.type === "childList" && (m.addedNodes.length || m.removedNodes.length)) {
          meaningful = true;
          break;
        }
      }
      if (meaningful) run();
    });

    this.obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  stop() {
    this.running = false;
    if (this.obs) this.obs.disconnect();
    this.obs = null;
    this.cb = null;
  }

  /**
   * Adapter signals only; veil/engine decides how to restore.
   * @param {string} id
   */
  restoreOriginal(id) {
    document.dispatchEvent(
      new CustomEvent("neo:restore", { detail: { id, platform: this.platform } })
    );
  }

  getInfo() {
    return this.info;
  }

  _emitEmpty() {
    if (!this.cb) return;

    this.cb({
      comments: [],
      meta: {
        url: location.href,
        platform: this.platform,
        pageType: pageTypeFor(this.platform),
        userLoggedIn: userLoggedInGuess(),
      },
      adapterInfo: this.info,
    });
  }

  _scanOrThrowAndEmit() {
    const { root, selectorsTried } = this.findRootOrNull();

    if (!root) {
      adapterStabilityGuard({
        platform: this.platform,
        reason: "Root comment container not found",
        code: "ROOT_NOT_FOUND",
        selectors: selectorsTried,
        adapterName: this.info.name,
        adapterVersion: this.info.version,
        severity: "error",
      });
    }

    // Stub behavior for now
    this._emitEmpty();
  }

  /**
   * Must be overridden by platform adapters.
   * Return only what the guard needs (no extra identity strings).
   *
   * @returns {{root:Element|null, selectorsTried:string[]}}
   */
  findRootOrNull() {
    throw new Error("findRootOrNull() not implemented");
  }
}
