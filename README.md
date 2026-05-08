# Muhammad Jasim Munir — Portfolio (Phase 1)

Brutalist developer-aesthetic portfolio.

**Stack**
- Frontend: Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion + TypeScript
- Backend: Node.js + Express + MongoDB (Mongoose) + JWT (ready for Phase 2 admin)
- Phase 1 ships seeded content via the backend `/api/*` endpoints. The public site fetches from those endpoints with a static fallback so it works even if the API is offline.

---

## Folder structure

```
portfolio/
├── frontend/      Next.js app (deploy to Vercel)
├── backend/       Express API + Mongo seed (deploy to Render/Railway)
└── README.md
```

---

## 1. Run locally

### Backend

```bash
cd backend
cp .env.example .env        # fill MONGO_URI, JWT_SECRET
npm install
npm run seed                # one-time: load resume content into MongoDB
npm run dev                 # http://localhost:5000
```

### Frontend

```bash
cd frontend
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:5000
npm install
npm run dev                         # http://localhost:3000
```

---

## 2. Deploy for FREE

### Database — MongoDB Atlas (free M0 cluster)
1. Go to https://mongodb.com/cloud/atlas → create free account.
2. Build a free **Shared M0** cluster.
3. Database Access → add user (username + password).
4. Network Access → allow `0.0.0.0/0` (or Render's egress IPs).
5. Copy the connection string: `mongodb+srv://USER:PASS@cluster.xxx.mongodb.net/portfolio`.

### Backend — Render (free web service)
1. Push the `backend/` folder to its own GitHub repo (or push the whole repo and set root dir).
2. https://render.com → New → Web Service → connect repo.
3. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Environment variables:
   - `MONGO_URI` = your Atlas string
   - `JWT_SECRET` = any long random string
   - `CLIENT_ORIGIN` = your Vercel URL (e.g. `https://jasim.vercel.app`)
   - `PORT` = `5000`
5. Deploy. After first deploy, open Render Shell and run `npm run seed` once.

> Render free tier sleeps after 15 min of inactivity — first request takes ~30s to wake. The frontend has a static fallback so the page never breaks.

**Alternative free hosts:** Railway ($5 free credit/mo), Fly.io, Cyclic.

### Frontend — Vercel (free Hobby tier)
1. Push the `frontend/` folder to GitHub.
2. https://vercel.com → New Project → import repo.
3. Settings:
   - Root Directory: `frontend`
   - Framework: Next.js (auto-detected)
4. Environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render URL (e.g. `https://jasim-api.onrender.com`)
5. Deploy. Done.

---

## 3. Phase 2 (admin CMS) — already scaffolded

The backend already includes:
- `User` model with bcrypt password hashing
- `POST /api/auth/login` returning JWT
- `protect` + `adminOnly` middleware
- All resource routes accept POST/PUT/DELETE behind `protect, adminOnly`

To add the admin UI later, build pages under `frontend/app/admin/*` that call those endpoints with `Authorization: Bearer <token>`. Models, validation, and uploads (multer) are wired and ready.

---

## 4. Resume PDF

Drop your resume at `frontend/public/resume.pdf` — the **Download Resume** button links to `/resume.pdf`.

---

## 5. Replace seed content

Edit `backend/seed/data.js` and re-run `npm run seed`. Or use the admin endpoints once Phase 2 is built.
