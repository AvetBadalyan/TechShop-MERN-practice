# Avet's TechShop

A full-stack e-commerce store built with the MERN stack. Browse products, search and filter by category and price, manage a cart, check out with PayPal, and administer products, users, and orders through a dedicated admin dashboard.

**Live demo:** https://avets.techshop.vercel.app

**Demo admin login** — explore the full admin area (dashboard, orders, products, users). Write operations are disabled on this account so the shared demo data stays intact.

```
Email:    avet@gmail.com
Password: 123456
```

---

## Tech Stack

| Layer      | Technology                                                                                |
| ---------- | ----------------------------------------------------------------------------------------- |
| Frontend   | React 19, Redux Toolkit + RTK Query, React Router 7, React-Bootstrap 5, Vite 7            |
| Forms      | react-hook-form + Zod (client-side validation with inline field errors)                   |
| Backend    | Node.js, Express 5, MongoDB + Mongoose 9                                                  |
| Auth       | JWT in HttpOnly cookie — XSS-resistant, SameSite=None in production for cross-site auth   |
| Validation | Zod schemas on both frontend and backend — same validation library, mirrored structure    |
| Images     | Multer (memory storage) → Cloudinary — no local disk, works on serverless hosts           |
| Payments   | PayPal SDK with server-side payment verification and replay-attack prevention             |
| Security   | Helmet, CORS, express-rate-limit, custom NoSQL injection sanitizer, demo guard middleware |
| Tooling    | ESLint (flat config, covers both frontend and backend), Prettier, deployed on Vercel      |

---

## Features

### Storefront

- Product listing with real-time search and pagination
- Category filter and sort (price, rating, newest) — filter state resets cleanly on navigation
- Product detail pages with image, description, rating, and review form
- Product image skeleton loading states during API fetch
- Hero carousel of top-rated products with fade transition
- Shopping cart with persisted state (localStorage), quantity controls, and stock awareness
- Cart checkout guard — logged-in users skip the login redirect and go straight to shipping

### Checkout

- 4-step checkout flow: Shipping → Payment → Place Order → Order confirmation
- Shipping form with Zod-validated fields and inline error messages
- PayPal payment with server-side verification before marking order paid
- Order page shows live payment status with formatted dates

### User accounts

- Registration and login with `react-hook-form` + Zod — inline validation (email format, password length, confirmation match)
- JWT stored in HttpOnly cookie — never accessible to JavaScript
- Profile page: update name, email, or password (optional) with inline field errors
- Order history table with real dates (`toLocaleDateString()`) and status icons

### Admin

- Dashboard with total sales, order/product/customer counts, 7-day CSS bar chart, and top-selling products table
- Product list with pagination, inline edit/delete, and confirmation modal before deletion
- Create and edit product forms with Cloudinary image upload and Zod validation
- User list with admin flag indicator and delete confirmation
- Order list with paid/delivered status and details link
- All write operations blocked for the read-only demo account (`demoGuard` middleware)

### Other

- Custom 404 page with gradient heading and home link
- Meaningful `<title>` on every route (`Sign In | TechShop`, `Order abc12345 | TechShop`, etc.)
- Consistent error handling: RTK Query load errors shown inline, mutation errors shown as toasts
- `react-toastify` for non-blocking feedback on all actions

---

## Architecture

The project is split into two independently deployable parts:

```
/
├── frontend/          React SPA (Vite)
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── slices/        RTK Query API slices + Redux reducers
│   │   ├── validators/    Zod schemas (mirrors backend/validators/)
│   │   └── utils/
│   └── vite.config.js
├── backend/           Express API
│   ├── app.js         Pure Express app — middleware + routes, no startup side effects
│   ├── server.js      Local dev entry point (calls app.listen)
│   ├── api/index.js   Vercel serverless entry point (exports app as default)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── validators/    Zod schemas
└── vercel.json        Monorepo deployment config — frontend + backend as one project
```

### Key backend decisions

**Auth** — JWT signed with `HS256`, stored in an `HttpOnly` cookie. In production: `SameSite=None; Secure` so the separately-hosted frontend can authenticate against the API. In development: `SameSite=Lax` so it works over plain HTTP without HTTPS.

**Validation** — Zod runs at the route layer via a `validate(schema)` middleware factory. On `ZodError` it returns `400 { message, errors: [{ field, message }] }`. The frontend mirrors the same Zod schemas so validation messages are consistent on both ends.

**Security layers:**

- `helmet` — secure response headers, CSP disabled to allow PayPal SDK
- `cors` — `CLIENT_URL` env var controls allowed origins (comma-separated list for multi-domain)
- `express-rate-limit` — 500 req/15min general, 10 req/15min on auth routes
- `sanitize` middleware — recursively strips `$`/`.` keys from request bodies to block NoSQL operator injection
- `checkObjectId` middleware — validates MongoDB ObjectId format before hitting the DB
- `demoGuard` middleware — blocks all write operations for the `DEMO_ADMIN_EMAIL` account

**Price integrity** — `addOrderItems` ignores client-sent prices entirely and re-fetches prices from the DB, then recalculates totals server-side. Prevents cart price manipulation.

**PayPal** — server-side OAuth2 token fetch → PayPal `/v2/checkout/orders/:id` verification → duplicate transaction check before marking order paid.

**Serverless-ready** — Mongoose connection is cached in a module-level variable and reused across warm invocations. `connectDB` does not call `process.exit` on error so a failed connection fails the request gracefully instead of killing the container.

---

## Getting Started

You need: a MongoDB Atlas cluster, a PayPal sandbox app (client ID + secret), and a Cloudinary account.

### Environment Variables

Copy `.env.example` to `.env` at the project root and fill in your values:

```
NODE_ENV=development
PORT=5000
MONGO_URL=<your_mongo_db_uri>
JWT_SECRET=<a_long_random_secret>
PAYPAL_CLIENT_ID=<your_paypal_sandbox_client_id>
PAYPAL_APP_SECRET=<your_paypal_sandbox_secret>
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
PAGINATION_LIMIT=8
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
# Owner admin (created by the seeder — keep this private)
OWNER_ADMIN_EMAIL=<your_email>
OWNER_ADMIN_PASSWORD=<your_password>
# Read-only demo admin email (demoGuard blocks writes for this account)
DEMO_ADMIN_EMAIL=avet@gmail.com
```

Locally you can leave `CLIENT_URL` and `VITE_API_URL` unset. CORS allows all origins in development and the Vite dev server proxies `/api` to `localhost:5000`.

### Install & Run

```bash
# Install all dependencies (root + frontend)
npm install
npm install --prefix frontend

# Run frontend (port 3000) and backend (port 5000) concurrently
npm run dev

# Backend only
npm run server

# Frontend only
npm run client
```

### Seed the Database

```bash
npm run data:import    # creates sample users, products, reviews, and orders
npm run data:destroy   # wipes all data
```

The seeder creates:

- **Owner admin** — credentials from `OWNER_ADMIN_EMAIL` / `OWNER_ADMIN_PASSWORD` in `.env`
- **Demo admin** — `avet@gmail.com` / `123456` (write-blocked by `demoGuard`)
- **2 regular users** — `user1@email.com` / `123456`, `user2@email.com` / `123456`
- **33 products** across 8 categories with seeded reviews
- **6 orders** assigned to the demo admin account so the profile page is populated on login

---

## Deployment (Vercel)

The app deploys as a single Vercel project with two services defined in `vercel.json`:

- **`frontend/`** — Vite SPA, served for all non-API routes
- **`backend/`** — Express API exposed as a serverless function via `backend/api/index.js`; `vercel.json` routes `/api/*` to it

Both services share one domain so the frontend calls the API at a relative `/api` path — no `VITE_API_URL` needed in production.

**Steps:**

1. Import the repository in Vercel (root directory: repository root)
2. Add all environment variables listed above (`NODE_ENV=production`)
3. Deploy — Vercel reads the `services` block in `vercel.json` and builds both

---

## Screenshots

> Screenshots pending — taken from the live demo after deployment.
> The app uses a custom "Midnight Tech" dark theme with a violet→cyan accent gradient.

---

## License

MIT
