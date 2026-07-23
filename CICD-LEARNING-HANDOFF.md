# CI/CD Learning — Session Handoff

> Read this whole file before doing anything. It contains everything agreed with the user in a prior session so you (the new Claude session) don't need to be re-briefed.

## Who the user is
- 3.5 years of software development experience.
- Comfortable with Git already.
- Has worked mainly with **dedicated servers** for hosting/deployment — has NOT worked deeply with automated CI/CD pipelines.
- Currently preparing for a **job switch** and wants to be able to confidently discuss and demonstrate CI/CD in interviews.
- Goal level: a working developer's solid understanding of CI/CD — **not** a DevOps/deployment-specialist depth.

## Agreed learning approach
- **Practical/hands-on, not theory-first.** Each session/day should be: a short concept primer (10-15 min) followed by actually building, breaking, and fixing something. Avoid long lecture-style explanations up front.
- **Timeline: 5 days max**, but flexible — the user will give more time in a day if a topic needs it rather than sticking rigidly to a fixed number of hours per day.
- Build understanding through a **real working pipeline** the user can screen-share and narrate in an interview, not just talking points memorized from theory.
- Do not use this repo/folder for anything unrelated — this is a dedicated demo project, separate from the user's other real projects (e.g. their `whatsapp-voice` app), specifically to avoid unrelated complexity getting in the way of learning CI/CD mechanics.

## The demo project to build
**Small Task/Todo REST API** — Node.js + Express + Jest. Chosen because it's fast to scaffold but still touches every CI/CD pipeline stage.

Target pipeline:
1. PR opened → lint + test workflow runs (GitHub Actions)
2. Merge to `main` → Docker build
3. Push image → GHCR or Docker Hub
4. Auto-deploy → a free host (Render or Railway)
5. README gets a live CI badge showing pipeline status

**Optional follow-on** (only after the above MVP pipeline works end-to-end): layer in environment promotion — merges to a `develop` branch deploy to a staging environment, and tagged releases deploy to production. This exists specifically to cover the "environments + promotion" topic that commonly comes up in interviews.

## The 5-day plan
Each day = concept primer, then hands-on build. Time per day is flexible — extend if needed, especially on Day 2.

1. **Day 1 — Concepts + Pipeline Start**
   - CI vs CD vs Continuous Deployment (the actual distinction — common interview opener)
   - Pipeline stages: source → build → test → package/artifact → deploy → post-deploy checks
   - Branching strategies: trunk-based, GitFlow, feature-branch + PR gates
   - Hands-on: scaffold the Todo API, write a basic GitHub Actions workflow (lint → test → build on push/PR)

2. **Day 2 — Finish the GitHub Actions Pipeline**
   - Add a deploy job to a free host (Render/Railway/GitHub Pages)
   - Concepts: jobs, steps, secrets/env vars, artifacts, caching, triggers (`push`, `pull_request`, `workflow_dispatch`)
   - This is the core "I built one" deliverable — spend extra time here if needed, it matters most for interviews

3. **Day 3 — Jenkins + Docker Basics**
   - Jenkins conceptually only: Jenkinsfile, declarative vs scripted pipeline, agents/nodes, plugins — enough to discuss intelligently, not to administer
   - Docker basics: image vs container, Dockerfile, why containers help CI/CD portability

4. **Day 4 — Deployment Strategies + Environments**
   - Blue-green, canary, rolling deployments — what each is and the tradeoffs
   - Environments (dev/staging/prod) and promotion flow between them
   - Secrets management basics (env vars, vaults)
   - Rollback strategies — "what do you do when a deploy breaks prod"

5. **Day 5 — Interview Prep + Mock Run-Through**
   - Common interview questions: walk through a pipeline you've built, how a test failure is handled, how you'd roll back a bad deploy, CI vs CD distinction
   - Prepare an honest narrative: what's manual today on the user's dedicated servers, what they'd automate, and why — this framing lands better than pretending to have more automation experience than they do
   - Full run-through: narrate the built pipeline out loud as if presenting in an interview

## How to proceed in this new session
- Ask the user which day/step they're starting from (don't assume Day 1 unless they say so).
- Keep explaining the WHY and HOW of each piece as you build it (concept primer → build → explain what just happened), matching the practical approach above.
- Confirm before moving to a new day/topic rather than dumping the whole thing at once.
