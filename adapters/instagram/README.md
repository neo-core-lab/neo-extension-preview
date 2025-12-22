<!--
NEO — Instagram Adapter
© 2025 Luciana Fisher. All rights reserved.

This documentation describes adapter behavior within the NEO system.
Contributions to code or documentation in this directory are made
for inclusion in NEO and grant Luciana Fisher a perpetual, worldwide,
irrevocable right to use, modify, sublicense, and distribute those
contributions as part of NEO.

Governed by CONTRIBUTING.md and applicable project charters.
-->

# Instagram Adapter

Status: Stub (v1.0.0)

## What to do next
Replace the placeholder selector `[data-neo-ig-root]` with a real, stable comment-root discovery strategy.

## Stability policy
This adapter is **fail-fast** by design:
- If the comment root is missing, the adapter must return `root: null`.
- `BaseStubAdapter` will then throw `AdapterStabilityError` via `adapterStabilityGuard(...)`.

The system as a whole is **fail-open**:
- When an adapter fails fast, the caller (router/core) should treat the adapter as unavailable and avoid applying any veil behavior.

## Non-negotiables
- No console logs
- No storage
- No network
- Adapters may read DOM, but must not write or modify DOM

## Definition of done (root discovery)
- Works on: post page + modal
- Survives: infinite scroll / new comments loaded
- Includes: `selectorsTried` list + brief rationale for each selector

🔒 Behavioral Guarantees (Non-Negotiable)

NEO is a perception layer, not a moderation tool, not a blocker, and not a replacement for platform behavior.

Scope of Effect

NEO may only alter the presentation of comment text.

NEO must never affect:

captions

post bodies

video or audio playback

recommendation feeds

navigation, menus, or profiles

platform controls outside the comment thread

Implementation rule:
Adapters must return a single, stable comment root.
All veiling logic is strictly constrained to that subtree.

User Agency Is Preserved

The user must always be able to:

read comments (by reveal)

reply to any comment

post their own comment

like / dislike / react

expand threads (“view replies”)

navigate profiles

use all native platform controls

NEO must never disable, intercept, or replace native platform actions.

Veiling Rules

All comments inside the comment root are veiled uniformly:

including the user’s own comments

including all nested replies (reply → reply-to-reply → etc.)

Veiling applies recursively to entire reply chains.

Reveal behavior:

Desktop: hover to reveal, mouse-out to re-veil

Mobile / tablet: tap to reveal, tap again to re-veil

The user must be able to clearly see that:

their comment posted successfully

even if it appears veiled by default

Interaction Safety

Veiling must not block pointer events required for native actions.

If overlays are used, they must not capture clicks except for explicit reveal toggles.

Reply composers and input fields must never be veiled.

Escalation Geometry (Local-Only)

NEO may infer structural patterns of comment escalation locally, without reading meaning and without data persistence.

Allowed signals (local, ephemeral):

thread depth

reply branching

reply velocity

back-and-forth alternation patterns

Not allowed:

semantic analysis

user profiling

logging

storage

network transmission

All inference is local, transient, and disposable.

Failure Model

Adapters fail fast: if a comment root cannot be reliably detected, the adapter must throw AdapterStabilityError.

The system fails open: when an adapter fails, NEO does nothing on that platform/page.

Design Principle (Read This Twice)

NEO interrupts escalation without interrupting agency.

If a change breaks posting, replying, navigation, or platform controls, it violates the core design and must not be merged.