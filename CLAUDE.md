# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-file SPA for a beauty salon. No build step, no package manager — pure HTML/CSS/JS with Tailwind CDN, deployed to Vercel.

## Development

```bash
vercel dev        # Run locally with serverless API support
```

Copy `.env.example` to `.env` and fill in Telegram credentials before running locally.

## Architecture

**Everything lives in `code.html`** (~990 lines): Tailwind config, custom CSS, i18n strings, data arrays, app state, and all logic. There is no build pipeline.

**One API endpoint:** `api/telegram.js` — Vercel serverless function that forwards booking form submissions to a Telegram bot. Environment variables: `TELEGRAM_BOT_TOKEN` (or `TELEGRAM_BOT_API`) and `TELEGRAM_CHAT_ID` (or `TELEGRAM_CHATID`).

**Deployment:** `vercel.json` rewrites `/` → `/code.html`. Push to GitHub triggers Vercel auto-deploy.

## Key Patterns in `code.html`

**State:** Plain JS object `var state = { step, service, master, date, time, calYear, calMonth }`.

**Data:** `SERVICES` array (6 items) and `MASTERS` array (4 items) — each object has `id`, `ru`/`uz`/`en` name fields, price, duration.

**i18n:** `I18N` object with `ru`/`uz`/`en` keys. `t(key)` returns translated string; `txt(obj)` returns language-specific field from a data object. Language persists in `localStorage` key `salon-lang`, defaults to Russian.

**Navigation:** Scroll-based (`[data-scroll]` attributes + `scrollIntoView`). Bottom tab bar for sections. Booking opens as a modal overlay (`#booking-overlay`) with a 4-step wizard controlled by `goStep(n)`.

**Design system:** See `DESIGN.md` for the full spec. Key rules: glassmorphism for floating elements, rose/pink palette (`primary: #9d174d`), `border-radius` defaults to `1rem`, no 1px borders, Plus Jakarta Sans body / Noto Serif headlines.
