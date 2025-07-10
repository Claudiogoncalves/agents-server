# agents-server

A Fastify server using TypeScript, Drizzle ORM, and Postgres.

## Technologies Used

- **Node.js** & **TypeScript**
- **Fastify**: Fast web framework for Node.js
- **Drizzle ORM**: Type-safe ORM for Postgres
- **Postgres.js**: SQL client for Node.js
- **Zod**: Schema validation
- **@fastify/cors**: CORS support
- **dotenv**: Environment variables (via `--env-file`)
- **Biome**: Linter and formatter
- **Ultracite**: Code style configuration

## Project Structure & Patterns

- **Modularization**: Organized by folders (`src/db`, `src/server.ts`, etc)
- **Type-safe**: TypeScript and Zod for validation
- **Environment-based config**: Sensitive data in `.env`
- **ES Modules**: `"type": "module"` in `package.json`

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone https://github.com/YOUR_USERNAME/agents-server.git
   cd agents-server
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure the `.env` file**
   ```
   DATABASE_URL=postgres://user:password@localhost:5432/database_name
   ```

4. **Run database seeds (if needed)**
   ```sh
   npm run db:seed
   ```

5. **Start the development server**
   ```sh
   npm run dev
   ```

6. **API Testing**
   - Use the `client.http` file with the VS Code REST Client extension to test endpoints.

## Main Scripts

- `npm run dev` — Start the server in development mode
- `npm run start` — Start the server in production mode
- `npm run db:seed` — Run database seed scripts

---

> **Note:**  
> Make sure to add a `.gitignore` file to exclude `node_modules` and `.env` from version control.