# Mini ERP

A lightweight business management app for tracking customers, products, inventory, and delivery challans. It includes an authenticated dashboard with recent activity and low stock information.

## Features

- Dashboard with business activity and low stock overview
- Customer records, including customer type, status, and follow-up information
- Product catalog with SKU, pricing, warehouse, and stock thresholds
- Stock adjustments with movement history
- Challans linked to customers and products, with draft, confirmed, and cancelled statuses
- JWT-based login and protected application pages

## Tech stack

- **Client:** React, TypeScript, Vite, Tailwind CSS, React Router, Axios
- **Server:** Node.js, Express, TypeScript, Zod
- **Database:** PostgreSQL via Prisma (configured for Neon)

## Project structure

```text
client/   React web application
server/   Express API and Prisma schema/migrations
documents/ Project documents
```

## Requirements

- Node.js and npm
- A PostgreSQL database

## Setup

Install dependencies in each application directory:

```bash
cd client && npm install
cd ../server && npm install
```

Create `server/.env` with the database connection string and a secret used to sign login tokens:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
JWT_SECRET="replace-with-a-long-random-secret"
```

Create `client/.env` and point it at the API server:

```env
VITE_API_URL="http://localhost:3000/api"
```

Apply the database migrations and generate the Prisma client:

```bash
cd server
npx prisma migrate deploy
npx prisma generate
```

Start the API and client in separate terminals:

```bash
cd server && npm run dev
```

```bash
cd client && npm run dev
```

Open the local URL printed by Vite. Sign-in requires a user account in the database; configure one for your environment before using the app.

## Production builds

```bash
cd server && npm run build
cd ../client && npm run build
```

The server build generates the Prisma client before compiling TypeScript. The client build runs TypeScript checks and creates static assets with Vite.

## Tests

Run the client and server unit tests from their respective directories:

```bash
cd server && npm test
cd ../client && npm test
```

The server tests cover request validation, authentication helpers, and stock/challan service behavior using mocked database transactions. The client tests cover login state and role-based navigation. These unit tests do not require a live database.
