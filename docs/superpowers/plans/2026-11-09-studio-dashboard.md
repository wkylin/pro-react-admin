# Business dashboard implementation plan

> **For agentic workers:** Use the scoped tasks below; keep changes reviewable and verify each deliverable.

**Goal:** Add an actionable business dashboard based on the Studio Admin comparison.

**Architecture:** Reuse `/dashboard`, the primary layout and its existing permission. Keep deterministic demo data and query/export logic separate from presentation. URL query parameters own dashboard filters and pagination.

**Tech Stack:** React, TypeScript, Ant Design, React Router, existing semantic CSS tokens and Jest.

**Spec:** `docs/superpowers/specs/2026-11-09-studio-dashboard-design.md`

## Global constraints

- No new dependencies or enterprise API changes.
- All customer and aggregate figures are explicitly demo data with a fixed snapshot date.
- Existing `dashboard:read` permission and primary layout apply.
- New interface copy has matching Chinese and English translations.
- CSV exports the filtered scope; hidden selections cannot silently enter the export.

## Review focus

- Invalid URL filters and out-of-range page numbers fall back to usable values.
- Combining filters and changing pages cannot export hidden stale selections.
- CSV values with spreadsheet formula prefixes are escaped.
- Deep links and browser history restore filter state and selected date range.
- Mobile and dark themes retain legible charts, controls and local table scrolling.

### Task 1: Deterministic model

**Files:** Create `src/pages/dashboard/model.ts` and `model.test.ts`.

**Interfaces:** Produce typed customer fixtures, date-ranged activity/metric data, customer querying and CSV serialization. Presentation consumes these pure functions.

- [x] Define fixed snapshot, customer/status/billing/plan types and fixtures.
- [x] Implement combined search/status/billing/joined date filtering and stable sorting.
- [x] Implement date-ranged current/previous metric aggregation with explicit zero-period handling.
- [x] Implement CSV escaping for commas, quotes, line breaks and formula prefixes.
- [x] Run focused Jest coverage for query combinations, time ranges and CSV behavior.

### Task 2: Dashboard and navigation

**Files:** Replace `src/pages/dashboard/index.tsx`; create focused chart/table components and styles; update layout routes, route policy, primary navigation and locale files. Remove unused `AdminLanding.tsx`.

**Interfaces:** Consume Task 1 model; query params own range/search/status/billing/joined/sort/page/pageSize.

- [x] Build responsive KPI cards and accessible activity chart with a 7/30/90 day control.
- [x] Build the customer table, filter reset, selection, detail drawer and scoped download.
- [x] Move dashboard into primary layout and expose it through the existing permission-aware navigation.
- [x] Add matching translations and regenerate the route reference.
- [x] Verify typecheck, route contract, i18n and changed-file formatting/lint.

### Task 3: Browser validation and independent review

- [x] Check the actual dashboard at desktop and 390px, light/dark and Chinese/English.
- [x] Exercise combined filters, empty/reset, sorting, pagination, details, selection/export and URL restoration.
- [x] Request independent review of the final diff and address material findings.
- [x] Record passing checks and any remaining limitations in the design document.
