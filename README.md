# Portfolio

A single-page developer portfolio built with Next.js (App Router) and Tailwind CSS, with a built-in admin dashboard so you can update your intro, tech stack, and projects without touching code.

## What's included

- **Public page** (`/`) — intro/hero, a tech stack section grouped by category, and a projects section with a **Grid / Carousel toggle**.
- **Admin dashboard** (`/admin`) — password-protected. Edit your profile, add/edit/remove tech stack items, and add/edit/remove projects (with image uploads, tech tags, and live/GitHub links).
- All content lives in `data/db.json` and is edited through the admin UI — no code changes needed for routine updates.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment example and set your own values:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   - `ADMIN_PASSWORD` — the password you'll use to log in to `/admin`.
   - `ADMIN_SESSION_SECRET` — any long random string, used to sign the login session cookie.
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` for the public site, and `http://localhost:3000/admin` to log in and edit content.

## Editing content

Everything is editable from `/admin`:

- **Profile tab** — name, role, tagline, bio, location, email, résumé link, avatar, and social links.
- **Tech stack tab** — add items with a name, category (used to group them on the page), and a skill level (0–100). Click a name/category field and click away (blur) to save an edit, or drag the slider and release to update the level.
- **Projects tab** — each project has a title, description, live/GitHub links, an image gallery, and a multi-select for which tech stack items were used. Existing projects are listed with an editable form; a blank form at the bottom adds a new one.

Uploaded images are saved to `public/uploads` and referenced by path in `data/db.json`.

## Customizing the design

The visual style (colors, type, spacing) is defined with CSS variables in `app/globals.css` — look for `--paper`, `--ink`, `--blue`, `--rust`, `--font-display`, and `--font-mono` near the top of the file. The layout components live in `components/site/`.

## Important: deployment note about storage

This project stores content in a JSON file (`data/db.json`) and uploaded images in `public/uploads`. That works great:

- Running locally
- Deployed to a normal server or VM (e.g. a small Droplet/VPS, Railway, Render, Fly.io, a Docker container with a persistent volume)

It will **not** persist writes on serverless platforms with a read-only or ephemeral filesystem, like **Vercel** or **Netlify** — edits made through `/admin` there would disappear on the next deploy or cold start. If you plan to deploy there, you have two options:

1. Deploy somewhere with persistent disk (VPS, Railway, Fly.io, a Docker host), or
2. Swap the JSON file for a real database (Postgres, Supabase, etc.) — the whole data layer is isolated in `lib/db.ts`, so this is a contained change: replace `readDb`/`writeDb`/`updateDb` with equivalent database calls and the rest of the app (API routes, admin UI, public page) doesn't need to change.

If you'd like, I can wire this up to Supabase or another database for you — just ask.

## Tech stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- Embla Carousel (project carousel view)
- Lucide icons
- JWT-signed cookie session for the admin login (`jsonwebtoken`)
