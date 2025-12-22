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

Status

Functional MVP — Stabilization Phase

NEO is a working, fully client-side browser extension that alters only the presentation of comment text to reduce harm exposure. 
It does not moderate, censor, block, or report.

Current focus:

adapter stability

DOM drift hardening

UX edge-case polish

🚫 No new features are accepted outside adapter stabilization.

Core Constraints (Non-Negotiable)

zero logging

zero telemetry

zero content storage

zero network calls from the extension

What NEO Is (and Is Not)

NEO is not an AI moderator.
NEO is not a classifier of people or beliefs.
NEO is not a behavioral authority.

NEO is a Perception Layer.

It intervenes only at the level of exposure mechanics — how comment streams escalate, dominate attention, and overwhelm the nervous system.

NEO changes how content is encountered, not what content is.

Pledge to Engineers (Read Before Touching Code)

You are not building a feature.
You are carving a load-bearing stone.

If a change violates doctrine, the stone is rejected.
No workaround. No debate. No cleverness.

This system must hold for decades.

Architecture Overview (L0 → L3)
L0 — Doctrine Layer (Immutable)

Ethical and legal spine. Non-executable.
No layer may bypass or weaken L0.

Zero-Log Doctrine

Zero-Storage Doctrine

Zero-Surveillance Mandate

Non-Substitution Mandate

Child-Protection Doctrine

Founder Sovereignty Charter

L1 — Perception Layer (This Repository)

Responsibilities:

Read platform DOM only via adapters

Compute local, ephemeral interaction geometry

Apply veils from read-only packs

Emit decision-level events only (no content)

Forget everything immediately after use

L1 never:

profiles users

remembers conversations

accumulates learning across sessions

L2 — Meta-Perception Layer (Future)

Observes decision metadata only, never content.
Audits stability, doctrine compliance, and drift.

L3 — Application Layer (Future)

Web, Studio, educational tools.
Never allowed to weaken L0–L1 or require Core to phone home.

Adapters — The Only DOM Boundary

Adapters are the only code permitted to touch platform DOM.

Rules:

no DOM writes

no selector guessing

no silent degradation

fail-fast on drift

If the root cannot be found, the adapter throws AdapterStabilityError.
The system then fails open: NEO does nothing on that page.

Cathedrals collapse when stones “mostly fit.”

Behavioral Guarantees (Non-Negotiable)
Scope

NEO alters only comment text presentation within the adapter-provided comment root.

It must never affect:

captions

video/audio playback

navigation

posting, replying, liking, reporting

any control outside the comment subtree

User Agency Is Preserved

Users must always be able to:

post comments

reply

see their own comments (veiled by default)

reveal comments (hover/tap)

engage normally with the platform

NEO never blocks actions.
It only alters visibility.

Local Interaction Geometry (Ephemeral)

NEO may compute local interaction geometry to guide interface decisions.

Geometry refers to structure, not meaning:

thread depth

reply velocity

branching

alternation patterns

Geometry is:

computed in-memory only

used for immediate decisions

discarded immediately

never accumulated across tabs, sessions, or days

NEO does not learn users.
NEO does not remember conversations.

Harm Protection Philosophy (Critical Reframe)

NEO does not learn misogyny, racism, or xenophobia.

Instead, NEO interrupts the mechanics that give harm power:

pile-ons

dominance cascades

escalation velocity

repetition walls

intimidation through visibility

These mechanics are ideology-agnostic.
They work the same regardless of belief or language.

NEO reduces harm by starving amplification, not by judging ideas.

Child Protection Doctrine (Summary)

NEO protects minors without surveillance.

NEO may:

veil grooming-like escalation patterns

interrupt off-platform migration attempts

bias toward insulation when power asymmetry is detected

NEO shall never:

store or transmit minors’ messages

create behavioral profiles

act as a moral authority

If surveillance becomes the only option, NEO must disable features instead.

Packs — Living Library (Read-Only)

Packs are immutable JSON relics:

content-hashed

shipped with the extension

never fetched dynamically

never mutated at runtime

They replace harm with oxygen — not lectures.

Legal & Courtroom Posture

NEO is legally resilient because it possesses nothing.

no logs

no stored text

no reconstructable timelines

no personal data retention

A subpoena can only compel what exists.
NEO deliberately holds nothing responsive.

## Final Principle

NEO is language-agnostic by default: it protects through exposure mechanics and local interaction geometry. 
Packs may be multilingual. Any future language-aware analysis must run locally, store nothing, and remain optional.

NEO interrupts escalation without interrupting agency.

If a change breaks posting, replying, or navigation, it is rejected.

We build it once.  
We build it right.

The perception shield holds—protecting minds, nervous systems, and children.

## Checklist (Required)

By submitting this PR, you confirm that:

- [x] I modified only one adapter (IG, X, or YouTube)
- [x] I did not add logs, telemetry, storage, or network calls
- [x] All DOM assumptions are guarded with AdapterStabilityError
- [x] The adapter fails open when uncertain (no partial behavior)
- [x] I preserved the exact FunctionalAdapter interface
- [x] integrity.spec.js passes without modification