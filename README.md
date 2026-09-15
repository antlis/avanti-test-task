# Avanti — Area personale (LK)

Responsive personal-cabinet screen from the Avanti design, built as a component-driven SPA.

**Live demo:** https://avanti-test-task-alpha.vercel.app/

## Stack

- **Vue 3** (`<script setup>`) + **TypeScript**
- **Vite** build
- **Pinia** state management
- **Vue Router**
- **Axios** for REST (Laravel-ready via `VITE_API_BASE`)
- **SCSS** design tokens + mixins (scoped styles, no inline CSS)
- **Vitest** + **Vue Test Utils** (unit) · **Playwright** (e2e)

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Serve the production build |
| `npm run type-check` | `vue-tsc` type check |
| `npm run test:unit` | Run unit tests once |
| `npm run test:unit:watch` | Unit tests in watch mode |
| `npm run test:coverage` | Unit tests with coverage |
| `npm run test:e2e:install` | Install Playwright's Chromium (one-time) |
| `npm run test:e2e` | Run end-to-end tests |

## Conventions

- One component per file; `avanti_` domain prefix + purpose (e.g. `avanti_button.vue`).
- Files stay under 300 lines; components are reusable.
- `<script setup>` Composition API only.
- No inline JS/CSS — logic in composables/stores, styling via scoped SCSS using
  tokens from `src/assets/styles`.

## Project layout

```
src/
  assets/icons/      SVG icons (auto-registered by avanti_icon.vue)
  assets/styles/     Design tokens, mixins, reset (auto-injected into <style>)
  components/        Reusable components (flat, one file each)
  composables/       Reusable logic (use_async_state, …)
  config/            App constants (navigation, …)
  lib/               Axios instance (baseURL via VITE_API_BASE)
  repositories/      Data access — HTTP calls only
  services/          Thin business-logic layer over repositories
  stores/            Pinia stores (state + derived getters)
  types/             Shared TS types
  utils/             Pure helpers (format money/percent, checklist derivation)
  views/             Route-level screens
tests/
  unit/              Vitest + Vue Test Utils
  e2e/               Playwright
public/mock/         Mock JSON payloads (stand in for the Laravel REST API)
public/assets/       Logo + avatar assets exported from Figma
```

## Data flow (Laravel-ready)

State is loaded through a layered pipeline so swapping the mock JSON for a real
Laravel API only touches one layer:

```
component → store (Pinia) → service → repository → lib/http (Axios)
```

- **repository** does the HTTP call (`/mock/*.json` today; point `VITE_API_BASE`
  at the Laravel host to switch).
- **service** is a thin business-logic wrapper.
- **store** exposes reactive state + derived getters (loading/error via the
  `use_async_state` composable); pure derivation lives in `utils/`.

## Component roadmap

Screen: **"Уровень 4 — Дом готовые этапы"** (Avanti dashboard), desktop + mobile.

- [x] `avanti_icon.vue`
- [x] `avanti_badge.vue`
- [x] `avanti_avatar.vue`
- [x] `avanti_button.vue`
- [x] `avanti_nav_button.vue` (pill / tab — shared by header menu + bottom nav)
- [x] `avanti_assistenza_button.vue` (bar / tab variants)
- [x] `avanti_header.vue`
- [x] `avanti_nav_menu.vue`
- [x] `avanti_user_summary.vue`
- [x] `avanti_breadcrumb.vue`
- [x] `avanti_page_bar.vue` (desktop-only)
- [x] `avanti_bottom_nav.vue` (mobile-only)
- [x] `avanti_balance_card.vue`
- [x] `avanti_state_view.vue` (loading / error / retry)
- [x] `avanti_process_card.vue` (+ `avanti_process_step.vue`)
- [x] `avanti_progress_segments.vue`
- [x] `avanti_checklist_card.vue` (+ `avanti_checklist_item.vue`) — interactive stepper
- [x] `avanti_chat_popup.vue` (assistant bubble, floats above the mobile bottom nav)

## Deployment (Vercel)

Deployed at **https://avanti-test-task-alpha.vercel.app/**.

`vercel.json` is included (SPA rewrites, `dist` output). Push to GitHub and import
the repo in Vercel, or run `vercel` from the CLI.
