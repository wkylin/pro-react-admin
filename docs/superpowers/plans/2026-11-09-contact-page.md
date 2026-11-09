# Contact Page Implementation Plan

**Goal:** Improve the existing contact page with useful project channels, a bilingual form and reliable delivery feedback.

**Architecture:** BusinessPage owns the layout; a focused model validates fields and submits to the existing Web3Forms endpoint. Existing public configuration moves into the common environment surface. Drafts stay in memory, scoped to the active identity.

**Spec:** `docs/superpowers/specs/2026-11-09-contact-page-design.md`

**Constraints:** Preserve previous work and sending capability. No dependency, new server endpoint, real message submission, deployment or commit.

## Task 1 — validated transport

Files: `src/pages/contact/{model.ts,model.test.ts}`.

Public types: `ContactTopic = 'question'|'bug'|'idea'|'collaboration'`; `ContactDraft { name,email,topic,subject,message }`; `ContactValidationError.field`; `ContactSendError.code = 'unconfigured'|'rejected'|'rateLimited'|'unavailable'|'network'|'timeout'|'aborted'|'invalidResponse'`.

Exports: `validateContactDraft(unknown): ContactDraft`; `sendContactMessage(draft, { accessKey, signal?, fetcher?, timeoutMs? }): Promise<void>`. Default timeout 15000 ms, endpoint `https://api.web3forms.com/submit`. Validate before any request. Set FormData access_key/name/email/topic/subject/message; no manual multipart header. Require response.ok and success strictly true. No retry. Always clean timeout and external abort listener.

- [x] Test field boundaries, malformed email/values and whitelisted payload.
- [x] Test success vs business/HTTP/protocol failure, network, timeout and cancellation with injected fetch.
- [x] Implement typed model and verify focused tests.

## Task 2 — configuration and guidance

Files: `build/client-env.js`, `.env`, local env examples, `scripts/env.test.mjs`, `docs/development/CONTACT.md`, docs index/generated reference.

- [x] Migrate the original public key to REACT_APP_WEB3FORMS_ACCESS_KEY without changing the default recipient configuration.
- [x] Document override/disable, add whitelist verification, regenerate reference.
- [x] Document actual project channels, no-message testing and provider source links.

## Task 3 — contact workspace

Files: `src/pages/contact/{index.tsx,index.module.less}`, translations, `tests/e2e/{contact.spec.ts,route-tabs.spec.ts}`.

- [x] Build channels/help and a labeled topic/name/email/subject/message form with shared layout and theme.
- [x] Scope draft by identity; add prefill only for non-fictional account data, in-memory draft preservation and clear confirmation.
- [x] Implement sending lock, abort cleanup, typed result feedback, disabled fallback, preserved failure draft and successful reset.
- [x] Add mocked browser scenarios, update legacy placeholder locator to its field label, inspect desktop/mobile themes.
- [x] Run model/config tests, app/E2E types, i18n, contracts, scoped lint/format/docs, then independently review and fix concrete findings.

## Progress

Completed locally. Contact model: 77 passed; shared environment: 3 passed; browser regression: 13 passed (8 Contact and 5 route-tabs). App/E2E types, scoped lint/format, i18n, route contract, import boundaries and docs/diff checks passed. Desktop light and 390px dark screenshots were inspected. A separate empty-key preview confirmed a disabled send button and available email channel.

The draft regression exposed an empty tab-action overlay intercepting Home-tab clicks. The overlay now passes pointer events through while real action buttons remain interactive; the natural-click regression passed. The sending button names its loading state explicitly. Account-switch verification preserves the existing denial for a manager without contact:read, then confirms the original draft is gone on return to the authorized account.

Independent review completed without unresolved product findings. All Web3Forms test requests were intercepted/injected; no real message was submitted. No production build, deployment or commit was performed.
