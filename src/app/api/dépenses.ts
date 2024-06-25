// pages/api/dépenses.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

let port: any = process.env.POSTGRES_PORT || "5432";

// Create a pool of connections to the database
const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "host.docker.internal",
  database: process.env.POSTGRES_DB || "dépenses",
  password: process.env.POSTGRES_PASSWORD || "password",
  port: port,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Execute a query to fetch the data
    const result = await client.query("SELECT * FROM dépenses");

    // Release the connection back to the pool
    client.release();

    // Send the data as a JSON response
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
