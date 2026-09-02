# IST Signature — Front-end

A Vue 3 single-page application for generating standardized corporate email
signatures. Employees sign in, keep their profile details up to date, preview a
branded HTML signature, and copy it straight into their Outlook signature
settings. Administrators manage the roster of users and the shared company
details that every signature inherits.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
  - [High-level overview](#high-level-overview)
  - [Request & auth flow](#request--auth-flow)
  - [Project structure](#project-structure)
- [Architectural Decisions](#architectural-decisions)
- [Continuous Integration (GitHub Actions)](#continuous-integration-github-actions)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Project setup](#project-setup)
  - [Available scripts](#available-scripts)
- [Configuration](#configuration)
- [Recommended IDE Setup](#recommended-ide-setup)

---

## Features

- **Authentication** — sign up / sign in with JWT-based sessions.
- **Role-based access** — `ADMIN` and `USER` roles land on different pages and
  see different navigation entries.
- **Signature preview & copy** — renders the user's live HTML signature and
  copies it to the clipboard as `text/html`, then deep-links to the Outlook
  signature settings page.
- **User & company management** — admins manage users; company details (name,
  address, website, mission) are shared across all signatures.
- **Component library** — accessible UI primitives built on
  [shadcn-vue](https://www.shadcn-vue.com/) / [radix-vue](https://www.radix-vue.com/).

---

## Tech Stack

| Concern          | Choice                                                              |
| ---------------- | ------------------------------------------------------------------- |
| Framework        | [Vue 3](https://vuejs.org/) (`<script setup>` SFCs)                 |
| Build tool       | [Vite 5](https://vite.dev/)                                         |
| Routing          | [Vue Router 4](https://router.vuejs.org/)                          |
| State management | [Pinia](https://pinia.vuejs.org/)                                  |
| HTTP client      | [Axios](https://axios-http.com/)                                   |
| Styling          | [Tailwind CSS](https://tailwindcss.com/) + shadcn-vue / radix-vue |
| Forms            | [vee-validate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/) |
| Icons            | [Iconify](https://iconify.design/) / lucide-vue-next               |
| Unit tests       | [Vitest](https://vitest.dev/) + Vue Test Utils                    |
| E2E tests        | [Cypress](https://www.cypress.io/)                                |
| Linting / format | ESLint (flat config) + Prettier                                   |

---

## Architecture

The app is a client-rendered SPA that talks to a REST backend over HTTP. It has
no server of its own — Vite builds static assets that can be served from any
static host or CDN.

### High-level overview

```
                         ┌───────────────────────────────────────────┐
                         │                Browser (SPA)               │
                         │                                            │
   User ───────────────▶ │  Views  ──uses──▶  UI components (shadcn)  │
                         │    │                                       │
                         │    │ read/write                            │
                         │    ▼                                       │
                         │  Pinia store  ◀──hydrates──  localStorage  │
                         │    │                              ▲        │
                         │    │ calls                        │        │
                         │    ▼                              │ token  │
                         │  Service layer (Axios)  ──────────┘        │
                         └───────────────┬────────────────────────────┘
                                         │ HTTPS  (Bearer JWT)
                                         ▼
                            ┌───────────────────────────┐
                            │   REST API  /api/v1/*      │
                            │  auth · users · company    │
                            └───────────────────────────┘
```

- **Views** (`src/views`) are route-level pages. Each route declares which
  **layout** (`general` or `dashboard`) it renders inside via `meta.layout`.
- **Layouts** (`src/layouts`) provide the page chrome. `App.vue` picks the
  layout dynamically from the active route's meta.
- **UI components** (`src/components/ui`) are the presentation primitives
  (button, input, form, popover, toast, scroll-area). Feature components such as
  `AuthForm`, `UserForm`, and `AppMenu` compose them.
- **Store** (`src/stores/counter.js`) holds global session state (logged-in
  user, company, users) with Pinia.
- **Service layer** (`src/stores/services/index.js`) centralizes every HTTP
  call behind `AuthService`, `UserService`, and `CompanyService` using a single
  configured Axios instance.

### Request & auth flow

1. On login, `AuthService` stores the JWT, refresh token, and user in
   `localStorage`.
2. The Pinia store is hydrated from `localStorage` on app start (`App.vue`).
3. A **router guard** (`src/router/index.js`) protects non-public routes: an
   unauthenticated visitor is redirected to `/signin`, and an already
   authenticated visitor is routed to their role's home page (`ADMIN → /users`,
   `USER → /signature`).
4. Service calls attach `Authorization: Bearer <token>` via an `authHeader()`
   helper. An **Axios response interceptor** catches `403` responses globally,
   shows a toast, logs the user out, and reloads.

### Project structure

```
ist-signature-fe/
├─ .github/workflows/       # CI pipeline (see below)
├─ cypress/                 # End-to-end tests (specs, fixtures, support)
├─ public/                  # Static assets served as-is
├─ src/
│  ├─ assets/               # CSS (Tailwind entry), images, SVGs
│  ├─ components/
│  │  ├─ ui/                # shadcn-vue primitives (button, form, toast, ...)
│  │  ├─ __tests__/         # Vitest component/view specs
│  │  ├─ AuthForm.vue       # Feature components (auth, users, account, nav)
│  │  ├─ AppMenu.vue        # Role-aware sidebar navigation
│  │  └─ AppNav.vue
│  ├─ layouts/              # DashboardLayout & GeneralLayout page chrome
│  ├─ lib/utils.js          # `cn()` class-merge helper (clsx + tailwind-merge)
│  ├─ router/index.js       # Routes + auth/role navigation guard
│  ├─ stores/
│  │  ├─ counter.js         # Pinia global store
│  │  └─ services/index.js  # Axios instance + Auth/User/Company services
│  ├─ views/                # Route pages (Signin, Signup, Signature, Users, ...)
│  ├─ App.vue               # Root: layout selection + store hydration
│  └─ main.js               # App bootstrap (Pinia + Router)
├─ components.json          # shadcn-vue generator config
├─ tailwind.config.js       # Design tokens & Tailwind setup
├─ vite.config.js           # Vite + `@` → `src` alias
├─ vitest.config.js         # Unit test + coverage config
└─ cypress.config.js        # E2E config
```

---

## Architectural Decisions

- **Feature-by-type folder layout.** Code is grouped by kind (`views`,
  `components`, `layouts`, `stores`, `router`). The app is small enough that a
  flat, conventional Vue structure keeps navigation predictable without the
  overhead of feature modules.
- **Layouts selected via route meta.** Rather than nesting layout components in
  each view, every route declares `meta.layout` and `App.vue` resolves the
  layout component reactively. This keeps views free of chrome and makes it a
  one-line change to move a page between the public and dashboard shells.
- **Centralized service layer over ad-hoc `fetch`/`axios` calls.** All network
  access lives in `src/stores/services`, exposing typed service singletons.
  This isolates the API base URL, auth headers, timeouts, and global error
  handling (the `403` interceptor) in one place, so components stay declarative.
- **Session state in `localStorage`, mirrored into Pinia.** JWTs and the current
  user survive reloads via `localStorage`; Pinia provides reactive access during
  a session. The router guard reads `localStorage` directly so protection works
  before the store is hydrated.
- **shadcn-vue for UI primitives.** Components are copied into
  `src/components/ui` (not consumed from `node_modules`), so they can be styled
  and modified freely. `cn()` (clsx + tailwind-merge) resolves conflicting
  Tailwind classes predictably.
- **Zod-validated forms.** `vee-validate` + `@vee-validate/zod` share one schema
  for both validation and (where used) typing, keeping form rules declarative
  and colocated.
- **`@` path alias.** `@` maps to `src/` (Vite + `jsconfig.json`) to avoid
  brittle `../../` relative imports.
- **Two test layers.** Vitest (jsdom) covers components and views in isolation;
  Cypress exercises the built app end-to-end. CI runs unit tests against source
  and E2E against the production `preview` build.

---

## Continuous Integration (GitHub Actions)

CI is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) and runs
on every push and pull request to `main`. Runs on the same ref are
auto-cancelled when superseded (`concurrency`), and all jobs use Node 20 with
npm dependency caching.

| Job          | What it does                                                             |
| ------------ | ------------------------------------------------------------------------ |
| **Lint**     | `eslint .` in check-only mode (no `--fix`) so violations fail the build. |
| **Unit**     | `vitest run --coverage`; uploads the `coverage/` report as an artifact.  |
| **Build**    | `vite build`; uploads the `dist/` production bundle as an artifact.      |
| **E2E**      | Builds the app, boots `vite preview`, and runs Cypress against it. Depends on **Lint** and **Unit** passing first. |

```
push / pull_request → main
        │
        ├── Lint  ─┐
        ├── Unit  ─┤ (must pass)
        │          └──▶ E2E (build + preview + cypress run)
        └── Build
```

---

## Getting Started

### Prerequisites

- **Node.js 20+** and npm.
- A running instance of the IST Signature **backend API**. The front-end expects
  it at `http://localhost:8080/api/v1` by default (see
  [Configuration](#configuration)).

### Project setup

```sh
npm install
```

#### Compile and hot-reload for development

```sh
npm run dev
```

#### Compile and minify for production

```sh
npm run build
```

### Available scripts

| Script                 | Description                                                        |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with hot-reload.                        |
| `npm run build`        | Build the production bundle into `dist/`.                         |
| `npm run preview`      | Preview the production build locally (port `4173`).              |
| `npm run test:unit`    | Run unit tests with [Vitest](https://vitest.dev/).               |
| `npm run test:e2e:dev` | Open [Cypress](https://www.cypress.io/) against the dev server.   |
| `npm run test:e2e`     | Run Cypress against the production `preview` build (used in CI).  |
| `npm run lint`         | Lint and auto-fix with ESLint.                                    |
| `npm run format`       | Format `src/` with Prettier.                                     |

#### Running end-to-end tests

`npm run test:e2e:dev` runs the E2E tests against the Vite development server —
it is much faster than the production build. It is still recommended to test the
production build with `npm run test:e2e` before deploying (this is what CI does):

```sh
npm run build
npm run test:e2e
```

---

## Configuration

The API base URL is currently defined in `src/stores/services/index.js`:

```js
const API_URL = 'http://localhost:8080/api/v1'
```

Point this at your backend before building for another environment. Client-side
session data (`user`, `token`, `refresh_token`, `company`) is persisted in the
browser's `localStorage`.

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) +
[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable Vetur).

See the [Vite Configuration Reference](https://vite.dev/config/) for build
customization.
