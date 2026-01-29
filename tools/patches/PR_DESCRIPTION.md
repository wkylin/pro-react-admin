PR: re-export `ArgsTable` from `@storybook/addon-docs/blocks`

Summary
-------
This small change re-exports the existing `PureArgsTable` implementation as a stable named export `ArgsTable` from `code/addons/docs/src/blocks.ts`.

Rationale
---------
- Some bundlers / pre-bundlers (for example Vite optimizeDeps) can alter the compiled modules and effectively remove/change named exports consumers expect, resulting in runtime errors like:
  ``Error: The requested module '.../blocks.js' does not provide an export named 'ArgsTable'``
- Storybook currently exports an equivalent implementation under a different name (`PureArgsTable`). Re-exporting it under `ArgsTable` restores compatibility with MDX files and third-party docs that import `ArgsTable` directly.

Change
------
- Add a single line: `export { PureArgsTable as ArgsTable }` in `code/addons/docs/src/blocks.ts` (or the corresponding entry point that builds `blocks` bundle).

Notes / Alternatives
--------------------
- Alternatively, we could update the package exports map or build step to guarantee `ArgsTable` is exported explicitly from the built artifact. This PR picks the smallest non-breaking change that is easy to review and test.

Testing
-------
- Unit tests for docs blocks should continue to pass.
- Added unit test: `code/addons/docs/src/__tests__/blocks.test.ts` — asserts `ArgsTable` is exported and is an alias of `PureArgsTable`.
- Manual verification: build with Vite and run Storybook + MDX that imports `ArgsTable` to ensure runtime import succeeds.

Changelog
---------
- Fix: re-export `ArgsTable` from `@storybook/addon-docs/blocks` to restore compatibility with imports that expect the named export.

Request
-------
If maintainers are okay with this approach, I can open a formal PR against Storybook with the change, tests and a short changelog entry.
