/**
 * NEO — Core Types
 * © 2025 Luciana Fisher. All rights reserved.
 *
 * This file defines canonical type contracts for the NEO system.
 * It is part of the NEO Core architecture and establishes adapter
 * boundaries, data shapes, and lifecycle expectations.
 *
 * By contributing to this file, contributors acknowledge that their
 * contributions are made for inclusion in the NEO system and grant
 * Luciana Fisher a perpetual, worldwide, irrevocable right to use,
 * modify, sublicense, and distribute those contributions as part of NEO.
 *
 * Use, modification, or contribution to this file is subject to
 * the governing terms outlined in the NEO repository documentation,
 * including CONTRIBUTING.md and applicable project charters.
 *
 * No execution logic belongs in this file.
 * Contracts only.
 */

/**
 * core/types.js
 * Contracts only. No behavior. No imports.
 */

/**
 * @typedef {"ig"|"x"|"yt"} Platform
 * @typedef {"feed"|"post"|"replies"|"live"} PageType
 */

/**
 * @typedef {Object} AdapterInfo
 * @property {string} name
 * @property {string} version
 * @property {string} adapterHash  // CI may inject SHA-256 (optional in local dev)
 */

/**
 * @typedef {Object} PageMeta
 * @property {string} url
 * @property {Platform} platform
 * @property {PageType} pageType
 * @property {boolean} userLoggedIn
 */

/**
 * Adapter-local comment representation.
 * NOTE: DOM nodes must never be serialized, forwarded, or logged outside adapter boundary.
 *
 * @typedef {Object} CommentNode
 * @property {string} id
 * @property {string} text
 * @property {string} author
 * @property {number} timestamp  // epoch ms when available; otherwise NaN
 * @property {string|null} parentId
 * @property {Element} node      // adapter-local only; never crosses boundary
 * @property {Platform} platform
 * @property {string} lang
 */

/**
 * AdapterPacket is a structured payload emitted by an adapter.
 * IMPORTANT: contains adapter-local DOM nodes; must not be serialized or transported.
 *
 * @typedef {Object} AdapterPacket
 * @property {CommentNode[]} comments
 * @property {PageMeta} meta
 * @property {AdapterInfo} adapterInfo
 */

/**
 * The minimal functional interface an adapter must implement.
 *
 * @typedef {Object} FunctionalAdapter
 * @property {() => Promise<void>} init
 * @property {(callback: (pkt: AdapterPacket) => void) => void} watch
 * @property {() => void} stop
 * @property {(id: string) => void} restoreOriginal // id refers to CommentNode.id
 * @property {() => AdapterInfo} getInfo
 */

export {}; // keeps this file a module
