<!--
NEO — YouTube Adapter
© 2023–2025 Luciana Fisher. All Rights Reserved.

This documentation defines binding behavior for the YouTube platform adapter
within the NEO system.

By contributing code or documentation in this directory, contributors
acknowledge that their contributions are made for inclusion in NEO and
grant Luciana Fisher a perpetual, worldwide, irrevocable, royalty-free
right to use, modify, sublicense, and distribute those contributions
as part of the NEO system.

Governed by CONTRIBUTING.md and the Founder Sovereignty Charter.
-->

# YouTube Adapter (YouTubeAdapter)

Status: Stub (v1.0.0)

## What to do next
Replace the placeholder selector `[data-neo-yt-root]` with a real, stable
comments-root discovery strategy.

## Stability policy
This adapter is **fail-fast** by design:
- If the comments root cannot be detected, the adapter must throw
  `AdapterStabilityError`.

The system as a whole is **fail-open**:
- When an adapter fails fast, NEO does nothing on that page.

## Non-negotiables
- No console logs
- No storage
- No network
- Adapters may read DOM, but must not write or modify DOM
