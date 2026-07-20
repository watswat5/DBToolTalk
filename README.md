# Next.js + PostgreSQL Example

A simple tutorial project showing how to connect a Next.js app to a PostgreSQL database using the `pg` library.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `exampleenv.txt` to `.env.local`:

   **macOS/Linux:**
   ```bash
   cp exampleenv.txt .env.local
   ```
   **Windows (Command Prompt):**
   ```cmd
   copy exampleenv.txt .env.local
   ```
   **Windows (PowerShell):**
   ```powershell
   Copy-Item exampleenv.txt .env.local
   ```

   Then fill in your database credentials:
   ```
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=yourpassword
   POSTGRES_DATABASE=yourdb
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## How It Works

**`lib/db.ts`** — Creates a connection pool using environment variables. Import `pool` anywhere you need to query the database.

**`app/api/customer/route.ts`** — Demonstrates:
- `GET /api/customer` — fetch all customers
- `GET /api/customer?name=John` — filter by query parameter
- `POST /api/customer` — insert a new customer

**`app/api/customer/[id]/route.ts`** — Demonstrates dynamic route parameters:
- `GET /api/customer/John` — fetch a customer by name via URL segment

## Key Concepts

- **Connection pooling**: `new Pool(...)` in `lib/db.ts` reuses connections efficiently.
- **Parameterized queries**: Use `$1`, `$2`, etc. to safely pass user input — this prevents SQL injection.
- **Route handlers**: Next.js App Router uses `route.ts` files to define API endpoints.
- **Dynamic routes**: Folders named `[param]` create URL segments you can read from `context.params`.
