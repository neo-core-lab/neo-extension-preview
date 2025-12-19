/**
 * NEO — Nervous-system–first browsing
 * ----------------------------------
 * Creator & Architect: Luciana Fisher
 *
 * This file powers the core veiling and reveal logic for NEO.
 * It is intentionally designed to:
 *   • Protect the user’s nervous system
 *   • Run entirely on-device
 *   • Avoid data collection, logging, or tracking
 *   • Give control back to the user over when content is revealed
 *
 * IMPORTANT DESIGN NOTES:
 * -----------------------
 * • YouTube veiling logic is STABLE and MUST NOT be modified.
 * • Instagram veiling logic is carefully scoped to comment threads only.
 * • Core fallback text exists as a safety net when packs are unavailable.
 * • Language layers (e.g. PT-BR) are content-only and do not affect logic.
 *
 * This is not engagement software.
 * This is not behavior modification.
 * This is infrastructure for calm.
 *
 * © 2025 Luciana Fisher — NEO - All rights reserved.
 * Shared for demonstration and evaluation purposes.
 */

(() => {
    const DEFAULTS = {
        enableAutomationBadge: true,
        autoTag: "#auto",
        rescanMs: 900,
        activePack: "core"
    };

    let SETTINGS = { ...DEFAULTS };

    // Hover-capable desktop?
    const IS_HOVER_DEVICE =
        !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);

    const PACK_CACHE = Object.create(null);
    const normSpaces = (s) => (s || "").replace(/\s+/g, " ").trim();

    // ---------- Packs (case-tolerant filenames; ignores index) ----------
    async function fetchPackJson(packName) {
        const candidates = [
            `packs/${packName}.json`,
            `packs/${packName}.JSON`,
            `packs/${packName.toLowerCase()}.json`,
            `packs/${packName.toUpperCase()}.JSON`
        ];
        for (const rel of candidates) {
            try {
                const res = await fetch(chrome.runtime.getURL(rel));
                if (res.ok) return await res.json();
            } catch { }
        }
        return null;
    }

    async function loadPack(packName, depth = 0) {
        if (!packName) return [];
        if (depth > 4) return [];
        if (packName === "index") return [];
        if (PACK_CACHE[packName]) return PACK_CACHE[packName];

        const data = await fetchPackJson(packName);
        if (!data) {
            PACK_CACHE[packName] = [];
            return [];
        }

        // meta-pack
        if (data && Array.isArray(data.packs)) {
            let merged = [];
            for (const child of data.packs) {
                const childEntries = await loadPack(child, depth + 1);
                if (childEntries.length) merged = merged.concat(childEntries);
            }
            PACK_CACHE[packName] = merged;
            return merged;
        }

        const raw = Array.isArray(data) ? data : (Array.isArray(data.entries) ? data.entries : []);
        const entries = raw
            .map((e) => {
                if (typeof e === "string") return e.trim();
                if (e && typeof e.text === "string") return e.text.trim();
                return "";
            })
            .filter(Boolean);

        PACK_CACHE[packName] = entries;
        return entries;
    }

    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    async function pickVeilLine() {
        const names = (SETTINGS.activePack || "core")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .filter((n) => n !== "index");

        let merged = [];
        for (const n of names) {
            const list = await loadPack(n, 0);
            if (list.length) merged = merged.concat(list);
        }

        if (!merged.length && !names.includes("core")) {
            const core = await loadPack("core", 0);
            if (core.length) merged = merged.concat(core);
        }

        return merged.length ? pickRandom(merged) : "";
    }

    // ---------- Event target helpers (TEXT nodes, etc) ----------
    function asElement(node) {
        if (!node) return null;
        if (node.nodeType === Node.ELEMENT_NODE) return node;
        if (node.nodeType === Node.TEXT_NODE) return node.parentElement || null;
        return node.parentElement || null;
    }

    function maskedClosest(t) {
        const el = asElement(t);
        return el && el.closest ? el.closest("[data-neo-masked='1']") : null;
    }

    // ---------- Reveal / Veil ----------
    function showOriginal(el) {
        el.textContent = el.dataset.neoOriginal || "";
    }
    function showVeil(el) {
        el.textContent = el.dataset.neoVeil || "";
    }

    function bindPerNodeHandlers(el) {
        if (!el || el.dataset.neoBound === "1") return;
        el.dataset.neoBound = "1";

        // Hover reveal (desktop)
        el.addEventListener("pointerenter", () => {
            if (el.dataset.neoMasked === "1" && el.dataset.neoLocked !== "1") showOriginal(el);
        });

        el.addEventListener("pointerleave", () => {
            if (el.dataset.neoMasked === "1" && el.dataset.neoLocked !== "1") showVeil(el);
        });

        // Click toggle fallback (desktop) / Tap toggle (touch)
        el.addEventListener(
            "click",
            (ev) => {
                if (el.dataset.neoMasked !== "1") return;
                ev.preventDefault();
                ev.stopPropagation();

                // Touch: toggle revealed
                if (!IS_HOVER_DEVICE) {
                    const revealed = el.dataset.neoRevealed === "1";
                    if (revealed) {
                        el.dataset.neoRevealed = "0";
                        showVeil(el);
                    } else {
                        el.dataset.neoRevealed = "1";
                        showOriginal(el);
                    }
                    return;
                }

                // Desktop fallback: lock/unlock original on click
                const locked = el.dataset.neoLocked === "1";
                if (locked) {
                    el.dataset.neoLocked = "0";
                    showVeil(el);
                } else {
                    el.dataset.neoLocked = "1";
                    showOriginal(el);
                }
            },
            true
        );
    }

    function isUiJunkText(t) {
        const lower = (t || "").toLowerCase();
        if (!lower) return true;
        if (lower === "reply") return true;
        if (lower.startsWith("view replies")) return true;
        if (lower.startsWith("view all")) return true;
        if (lower === "add a comment..." || lower === "add a comment…") return true;
        if (lower.startsWith("liked by ")) return true;
        if (lower === "more" || lower === "show more" || lower === "show less") return true;
        return false;
    }

    async function veilNode(el) {
        if (!el || el.dataset.neoSeen === "1") return;

        const original = el.textContent || "";
        const clean = normSpaces(original);

        if (!clean) {
            el.dataset.neoSeen = "1";
            return;
        }
        if (isUiJunkText(clean)) {
            el.dataset.neoSeen = "1";
            return;
        }

        const veilLine = await pickVeilLine();
        if (!veilLine) {
            el.dataset.neoSeen = "1";
            return;
        }

        let display = veilLine;
        if (
            SETTINGS.enableAutomationBadge &&
            original.toLowerCase().includes((SETTINGS.autoTag || "#auto").toLowerCase())
        ) {
            display += " ⚙︎";
        }

        el.dataset.neoSeen = "1";
        el.dataset.neoMasked = "1";
        el.dataset.neoOriginal = original;
        el.dataset.neoVeil = display;
        el.dataset.neoRevealed = "0";
        el.dataset.neoLocked = "0";
        el.style.cursor = "pointer";

        el.textContent = display;
        bindPerNodeHandlers(el);
    }

    // ---------- Platform detection ----------
    const onYouTube = () => location.hostname.includes("youtube.com");
    // ---------- YouTube: comment bodies across surfaces ----------
    function getYouTubeCommentBodies() {
        const nodes = document.querySelectorAll(
            "ytd-comment-renderer [id='content-text'], " +
            "ytd-comment-view-model [id='content-text'], " +
            "ytd-comment-thread-renderer [id='content-text']"
        );

        return Array.from(nodes).filter((n) => {
            if (!n || !(n instanceof Element)) return false;
            if (
                !n.closest("ytd-comment-renderer") &&
                !n.closest("ytd-comment-view-model") &&
                !n.closest("ytd-comment-thread-renderer")
            )
                return false;
            const t = normSpaces(n.textContent || "");
            return !!t && !isUiJunkText(t);
        });
    }

    // ========================= 
    // INSTAGRAM — COMMENT-THREAD ONLY (NO BLEED)
    // =========================

    function onInstagram() {
        return location.hostname.includes("instagram.com");
    }

    function getInstagramThreadRoot() {
        // Only when a post is open (modal) OR you're on a post/reel page.
        const dialog = document.querySelector("div[role='dialog']");
        if (dialog) return dialog;

        const p = location.pathname || "";
        const isPostRoute = /^\/(p|reel|tv)\//.test(p);
        if (!isPostRoute) return null;

        return document.querySelector("article");
    }

    function scoreUlAsCommentThread(ul) {
        // Comment threads usually have multiple li's and include time elements
        const lis = Array.from(ul.querySelectorAll("li"));
        if (lis.length < 2) return 0;

        let score = 0;

        for (const li of lis) {
            // comments frequently include time stamps and reply/like controls
            if (li.querySelector("time")) score += 3;
            if (li.querySelector("span[dir='auto'], span[role='text'], span[lang]")) score += 1;

            // avoid nav/menu uls
            if (li.querySelector("nav, header")) score -= 2;
        }

        return score;
    }

    function pickBestCommentsUl(root) {
        const uls = Array.from(root.querySelectorAll("ul"));
        let best = null;
        let bestScore = 0;

        for (const ul of uls) {
            const s = scoreUlAsCommentThread(ul);
            if (s > bestScore) {
                bestScore = s;
                best = ul;
            }
        }

        // Require a minimum score so we don't pick random ULs
        return bestScore >= 6 ? best : null;
    }

    function pickCommentBodySpan(li) {
        // Choose the “body” span: texty, not username links, not buttons
        const spans = Array.from(li.querySelectorAll("span[dir='auto'], span[role='text'], span[lang]"))
            .filter(s => {
                if (!s) return false;
                if (s.closest("a")) return false;       // usernames/links
                if (s.closest("button")) return false;  // UI controls
                if (s.closest("time")) return false;
                if (s.closest("header, nav")) return false;

                const t = (s.textContent || "").trim();
                if (!t) return false;
                if (typeof isUiJunkText === "function" && isUiJunkText(t)) return false;
                if (!/[a-z]/i.test(t)) return false; // avoids “2h”, counts, etc.
                return true;
            });

        if (!spans.length) return null;

        // Longest span is almost always the comment body
        spans.sort((a, b) => (b.textContent || "").length - (a.textContent || "").length);
        return spans[0];
    }

    function getInstagramCommentBodies() {
        const root = getInstagramThreadRoot();
        if (!root) return []; // prevents feed/profile bleed

        const ul = pickBestCommentsUl(root);
        if (!ul) return [];

        const lis = Array.from(ul.querySelectorAll("li"));
        if (lis.length < 2) return [];

        // Skip caption row (first LI) so we don’t veil caption text
        const out = [];
        for (const li of lis.slice(1)) {
            const body = pickCommentBodySpan(li);
            if (body) out.push(body);
        }

        return Array.from(new Set(out));
    }


    // ---------- Scanning ----------
    let scheduled = false;

    async function scanOnce() {
        if (onYouTube()) {
            const nodes = getYouTubeCommentBodies();
            for (const n of nodes) await veilNode(n);
            return;
        }

        if (onInstagram()) {
            const nodes = getInstagramCommentBodies();
            for (const n of nodes) await veilNode(n);
            return;
        }
    }

    function scheduleScan() {
        if (scheduled) return;
        scheduled = true;
        setTimeout(async () => {
            scheduled = false;
            try {
                await scanOnce();
            } catch (e) {
                console.warn("NEO scan error:", e);
            }
        }, 120);
    }

    function startObserver() {
        const host = document.body || document.documentElement;
        if (!host || host.dataset.neoObs === "1") return;
        host.dataset.neoObs = "1";
        new MutationObserver(scheduleScan).observe(host, { childList: true, subtree: true });
    }

    function init() {
        chrome.storage.sync.get(DEFAULTS, (stored) => {
            SETTINGS = { ...DEFAULTS, ...(stored || {}) };

            startObserver();
            scanOnce();
            setInterval(() => scanOnce().catch(() => { }), SETTINGS.rescanMs || DEFAULTS.rescanMs);

            chrome.storage.onChanged.addListener((changes, area) => {
                if (area !== "sync") return;
                for (const k of Object.keys(changes)) SETTINGS[k] = changes[k].newValue;
                scheduleScan();
            });

            chrome.runtime.onMessage.addListener((msg) => {
                if (msg && msg.action === "shimmerScan") scheduleScan();
            });
        });

        console.log("NEO v3 running — hover/tap reveal should work. Hover device:", IS_HOVER_DEVICE);
    }

    init();
})();
