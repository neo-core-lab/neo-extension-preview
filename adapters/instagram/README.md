<!--
NEO UMBRELLA SYSTEM — ENGINEERING DOCTRINE & SYSTEM CREED
© 2023–2025 Luciana Fisher. All Rights Reserved.

This document defines binding architectural, ethical, and operational constraints
governing the NEO system.

By contributing code, documentation, or other materials governed by this document,
contributors acknowledge that their contributions are made for inclusion in NEO and
grant Luciana Fisher a perpetual, worldwide, irrevocable, royalty-free right to use,
modify, sublicense, and distribute those contributions as part of the NEO system.

This document is not a suggestion.
It is a constraint.

Governed by CONTRIBUTING.md and the Founder Sovereignty Charter.
-->

🟩 NEO UMBRELLA SYSTEM — L1 PERCEPTION LAYER (NEO CORE)

Document Class: Engineering README • Architecture Spec • Mason’s Oath  
Layer: L1 — Client-Side Perception Layer  
Platforms: Instagram, YouTube, X/Twitter (Phase 1)  
Doctrine: Zero-Log • Zero-Storage • Zero-Surveillance • Non-Substitution • Child-Protection • Founder Sovereignty  
Protection Status: PUBLIC • DOCTRINE-BOUND • IMPLEMENTATION-CRITICAL  
Doctrine Authority: Founder-Key Only  

© 2023–2025 Luciana Fisher. All Rights Reserved.

## Rights, patents, and use

This document, the NEO Umbrella System, NEO Core, and all associated architecture, language, doctrine, and design are the exclusive intellectual property of Luciana Fisher.  
Public readability exists for transparency and doctrine-bound collaboration only.

- Commercial forking, rebranding, or white-label use is prohibited without explicit written consent.  
- Using this architecture or doctrine as the basis for surveillance, analytics, behavioral profiling, or data-extraction systems is prohibited.  
- Training machine learning models on this repository or its contents is prohibited.  
- Portions of the Perception Layer architecture, adapter model, and zero-log interaction design are protected by provisional patent filings; nothing here grants a license, waiver, or patent rights.

---

## Status

**Functional MVP — Stabilization Phase**

NEO is a working, fully client-side browser extension that alters only the presentation of comment text to reduce harm exposure.  
It does not moderate, censor, block, or report.

The current preview build touches the DOM directly; 
the goal of this stabilization phase is to migrate all DOM access into adapters and make Core DOM‑free.

Current focus:

- adapter stability  
- DOM drift hardening  
- UX edge-case polish  

🚫 No new features are accepted outside adapter stabilization.

### Core constraints (non-negotiable)

- zero logging  
- zero telemetry  
- zero content storage  
- zero network calls from the extension  

---

## Call for stabilization contributors

NEO is in a stabilization phase — the shield works; the stone must be cut precisely.

Seeking experienced engineers to:

- harden DOM adapters for Instagram, YouTube, and X/Twitter (Phase 1)  
- improve resilience against DOM drift (selector stability, fail-fast on uncertainty)  
- smooth UX edge cases under high-velocity, infinite-scroll comment streams  

This is **not** a feature-building phase. Any contribution that adds logging, telemetry, storage, or network calls is rejected by default.

---

## What NEO is (and is not)

NEO is not an AI moderator.  
NEO is not a classifier of people or beliefs.  
NEO is not a behavioral authority.

NEO is a **Perception Layer**.

It intervenes only at the level of exposure mechanics — how comment streams escalate, dominate attention, and overwhelm the nervous system.

NEO changes how content is encountered, not what content is.

---

## Positive externalities

NEO also quietly blunts bots, brigades, manipulation campaigns, and propaganda campaigns.  
Because it veils pile-ons, rage-baiting, repetition walls, and intimidation cascades at the perception layer,  
those operations lose the reliable visibility and emotional hijack spikes they depend on to work.  
What does not enter perception is stripped of power.

---

## Shield toggle

NEO includes a simple shield toggle in the extension popup:

- **ON — NEO shield active:** comments inside supported roots are veiled; you are inside the perception layer.  
- **OFF — Shield paused:** NEO does nothing on that page; you see the raw, unfiltered internet.

The toggle:

- never logs or stores user text  
- never sends data over the network  
- only controls whether the veil is applied on-device

When the shield is OFF, NEO behaves exactly like a fail-open adapter: present, but inert.

---

## Pledge to engineers (read before touching code)

You are not building a feature.  
You are carving a load-bearing stone.

If a change violates doctrine, the stone is rejected.  
No workaround. No debate. No cleverness.

This system must hold for decades.

---

## Architecture overview (L0 → L3)

### L0 — Doctrine layer (immutable)

Ethical and legal spine. Non-executable.  
No layer may bypass or weaken L0.

- Zero-Log Doctrine  
- Zero-Storage Doctrine  
- Zero-Surveillance Mandate  
- Non-Substitution Mandate  
- Child-Protection Doctrine  
- Founder Sovereignty Charter  

### L1 — Perception layer (this repository)

Responsibilities:

- Read platform DOM only via adapters  
- Compute local, ephemeral interaction geometry  
- Apply veils from read-only packs  
- Emit decision-level events only (no content)  
- Forget everything immediately after use  

L1 never:

- profiles users  
- remembers conversations  
- accumulates learning across sessions  

### L2 — Meta-perception layer (future)

Observes decision metadata only, never content.  
Audits stability, doctrine compliance, and drift.

### L3 — Application layer (future)

Web, Studio, educational tools.  
Never allowed to weaken L0–L1 or require Core to phone home.

---

## Adapters — the only DOM boundary

Adapters are the only code permitted to touch platform DOM.

Rules:

- no DOM writes  
- no selector guessing  
- no silent degradation  
- fail-fast on drift  

If the root cannot be found, the adapter throws `AdapterStabilityError`.  
The system then fails open: NEO does nothing on that page.

Cathedrals collapse when stones “mostly fit.”

---

## Behavioral guarantees (non-negotiable)

### Scope

NEO alters only comment text presentation within the adapter-provided comment root.

It must never affect:

- captions  
- video/audio playback  
- navigation  
- posting, replying, liking, reporting  
- any control outside the comment subtree  

### User agency is preserved

Users must always be able to:

- post comments  
- reply  
- see their own comments (veiled by default)  
- reveal comments (hover/tap)  
- engage normally with the platform  

NEO never blocks actions.  
It only alters visibility.

---

## Local interaction geometry (ephemeral)

NEO may compute local interaction geometry to guide interface decisions.

Geometry refers to structure, not meaning:

- thread depth  
- reply velocity  
- branching  
- alternation patterns  

Geometry is:

- computed in-memory only  
- used for immediate decisions  
- discarded immediately  
- never accumulated across tabs, sessions, or days  

NEO does not learn users.  
NEO does not remember conversations.

---

## Harm protection philosophy (critical reframe)

NEO does not learn misogyny, racism, or xenophobia.

Instead, NEO interrupts the mechanics that give harm power:

- pile-ons  
- dominance cascades  
- escalation velocity  
- repetition walls  
- intimidation through visibility  

These mechanics are ideology-agnostic.  
They work the same regardless of belief or language.

NEO reduces harm by starving amplification, not by judging ideas.

---

## Child protection doctrine (summary)

NEO protects minors without surveillance.

NEO may:

- veil grooming-like escalation patterns  
- interrupt off-platform migration attempts  
- bias toward insulation when power asymmetry is detected  

NEO shall never:

- store or transmit minors’ messages  
- create behavioral profiles  
- act as a moral authority, parent substitute, or content judge  

If surveillance becomes the only option, NEO must disable features instead.

### Guardian Mode (local policy veto)

NEO may offer an optional **Guardian Mode** intended for minors and supervised devices.

Guardian Mode allows a guardian to set **local-only constraints** on un-veiling behavior, including the ability to **veto un-veil** unless a local policy condition is satisfied (e.g., PIN/passcode, time window, strict mode).

Guardian Mode is a **policy lock**, not surveillance:

- No content is transmitted to guardians  
- No browsing history is recorded  
- No comment text is stored  
- No logs, no telemetry, no network  

Guardian Mode governs **visibility controls only** (reveal / un-veil).  
It must not block or alter native platform actions such as posting, replying, reporting, liking, or navigation.

#### Implementation constraints (non-negotiable)

- Guardian Mode must be **device-local first**  
- Configuration occurs via the extension UI only  
- Settings are stored as **local preferences**, never as content  
- Guardian PINs (if used) must be stored **hashed locally**  
- Reset requires physical device access or a device-level reset  
- No cloud dashboards  
- No guardian portals  
- No remote access  

If Guardian Mode cannot be implemented without surveillance, **it must not be implemented**.

#### Scope of guardian veto

When Guardian Mode is enabled, the un-veiling veto applies **globally** across all supported platforms and adapters, including Instagram, YouTube, and X/Twitter.

Guardian policies are **platform-agnostic** and govern the NEO perception layer itself, not individual services.

There is no per-platform override by default; any exception must be explicitly enabled by the guardian and remains subject to all Guardian Mode constraints.

---

## Packs — living library (read-only)

Packs are immutable JSON relics:

- content-hashed  
- shipped with the extension  
- never fetched dynamically  
- never mutated at runtime  

They replace harm with oxygen — not lectures.

---

## Legal & courtroom posture

NEO is legally resilient because it possesses nothing.

- no logs  
- no stored text  
- no reconstructable timelines  
- no personal data retention  

A subpoena can only compel what exists.  
NEO deliberately holds nothing responsive.

---

## Final principle

NEO is language-agnostic by default: it protects through exposure mechanics and local interaction geometry.  
Packs may be multilingual. Any future language-aware analysis must run locally, store nothing, and remain optional.

NEO interrupts escalation without interrupting agency.

If a change breaks posting, replying, or navigation, it is rejected.

We build it once.  
We build it right.

The perception shield holds — protecting minds, nervous systems, and children.

---

## Checklist (required)

By submitting this PR, you confirm that:

- [x] I modified only one adapter (IG, X, or YouTube)  
- [x] I did not add logs, telemetry, storage, or network calls  
- [x] Root discovery is fail-fast: if the comment root cannot be detected, the adapter throws `AdapterStabilityError` (no silent degradation)  
- [x] The adapter fails fast (throws) when uncertain; the system fails open (NEO does nothing on that page)  
- [x] I preserved the exact `FunctionalAdapter` interface  
- [x] `integrity.spec.js` passes without modification  