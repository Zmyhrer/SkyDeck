import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from the .env.local file
dotenv.config();

export const checkConnection = async () => {
  const client = await pool.connect();
  await client.query("SELECT NOW()"); // Simple query to test connection
  client.release();
};

const pool = new Pool({
  user: process.env.POSTGRES_USER, // From .env.local
  host: process.env.POSTGRES_HOST, // From .env.local
  database: process.env.POSTGRES_DB, // From .env.local
  password: process.env.POSTGRES_PASSWORD, // From .env.local
  port: parseInt(process.env.POSTGRES_PORT!) || 5432, // Fallback to 5432 if not set
});

export default pool;
