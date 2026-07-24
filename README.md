# Todo API — CI/CD Demo

[![CI](https://github.com/sagargunjal671/todo-api-devops-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/sagargunjal671/todo-api-devops-demo/actions/workflows/ci.yml)

A small Todo REST API (Node.js + Express + Jest) built to demonstrate a real, working CI/CD pipeline: every push to `main` is linted, tested, and — if those pass — automatically deployed.

## Pipeline

`push`/`pull_request` → **lint** → **test** → **deploy** (push to `main` only, after tests pass)

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Endpoints

| Method | Path                  | Description              |
|--------|-----------------------|---------------------------|
| GET    | `/health`             | Health check              |
| GET    | `/todos`               | List all todos            |
| POST   | `/todos`               | Create a todo              |
| GET    | `/todos/:id`           | Get a todo by id           |
| PUT    | `/todos/:id`           | Update a todo's title/completed |
| PATCH  | `/todos/:id/complete`  | Mark a todo as completed   |
| DELETE | `/todos/:id`           | Delete a todo              |

## Local development

```
npm install
npm test
npm start
```
