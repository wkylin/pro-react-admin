# Profile Page Implementation Plan

**Goal:** Replace the hardcoded code window with current identity, editable browser-local presentation details and working preferences.

**Architecture:** Keep `/profile` in its existing application. A small validated storage adapter owns only presentation values. The page derives identity from existing auth/permission hooks and uses the existing theme and i18n settings.

**Spec:** `docs/superpowers/specs/2026-11-09-profile-page-design.md`

**Constraints:** Preserve previous changes. No new dependency, credentials in storage, authentication mutation, server profile API, deployment or commit.

## Task 1 — local presentation model

Files: `src/pages/profile/{model.ts,model.test.ts}`.

Interface: `ProfileValues { displayName, jobTitle, department, location, bio }`; all strings. `createProfileDefaults(name)`, `getProfileStorageKey(projectId, accountId, tenantId?)`, `validateProfile(values)`, `loadProfile(storage,key,defaults) → { values, status: 'ready'|'invalid'|'unavailable' }`, `saveProfile(storage,key,values) → ProfileValues`. `ProfileValidationError.field` identifies the invalid field. Storage parameters accept only the required getItem/setItem methods; the page handles a throwing localStorage getter too.

- [x] Implement and test exact bounds from the spec, trimming, storage restoration, corruption/unavailability and project/account/tenant isolation.
- [x] Verify invalid or failed writes preserve the previous saved record.

## Task 2 — personal workspace

Files: `src/pages/profile/{index.tsx,index.module.less,ProfileEditor.tsx}`, bilingual translations.

- [x] Replace SyntaxHighlighter with BusinessPage, real account summary, local presentation values and a validated editor.
- [x] Key presentation state by project/source/tenant/account; keep auth email, roles and tokens outside the local draft.
- [x] Implement save feedback and dirty-cancel confirmation, retain draft on failure.
- [x] Wire theme, language and density to existing settings; show permission-aware existing destinations.
- [x] Add loading/fallback states and responsive semantic styles.

## Task 3 — verification

Files: `tests/e2e/profile.spec.ts`, `docs/development/PROFILE.md`, docs index.

- [x] Test save/refresh, dirty cancel, account isolation, preference synchronization and mobile/dark behavior.
- [x] Run model tests, app/E2E types, scoped lint/format, i18n, docs and route checks.
- [x] Inspect desktop/mobile screenshots and independently review the final scope.

## Progress

Completed in the current working tree. Model: 43 passed. Profile browser scenarios: 7 passed, covering quota failure, distinct GitHub login/display name and long role names in addition to the core workflow. Shared theme scenarios: 8 passed; permission cache isolation: 1 passed. One existing theme test still used the old close-tab label; its locator was aligned with the current accessible name, preserving the draft and geometry assertions, and the affected scenario passed on recheck.

Application/E2E types, scoped ESLint/Stylelint/Prettier/Markdownlint, i18n, import boundaries, route contract, documentation and diff checks passed. Desktop light and 390px dark screenshots were inspected. Independent review fixes distinguish login from display name and allow long role tags to wrap. No new server profile endpoint, production build, deployment or commit was performed.
