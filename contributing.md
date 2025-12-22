Contributing to NEO — Adapters Only

Thank you for your interest in contributing to NEO.

Future Participation Path

Significant contributors to NEO adapters may be eligible for:

paid contracts

paid maintenance roles

advisory positions

or participation in future funding rounds

Eligibility is evaluated at the sole discretion of the founder and is not implied by contribution.
Contribution alone does not confer ownership, governance rights, or equity.

This repository accepts adapter contributions only.
Adapters are stabilization modules, not feature code.

If you are looking to add new features, logic, packs, UI, or analytics, this is not the correct entry point.

What an Adapter Is

Adapters are the only code allowed to touch the platform DOM.

Their sole responsibility is to:

locate stable comment structures

extract local, structured data

emit AdapterPackets to NEO Core

Adapters do not:

apply veils

modify content

interpret meaning

log data

store data

send data anywhere

NEO Core never queries the DOM directly.
If it touches the page, it must live inside an adapter.

Scope of Allowed Contributions

You may contribute only the following:

DOM selector stabilization

Root container discovery

Comment extraction logic

Drift fixes when platforms change markup

Performance-safe observer tuning

You may not contribute:

UI changes

Core logic

Engine logic

Telemetry

Analytics

Network requests

Storage

Logging

Feature experiments

Adapters exist to be boring, reliable, and invisible.

Adapter Contract (Required)

Every adapter must:

Export exactly the FunctionalAdapter interface

Provide a valid AdapterInfo object:

name

version

adapterHash (placeholder "TBD" is acceptable)

Fail fast using AdapterStabilityError when assumptions break

Fail open (no partial behavior, no guessing)

Emit empty packets until confident extraction is implemented

Never leak raw HTML or user content outside the adapter boundary

If any of these conditions are violated, the PR will be rejected.

Zero-Log Doctrine (Non-Negotiable)

Adapters operate under a zero-log, zero-telemetry, zero-storage rule.

You must not:

use console.log

write to localStorage, sessionStorage, IndexedDB, cookies

make network requests

collect metrics

infer user identity

persist DOM data

All logic must be:

local

ephemeral

in-memory only

This is a hard requirement.

Stability Rules

Adapters must prioritize certainty over coverage.

If a root container is not found → throw AdapterStabilityError

Do not guess

Do not fallback silently

Do not degrade partially

Rule to remember:

If the adapter is not confident, it must disengage.

How to Make a Contribution
1. Pick a Single Adapter

Work on one platform only per PR:

IGAdapter

XAdapter

YouTubeAdapter

Do not modify multiple adapters in one submission.

2. Replace the Root Selector

Each adapter starts with a single placeholder selector:

IGAdapter → [data-neo-ig-root]

XAdapter → [data-neo-x-root]

YouTubeAdapter → [data-neo-yt-root]

Your first task is to replace one placeholder with a real, stable root container.

No secondary selectors at this stage.

3. Add Comment Extraction (Optional, After Root Is Stable)

Once a root selector is proven stable, you may add:

comment node discovery

text / author extraction

timestamp parsing (best-effort only)

Extraction must:

remain local

avoid heavy traversal

respect performance limits

emit structured CommentNode objects only

4. Run Integrity Tests

Before submitting:

Run npm test / pnpm test

Ensure integrity.spec.js passes

Do not modify integrity tests

CI will inject adapterHash automatically.

What We Will Review

We review PRs for:

selector stability

correctness of failure behavior

adherence to zero-log rules

interface compliance

minimalism

We do not review:

opinions

feature ideas

speculative logic

overengineering

What Will Get a PR Rejected Immediately

Console logs

Analytics of any kind

Silent fallbacks

Guessing DOM structure

Multiple adapters in one PR

Changes to Core or Engine code

Violations of the adapter contract

Design Philosophy (Read This Once)

Adapters are structural maintenance, not innovation.

They exist to keep NEO stable as platforms drift — nothing more.

If you find yourself wanting to:

optimize engagement

classify users

infer sentiment

“improve” behavior

Stop. That does not belong here.

Final Rule

Adapters earn the right to operate by proving certainty, not cleverness.

If you respect this rule, your contribution will fit.

PR Checklist (Required)

By submitting this PR, you confirm that:

 I modified only one adapter (IG, X, or YouTube)

 I did not add logs, telemetry, storage, or network calls

 All DOM assumptions are guarded with AdapterStabilityError

 The adapter fails open when uncertain (no partial behavior)

 I preserved the exact FunctionalAdapter interface

 integrity.spec.js passes without modification