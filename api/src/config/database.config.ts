import pg from "pg";

const { Pool } = pg;

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;

const adminPoll = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: "postgres",
});

export const createDatabaseIfNotExists = async () => {
  const client = await adminPoll.connect();

  const response = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [POSTGRES_DB]
  );

  if (response.rowCount === 0) {
    await client.query(`CREATE DATABASE ${POSTGRES_DB}`);
  } else {
    console.log(`Database ${POSTGRES_DB} already exists`);
  }
  try {
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error creating database if not exists");
    }
  } finally {
    client.release();
  }
};

export const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  port: Number(POSTGRES_PORT),
});
