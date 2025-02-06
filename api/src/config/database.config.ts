import { adminPoll } from "./pool.config";

const { POSTGRES_URL } = process.env;

export const createDatabaseIfNotExists = async () => {
  const client = await adminPoll.connect();

  if (!POSTGRES_URL) {
    throw new Error("DATABASE_URL could not be found");
  }

  const databaseName = new URL(POSTGRES_URL).pathname.split("/")[1];

  const response = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [POSTGRES_URL]
  );

  if (response.rowCount === 0) {
    await client.query(`CREATE DATABASE ${databaseName}`);
  } else {
    console.log(`Database ${databaseName} already exists`);
  }
  try {
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const pgError = error as { code: string };
      if (pgError.code === "42P04") {
        return console.log(`Database ${databaseName} already exists`);
      }
    }
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error creating database if not exists");
    }
  } finally {
    client.release();
  }
};
