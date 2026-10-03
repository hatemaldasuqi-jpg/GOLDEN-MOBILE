// Shared Postgres connection pool (works with Vercel Postgres, Neon,
// Supabase, Railway Postgres — anything that gives you a standard
// connection string in DATABASE_URL).
//
// Unlike the old SQLite file, Postgres lives on a real database server,
// so it works correctly on serverless hosts like Vercel where the
// filesystem is not persistent between requests.

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    "\n⚠️  DATABASE_URL is not set — the app cannot connect to Postgres.\n" +
      "   Set it in your .env (local) or in your Vercel project's Environment Variables.\n"
  );
}

const pool = new Pool({
  connectionString,
  // Most hosted Postgres providers require SSL. Set PGSSL=false in .env
  // only if you're pointing at a local Postgres with no SSL configured.
  ssl: process.env.PGSSL === "false" ? false : { rejectUnauthorized: false },
  max: 5,
});

module.exports = pool;
