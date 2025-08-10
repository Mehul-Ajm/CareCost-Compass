# CareCost Compass

Small full‑stack demo for Cancer Treatment Cost Clarity (prompt 2) with a nod to Clinical Trials Made Easy (prompt 3).

## Architecture
- Frontend (`hack4hope/frontend/`): Next.js 15 + TypeScript + Tailwind. Bun for dev/build. Hero + selector + estimates + structured summary + resources; optional analysis view.
- Backend (`hack4hope/backend/`): Flask + CORS. Consistent JSON via Pydantic models. Optional OpenAI for summaries. Lightweight web lookup to attach canonical sources (Medicare, Medicaid, ACS) and demo estimates.

```
Browser ──HTTP── Frontend (Next.js)
                 │
                 └──JSON── Backend (Flask)
                              ├── OpenAI (optional)
                              └── Web lookups (DDG) → Sources
```

## Local setup

### Backend
```
cd hack4hope/backend
python3 -m venv venv
source venv/bin/activate
pip install -U pip
pip install flask flask-cors pydantic openai httpx python-dotenv

# Optional OpenAI
echo 'OPENAI_API_KEY=sk-...' > .env

python wsgi.py
```
- Serves at `http://127.0.0.1:5001`

### Frontend
```
cd hack4hope/frontend
bun install
echo 'NEXT_PUBLIC_API_BASE=http://127.0.0.1:5001' > .env.local
bun run dev
```
- App at `http://localhost:3000`

## API
- `GET /api/cost-estimate?state=CA`
  - `state`: string (e.g., CA)
  - `estimate`: `{ chemo?: number; radiation?: number; surgery?: number }`
  - `summary`: `{ intro: string; bullets: string[]; next_steps: string[] }`
  - `resources`: `[{ name, url, color? }]`
  - `used_ai`: boolean

## Commands
- Frontend dev: `bun run dev`
- Frontend build: `bun run build`
- Backend dev: `source venv/bin/activate && python wsgi.py`

## Notes
- Estimates are placeholders with simple scraping heuristics; not for medical or financial decisions.
- Without `OPENAI_API_KEY`, summaries use a structured fallback.


