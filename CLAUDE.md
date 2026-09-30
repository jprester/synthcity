@AGENTS.md

## Claude Code notes

- AGENTS.md above is the shared guide for all agents; put project rules there, not here.
- In Claude Code on the web, Chromium is preinstalled for `npm run visual:compare` (no `playwright install` needed). A full compare takes about 2.5 minutes; use `--only <shot>` (e.g. `npm run visual:compare -- --only drive-9746`) while iterating, then run the full set before committing.
- When a visual frame changes intentionally, open the new frame and the diff image and check them before running `npm run visual:baseline`.
