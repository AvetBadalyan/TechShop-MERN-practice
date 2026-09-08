# Avet's TechShop

A full-stack e-commerce store built with the MERN stack: browse products, search
and paginate, manage a cart, check out with PayPal, and administer products,
users, and orders through a dedicated admin area.

**Live demo:** https://avets-techshop.vercel.app

**Demo admin login** (read-only — you can explore the admin area, but changes are
disabled so the shared demo data stays intact):

```
Email:    avet@gmail.com
Password: 123456
```

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Install & Run](#install--run)
  - [Seed the Database](#seed-the-database)
- [Deployment (Vercel)](#deployment-vercel)

## Tech Stack

**Frontend:** React 19, Redux Toolkit + RTK Query, React Router 7, React-Bootstrap,
Vite.

**Backend:** Node.js, Express 5, MongoDB + Mongoose, JWT auth via HTTP-only
cookies, Zod validation, Cloudinary for image hosting.

**Tooling:** ESLint (flat config) + Prettier, deployed on Vercel.

## Features

- Product listing with search and pagination
- Product detail pages with reviews and ratings
- Top-products carousel
- Shopping cart with persisted state
- Checkout flow: shipping, payment method, order summary
- PayPal payment with server-side payment verification
- User registration, login, and profile with order history
- Admin area: manage products (with image upload), users, and orders
- Mark orders as paid / delivered

![Screenshot](./screenshots/techsop%20screenshot1.jpg)
![Screenshot](./screenshots/techsop%20screenshot2.jpg)
![Screenshot](./screenshots/techsop%20screenshot3.jpg)
![Screenshot](./screenshots/techsop%20screenshot4.jpg)

## Architecture

The app is split into two independently deployable parts:

- **`frontend/`** — the React (Vite) single-page app. Talks to the API via a
  base URL configured with `VITE_API_URL` (empty in development, where the Vite
  dev server proxies `/api` to the backend).
- **`backend/`** — the Express API. `backend/app.js` defines the app (middleware,
  routes) and exports it; `backend/server.js` starts it for local development,
  while `api/index.js` exposes the same app as a serverless function on Vercel.

Notable backend details:

- **Auth** — JWT stored in an HTTP-only cookie (XSS-resistant). Cross-site cookie
  flags (`SameSite=None; Secure`) are used in production so the separately hosted
  frontend can authenticate against the API.
- **Security** — `helmet` for secure headers, `express-rate-limit`, configurable
  CORS, and a small middleware that strips `$`/`.` keys to block NoSQL operator
  injection.
- **Validation** — Zod schemas validate request bodies at the route layer and
  return structured 400 errors.
- **Images** — uploads stream to Cloudinary (no local disk), so they persist
  across deploys and work on serverless hosts.
- **Payments** — PayPal orders are verified server-side before an order is marked
  paid, and each transaction is checked for reuse.

## Getting Started

You will need a MongoDB database, a PayPal sandbox client ID/secret, and a free
Cloudinary account.

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```
NODE_ENV=development
PORT=5000
MONGO_URL=<your_mongo_db_uri>
JWT_SECRET=<your_secret>
PAYPAL_CLIENT_ID=<your_paypal_client_id>
PAYPAL_APP_SECRET=<your_paypal_secret>
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
PAGINATION_LIMIT=8
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

Locally you can leave `CLIENT_URL` and `VITE_API_URL` unset: CORS allows all
origins and the frontend uses the Vite dev proxy.

### Install & Run

```bash
# from the repo root
npm install
npm install --prefix frontend

# run frontend (:3000) and backend (:5000) together
npm run dev

# or run the backend only
npm run server
```

### Seed the Database

```bash
npm run data:import    # load sample users and products
npm run data:destroy   # remove all data
```

## Deployment (Vercel)

The app deploys as a single Vercel project with two services, defined in
`vercel.json`:

- **frontend** (`frontend/`, Vite) — the SPA, served for all non-API routes.
- **backend** (`backend/`) — the Express API, exposed as a serverless function
  at `backend/api/index.js`; `vercel.json` routes `/api/*` to it.

Both services share one domain, so the frontend calls the API at a relative
`/api` path (no separate API URL needed).

**Setup**

- Import the repository in Vercel (Root Directory: repository root). Vercel reads
  the `services` block in `vercel.json` and builds both.
- Add the environment variables listed above (with `NODE_ENV=production`).
- Deploy.
