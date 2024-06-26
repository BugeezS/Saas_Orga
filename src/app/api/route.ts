// pages/api/dépenses.ts

import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a pool of connections to the database
const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "Dépenses",
  password: process.env.POSTGRES_PASSWORD || "password",
  port: 5432,
});

export async function GET() {
  let client;
  try {
    // Connect to the database
    client = await pool.connect();

    // Execute a query to fetch the data
    const result = await client.query("SELECT * FROM dépenses");

    // Release the connection back to the pool
    client.release();

    // Send the data as a JSON response
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    // Ensure client gets released in case of error
    if (client) {
      client.release();
    }

    // Log the error for debugging purposes
    console.error("Error fetching dépenses:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Error fetching dépenses" },
      { status: 500 },
    );
  }
}
