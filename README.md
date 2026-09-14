# Avanti — Area personale (LK)

Responsive personal-cabinet screen from the Avanti design, built as a component-driven SPA.

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
  assets/styles/     Design tokens, mixins, reset (auto-injected into <style>)
  components/        Reusable components (added incrementally)
  composables/       Reusable logic (use_async_state, …)
  router/            Route definitions
  services/          Axios instance + API services
  stores/            Pinia stores
  views/             Route-level screens
tests/
  unit/              Vitest + Vue Test Utils
  e2e/               Playwright
public/assets/       Logo + avatar assets exported from Figma
```

## Component roadmap

Screen: **"Дом готовые этапы"** (Avanti dashboard). Built and reviewed one at a time:

- [x] `ui/avanti_icon.vue`
- [x] `ui/avanti_badge.vue`
- [x] `ui/avanti_avatar.vue`
- [x] `ui/avanti_button.vue`
- [x] `layout/avanti_assistenza_button.vue` (composes `avanti_button`)
- [ ] `ui/avanti_card.vue`
- [ ] `ui/avanti_progress_segments.vue`
- [ ] `ui/avanti_tab_switch.vue`
- [ ] `ui/avanti_text_field.vue`
- [ ] `ui/avanti_amount_slider.vue`
- [ ] `ui/avanti_state_view.vue` (loading / error / empty / retry)
- [x] `layout/avanti_header.vue`
- [x] `layout/avanti_nav_menu.vue`
- [x] `layout/avanti_user_summary.vue`
- [x] `layout/avanti_breadcrumb.vue`
- [ ] `layout/avanti_bottom_nav.vue`
- [ ] `dashboard/avanti_balance_card.vue`
- [ ] `dashboard/avanti_checklist_card.vue`
- [ ] `dashboard/avanti_checklist_item.vue`
- [ ] `dashboard/avanti_payout_method_card.vue`
- [ ] `dashboard/avanti_amount_summary.vue`
- [ ] `dashboard/avanti_chat_popup.vue`

## Deployment (Vercel)

`vercel.json` is included (SPA rewrites, `dist` output). Push to GitHub and import
the repo in Vercel, or run `vercel` from the CLI.
