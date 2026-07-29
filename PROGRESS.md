# CI/CD Learning — Progress Log

> Read this + `CICD-LEARNING-HANDOFF.md` before doing anything in a new session.
> `CICD-LEARNING-HANDOFF.md` = the overall plan (who the user is, the 5-day curriculum, the target pipeline).
> This file = where we currently are in that plan. Update it after every meaningful step.

## Current status
- **Day:** 4 (staging/promotion hands-on) — COMPLETE ✅. Day 3 Docker hands-on PAUSED (see below).
- **Stage:** Ready for Day 5 (interview prep) in a future session — or resume Day 3 Docker hands-on once Docker Desktop's virtualization/WSL2 issue is fixed.

## Done so far (Day 1, full)
- [x] Local git repo initialized in `c:\xampp3\htdocs\ci-cd`, branch `main`
- [x] GitHub remote connected and pushed: `https://github.com/sagargunjal671/todo-api-devops-demo.git`
- [x] `.gitignore` created (`node_modules/`) — note: this file has repeatedly been re-saved as UTF-16 by the
      editor, which silently breaks git's ability to parse it (node_modules stops being ignored). If it happens
      again, rewrite it as plain UTF-8 (e.g. via the Write tool) rather than editing in-place.
- [x] `package.json` — scripts: `start` (`node src/server.js`), `test` (`jest`), `lint` (`eslint .`)
- [x] Dependencies installed: `express` (runtime); `jest`, `supertest`, `eslint`, `@eslint/js` (dev)
- [x] `src/app.js` (Express app, exported, no `listen()`) + `src/server.js` (entry point, respects `PORT` env var)
- [x] `GET /health` endpoint
- [x] Todo endpoints: `GET /todos`, `POST /todos`, `GET /todos/:id`, `DELETE /todos/:id` (in-memory array, no DB — deliberate simplification)
- [x] Jest + Supertest test suite (`tests/todos.test.js`) covering all endpoints — all passing
- [x] ESLint flat config (`eslint.config.js`) — passing clean
- [x] `.github/workflows/ci.yml` — triggers on `push`/`pull_request` to `main`, runs `npm ci` → lint → test
- [x] First real push to GitHub (Todo API code + workflow)
- [x] Hit and fixed a real CI failure: `npm ci` failed on the Linux runner with `EUSAGE` (lockfile missing
      `@emnapi/core`/`@emnapi/runtime` optional entries) even though it passed locally on Windows — fixed by
      deleting `node_modules`/`package-lock.json` and running a fresh `npm install` to regenerate a fully
      cross-platform-consistent lockfile. Good real-world "works on my machine but not in CI" example for interviews.
- [x] Verified `push` trigger: CI ran green on direct push to `main`
- [x] Verified `pull_request` trigger: opened PR #1 (`feature/add-delete-todo` adding `DELETE /todos/:id`), CI ran
      green as a pre-merge check, merged via GitHub UI, local `main` synced (`git pull`), feature branch deleted

## Extra exercise: two-developer merge conflict (between Day 1 and Day 2)
Hands-on demo of a real interview scenario: two devs both branch from the same `main` tip and edit
the same lines.
- [x] `feature/dev1-update-todo` — added `PUT /todos/:id` (update a todo's title/completed), merged first, clean (no conflict, `main` hadn't moved)
- [x] `feature/dev2-complete-todo` — added `PATCH /todos/:id/complete` in the same location in `src/app.js`, opened its PR *after* dev1 merged
- [x] PR #3 showed a real conflict (both branches edited the same lines relative to their shared ancestor)
- [x] Resolved with `git fetch origin` + `git merge origin/main` (merge, not rebase — branch was already pushed/had an open PR), manually kept both routes, removed conflict markers, re-ran tests, committed the merge, pushed, merged the PR
- [x] Confirmed on `main` afterward: both `PUT` and `PATCH .../complete` coexist, all tests green
- Also discussed conceptually (not built): a 3rd-dev pileup — each subsequent dev's conflict is always resolved against the *current* state of `main` at that moment, not a one-time checkpoint; this is why "require branch up to date before merge" branch-protection rules exist

## Day 2 (full) — Deploy job to Render
- [x] Created a Render Web Service connected to `sagargunjal671/todo-api-devops-demo` (branch `main`, build `npm install`, start `npm start`, Free instance, Health Check Path `/health`)
- [x] Set **Auto-Deploy to Off** — deliberately decoupling "push happened" from "deploy happened," so GitHub Actions (not Render's own git watcher) controls when a deploy fires
- [x] Copied Render's Deploy Hook URL, added as GitHub Actions secret `RENDER_DEPLOY_HOOK` (Settings → Secrets and variables → Actions)
- [x] Added a `deploy` job to `.github/workflows/ci.yml`:
  - `needs: lint-and-test` — won't run unless tests pass first (the CI→CD gate)
  - `if: github.event_name == 'push' && github.ref == 'refs/heads/main'` — only on a real push to `main`, never on a PR
  - Single step: `curl -f "${{ secrets.RENDER_DEPLOY_HOOK }}"`
- [x] Verified a real end-to-end run: `lint-and-test` → `deploy` both green in sequence on a push to `main`; confirmed a corresponding new deploy appeared in Render's dashboard and `/health` responded live
- [x] Added `README.md` with a live CI badge (`.../actions/workflows/ci.yml/badge.svg`), pipeline summary, and endpoint table
- [x] Discussed conceptually: what happens on CI failure (deploy job never runs, old version keeps serving) vs. a deploy that fails Render's health check (old version keeps serving, no downtime) vs. fixing a bug (same PR process again, no special redeploy path); CI vs. Continuous Delivery vs. Continuous Deployment distinction (this pipeline is genuinely Continuous *Deployment* — no manual approval gate)

## Day 3 — Jenkins + Docker (theory done, hands-on PAUSED)
- [x] Jenkins covered conceptually: Jenkinsfile vs `ci.yml`, stage vs job (stages run sequentially by
      default, unlike GH Actions jobs which default to parallel), controller/agent architecture, plugins vs
      Marketplace Actions
- [x] Docker covered conceptually: image vs container, container vs VM, an annotated Dockerfile, plain-English
      shipping-container explainer
- [x] `Dockerfile` and `.dockerignore` written in the repo root (Node 20-alpine, installs deps before copying
      source for layer caching, `CMD ["node", "src/server.js"]`)
- [x] Docker Desktop installed
- [ ] **BLOCKED:** `docker build` fails — Docker Desktop engine won't start. `wsl --status` shows: "Please enable
      the Virtual Machine Platform Windows feature and ensure virtualization is enabled in the BIOS." User is
      fixing this outside of a session (needs a BIOS-level virtualization check, possibly a restart). Resume with:
      confirm `docker --version` and `docker build -t todo-api .` both work, then `docker run` + curl `/health`
      from inside the container.
- Created the `sketchsheet` skill (`~/.claude/skills/sketchsheet/SKILL.md`, personal/global scope) during this
  session — a hand-drawn sketchnote-cheatsheet style for theory explanations, used for Day 3/4 material. In this
  project specifically, sketchsheets and doc-style primers get saved as **local HTML files** in the repo root
  (not published as claude.ai Artifacts) — see e.g. `progress-sketchsheet.html`, `day4-deployment-strategies-sketchsheet.html`.

## Day 4 — Deployment strategies + environments (hands-on, COMPLETE)
- [x] Concept sketchsheet covering blue-green, canary, rolling deploys, environments/promotion, secrets
      management, rollback strategies (`day4-deployment-strategies-sketchsheet.html`)
- [x] Created `develop` branch (`git checkout -b develop` from `main`)
- [x] Created a second Render Web Service (`todo-api-devops-demo-staging`) on the `develop` branch, Auto-Deploy
      off, same build/start/health-check config as prod
- [x] Added `RENDER_STAGING_DEPLOY_HOOK` GitHub secret
- [x] Updated `.github/workflows/ci.yml`: triggers now include `develop`; split the old `deploy` job into
      `deploy-staging` (`if: ref == develop`) and `deploy-prod` (renamed from `deploy`, `if: ref == main`) —
      both `needs: lint-and-test`
- [x] Verified the split works: push to `develop` → only `deploy-staging` fires (`deploy-prod` shows "skipped");
      merge PR `develop` → `main` → only `deploy-prod` fires
- [x] Reinforced the whole flow with a real small feature: added `env` field to `/health`
      (`process.env.APP_ENV || 'unknown'`), set `APP_ENV=staging` / `APP_ENV=production` as Render environment
      variables on each respective service, pushed to `develop` (staging showed `env:"staging"`), promoted via PR
      to `main` (prod showed `env:"production"`) — confirmed the two environments are genuinely distinct
- [x] Updated the `/health` test to `toMatchObject` instead of `toEqual` so it doesn't break regardless of `env`'s value

## Decision: handoff file IS tracked in git
Originally planned to keep `CICD-LEARNING-HANDOFF.md` out of git (gitignored). Changed: it's now tracked and pushed
along with this file, specifically so a Claude session opened from a fresh clone (e.g. on another PC) has full
context without needing to be re-briefed. Keep both files updated as we progress.

## Working agreement in effect
Claude writes/explains actual app code (Write/Edit); the user types and runs every terminal command themselves
(git, npm, node) — Claude gives the exact command + a one-line "why" and waits, rather than running it via Bash.
This is deliberate: the point of this project is the user's own hands-on CI/CD practice, not Claude executing on
their behalf.

## Remaining
- Day 3 Docker hands-on — resume once Docker Desktop's virtualization/WSL2 issue is fixed (see above)
- Day 5 — Interview prep + full mock run-through
- Day 5 — Interview prep + full mock run-through

## How to resume in a new session
1. Read `CICD-LEARNING-HANDOFF.md` for the full plan/context.
2. Read this file's "Current status" and "Not started yet" sections.
3. Ask the user to confirm they want to continue from here before proceeding (don't assume — things may have changed since this was last updated).
