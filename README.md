# Blog Project frontend

React + Vite frontend for the Blog Project. The frontend calls a separate backend API.

## Requirements

- Node.js `20.19+` or `22.12+` (this project is also compatible with Node.js 24)
- npm (comes with Node.js)
- A running backend API for login, registration, posts, and other server-backed features

## Setup and run locally

Open a terminal in the `client` directory:

```powershell
cd C:\ALTERNATIVE\BlogProject_1\client
npm install
Copy-Item .env.example .env
```

Edit `.env` and set `VITE_API_BASE_URL` to the base URL of your backend API, for example:

```dotenv
VITE_API_BASE_URL=http://localhost:5000/api
```

Use the actual URL and API prefix expected by your backend. Then start the frontend:

```powershell
npm run dev
```

Vite prints the local address (normally `http://localhost:5173`). Keep the backend running separately. If you change `.env`, restart the Vite dev server.

## Available commands

```powershell
npm run dev      # start local development server
npm run build    # create production files in dist/
npm run preview  # serve the production build locally
npm run lint     # run Oxlint
```

## Deploy to Vercel

Import the GitHub repository into Vercel and set the project **Root Directory** to `client`. Use `npm run build` as the build command and `dist` as the output directory. Add `VITE_API_BASE_URL` in the Vercel project's Environment Variables, using the publicly reachable production backend URL. Redeploy after changing environment variables. The backend must allow requests from the deployed Vercel site (CORS).

Do not commit `.env` or production secrets. `.env` and `.env.*` are ignored by Git; `.env.example` is the safe template to commit. `VITE_*` values are included in frontend code sent to browsers, so put only public configuration such as an API base URL there, never credentials or private keys.
