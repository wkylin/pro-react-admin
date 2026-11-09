# Workspace polish implementation plan

**Goal:** Reduce navigation density, standardize business page structure and complete notification editing.

**Spec:** `docs/superpowers/specs/2026-11-09-workspace-polish-design.md`

**Architecture:** Keep canonical route policy as the navigation source. Add shared page and toolbar primitives without business dependencies; existing feature wrappers compose them. Notification CRUD remains in its isolated ephemeral store.

## Constraints

- Preserve all existing route permissions, module data lifecycle and prior dashboard work.
- No new dependencies and no guessed customer/revenue API.
- Matching zh/en translations; responsive semantic theme tokens.

## Tasks

- [x] Group canonical navigation; retain leaf discoverability and permission filtering; sync enterprise entries and generated reference.
- [x] Add shared BusinessPage/BusinessToolbar; migrate dashboard, ResourceWorkspace, PatternPage and administration home; remove duplicate page layout CSS.
- [x] Complete notification CRUD, validation, scoped export and localized list/detail/drawer flow; retain Provider isolation.
- [x] Inspect existing real-data readiness and record confirmed API/model gaps.
- [x] Run focused tests/contracts and browser verification for desktop/mobile, themes, grouped search and notification workflow.
- [x] Review changes independently and document outcome.
