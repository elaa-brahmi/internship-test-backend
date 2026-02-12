# Ecommerce Backend (Node + Express + Supabase)

Backend API for a simple ecommerce application. It exposes product and cart endpoints, connects to Supabase for data storage, and includes Swagger docs for easy inspection and testing.

## Tech Stack

- **Runtime**: Node.js (Express)
- **Database**: Supabase (Postgres)
- **Auth / DB client**: `@supabase/supabase-js`
- **API docs**: Swagger (`swagger-jsdoc`, `swagger-ui-express`)
- **Other**: `cors`, `dotenv`

## Getting Started (Local)

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Environment variables**

   Create a `.env` file in `backend` (already present in this project) with at least:

   ```bash
   PORT=5000
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Run the server**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000` (or whatever `PORT` you set).

## API Endpoints

Base URL (local): `http://localhost:<PORT>`

- **Health**
  - `GET /health` – simple health check.

- **Products**
  - `GET /api/products` – list all products.
    - Optional query: `?category=<string>` to filter by category.
  - `GET /api/products/:id` – get a single product by ID.
  - `POST /api/products` – create a new product (JSON body).
  - `PUT /api/products/:id` – update an existing product (JSON body).

- **Cart**
  - `POST /api/cart/add` – add a product to the cart or increase its quantity.
    - Body: `{ "productId": "<id>", "quantity": number }`
    - Decreases the product's `stock` by the added quantity if enough stock is available.

- **Swagger Docs**
  - `GET /api-docs` – interactive API documentation (Swagger UI).

## Deployment on Render

This backend is intended to run as a **Render Web Service**.

1. **Create a new Web Service** in Render and connect it to this repository.
2. **Environment**
   - Runtime: Node.js
   - Build command: `npm install`
   - Start command: `npm start` (runs `node app.js` / `index.js` depending on your script).
3. **Environment variables**
   - Configure `PORT`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` in Render’s **Environment** settings.
4. **Base URL in production**
   - Render gives you a URL like `https://your-service.onrender.com`.
   - Your frontend should call:
     - `https://your-service.onrender.com/api/products`
     - `https://your-service.onrender.com/api/cart/add`
     - `https://your-service.onrender.com/health`
     - `https://your-service.onrender.com/api-docs`

> Note: There are some Netlify-related files in the repo from experimentation, but the current production deployment target is **Render**.

