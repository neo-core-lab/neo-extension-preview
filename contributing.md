# Contributing to NEO — Adapters Only

Thank you for your interest in contributing to NEO.

---

## Future participation path

Significant contributors to NEO adapters may be eligible for:

- paid contracts  
- paid maintenance roles  
- advisory positions  
- participation in future funding rounds  

Eligibility is evaluated at the sole discretion of the founder and is not implied by contribution.  
Contribution alone does not confer ownership, governance rights, or equity.

This repository accepts **adapter contributions only**.  
Adapters are stabilization modules, not feature code.

If you are looking to add new features, logic, packs, UI, or analytics, this is not the correct entry point.

---

## What an adapter is

Adapters are the only code allowed to touch the platform DOM.

Their sole responsibility is to:

- locate stable comment structures  
- extract local, structured data  
- emit `AdapterPacket`s to NEO Core  

Adapters do **not**:

- apply veils  
- modify content  
- interpret meaning  
- log data  
- store data  
- send data anywhere  

NEO Core never queries the DOM directly.  
If it touches the page, it must live inside an adapter.

---

## Scope of allowed contributions

You **may** contribute:

- DOM selector stabilization  
- root container discovery  
- comment extraction logic  
- drift fixes when platforms change markup  
- performance-safe observer tuning  

You **may not** contribute:

- UI changes  
- Core logic  
- engine logic  
- telemetry  
- analytics  
- network requests  
- storage  
- logging  
- feature experiments  

Adapters exist to be boring, reliable, and invisible.

---

## Adapter contract (required)

Every adapter must:

- export exactly the `FunctionalAdapter` interface  
- provide a valid `AdapterInfo` object:
  - `name`  
  - `version`  
  - `adapterHash` (placeholder `"TBD"` is acceptable)  
- fail fast using `AdapterStabilityError` when assumptions break  
- fail open (no partial behavior, no guessing)  
- emit empty packets until confident extraction is implemented  
- never leak raw HTML or user content outside the adapter boundary  

If any of these conditions are violated, the PR will be rejected.

---

## Zero-log doctrine (non-negotiable)

Adapters operate under a zero-log, zero-telemetry, zero-storage rule.

You must **not**:

- use `console.log` (or any logging of user content)  
- write to `localStorage`, `sessionStorage`, `IndexedDB`, cookies  
- make network requests  
- collect metrics  
- infer user identity  
- persist DOM data  

All logic must be:

- local  
- ephemeral  
- in-memory only  

This is a hard requirement.

---

## Stability rules

Adapters must prioritize certainty over coverage.

- If a root container is not found → throw `AdapterStabilityError`.  
- Do **not** guess.  
- Do **not** fallback silently.  
- Do **not** degrade partially.  

Rule to remember:

> If the adapter is not confident, it must disengage.

---

## How to make a contribution

### 1. Pick a single adapter

Work on **one** platform only per PR:

- `IGAdapter`  
- `XAdapter`  
- `YouTubeAdapter`  

Do not modify multiple adapters in one submission.

### 2. Replace the root selector

Each adapter starts with a single placeholder selector:

- `IGAdapter` → `[data-neo-ig-root]`  
- `XAdapter` → `[data-neo-x-root]`  
- `YouTubeAdapter` → `[data-neo-yt-root]`  

Your first task is to replace one placeholder with a real, stable root container.

No secondary selectors at this stage.

### 3. Add comment extraction (optional, after root is stable)

Once a root selector is proven stable, you may add:

- comment node discovery  
- text / author extraction  
- timestamp parsing (best-effort only)  

Extraction must:

- remain local  
- avoid heavy traversal  
- respect performance limits  
- emit structured `CommentNode` objects only  

### 4. Run integrity tests

Before submitting:

- Run `npm test` / `pnpm test`.  
- Ensure `integrity.spec.js` passes.  
- Do **not** modify integrity tests.  

CI will inject `adapterHash` automatically.

---

## What we will review

We review PRs for:

- selector stability  
- correctness of failure behavior  
- adherence to zero-log rules  
- interface compliance  
- minimalism  

We do **not** review:

- opinions  
- feature ideas  
- speculative logic  
- overengineering  

---

## What will get a PR rejected immediately

- console logs  
- analytics of any kind  
- silent fallbacks  
- guessing DOM structure  
- multiple adapters in one PR  
- changes to Core or Engine code  
- violations of the adapter contract  

---

## Design philosophy (read this once)

Adapters are structural maintenance, not innovation.

They exist to keep NEO stable as platforms drift — nothing more.

If you find yourself wanting to:

- optimize engagement  
- classify users  
- infer sentiment  
- “improve” behavior  

Stop. That does not belong here.

---

## Final rule

Adapters earn the right to operate by proving certainty, not cleverness.

If you respect this rule, your contribution will fit.

---

## PR checklist (required)

By submitting this PR, you confirm that:

- [ ] I modified only one adapter (`IGAdapter`, `XAdapter`, or `YouTubeAdapter`)  
- [ ] I did not add logs, telemetry, storage, or network calls  
- [ ] All DOM assumptions are guarded with `AdapterStabilityError`  
- [ ] The adapter fails open when uncertain (no partial behavior)  
- [ ] I preserved the exact `FunctionalAdapter` interface  
- [ ] `integrity.spec.js` passes without modification  
