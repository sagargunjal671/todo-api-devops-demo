# CI/CD Learning — Progress Log

> Read this + `CICD-LEARNING-HANDOFF.md` before doing anything in a new session.
> `CICD-LEARNING-HANDOFF.md` = the overall plan (who the user is, the 5-day curriculum, the target pipeline).
> This file = where we currently are in that plan. Update it after every meaningful step.

## Current status
- **Day:** 1 — Concepts + Pipeline Start
- **Stage:** Scaffolding the Todo API (Step 1 of the Day 1 build)

## Done so far
- [x] Local git repo initialized in `c:\xampp3\htdocs\ci-cd`, branch `main`
- [x] GitHub remote created and connected: `https://github.com/sagargunjal671/todo-api-devops-demo.git` (not yet pushed)
- [x] `.gitignore` created (`node_modules/`)
- [x] `package.json` created — scripts: `start` (`node src/server.js`), `test` (`jest`), `lint` (`eslint .`)
- [x] Dependencies installed: `express` (runtime), `jest` + `supertest` + `eslint` (dev)

## Decision: handoff file IS tracked in git
Originally planned to keep `CICD-LEARNING-HANDOFF.md` out of git (gitignored). Changed: it's now tracked and pushed
along with this file, specifically so a Claude session opened from a fresh clone (e.g. on another PC) has full
context without needing to be re-briefed. Keep both files updated as we progress.

## Not started yet (remaining Day 1 build steps)
- [ ] Step 2: Minimal Express server — split `src/app.js` (app definition, exported) from `src/server.js` (starts listening) + `GET /health` endpoint
- [ ] Step 3: Todo endpoints — `GET /todos`, `POST /todos`, `GET /todos/:id` (in-memory array)
- [ ] Step 4: Jest + Supertest tests for the endpoints
- [ ] Step 5: ESLint config
- [ ] First push to GitHub (once real app code exists — not just config files)
- [ ] Write the GitHub Actions workflow (lint → test on PR/push)
- [ ] Open a PR and watch the workflow run

## Remaining days (not started)
- Day 2 — Add deploy job to Render/Railway; jobs/steps/secrets/artifacts/caching/triggers concepts
- Day 3 — Jenkins concepts + Docker basics
- Day 4 — Deployment strategies, environments/promotion, secrets management, rollback
- Day 5 — Interview prep + full mock run-through

## How to resume in a new session
1. Read `CICD-LEARNING-HANDOFF.md` for the full plan/context.
2. Read this file's "Current status" and "Not started yet" sections.
3. Ask the user to confirm they want to continue from here before proceeding (don't assume — things may have changed since this was last updated).
