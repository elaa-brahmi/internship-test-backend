# Ecommerce Backend

Node.js + Express + Supabase backend for an ecommerce application. It exposes product and cart endpoints and uses Swagger for API documentation.

## Tech Stack

- Node.js (Express)
- Supabase (Postgres) via `@supabase/supabase-js`
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)
- `cors`, `dotenv`

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with the required variables (for example: `PORT`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).

3. Start the server:

   ```bash
   npm start
   ```

## Main Endpoints

- `GET /health` – health check.
- `GET /api/products` – list products (supports optional `category` query).
- `GET /api/products/:id` – get a single product.
- `POST /api/products` – create a product.
- `PUT /api/products/:id` – update a product.
- `POST /api/cart/add` – add to cart and decrease product stock.
- `GET /api-docs` – Swagger UI with API documentation.

