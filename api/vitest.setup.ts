import { afterAll, afterEach, beforeAll, beforeEach, vitest } from "vitest";
import { createDatabaseIfNotExists } from "./src/config/database.config";
import {
  createFavouriteMoviesSeriesTable,
  deleteFavouriteMoviesSeriesTable,
} from "./src/database/migrations/moviesseries.migration";
import { pool } from "./src/config/pool.config";
import { PoolClient } from "pg";

let client: PoolClient;

vitest.mock("firebase-admin", async () => {
  const actual = await vitest.importActual("firebase-admin");

  return {
    default: {
      ...actual,
      auth: () => ({
        verifyIdToken: vitest.fn().mockResolvedValue({
          uid: "test-user",
          email: "test@example.com",
        }),
      }),
    },
    initializeApp: vitest.fn(),
  };
});

beforeAll(async () => {
  await deleteFavouriteMoviesSeriesTable();
  await createDatabaseIfNotExists();
  await createFavouriteMoviesSeriesTable();
});

beforeEach(async () => {
  client = await pool.connect();
  await client.query("BEGIN");
});

afterEach(async () => {
  await client.query("ROLLBACK");
  await client.query("TRUNCATE TABLE favourite_movies_series CASCADE");
  client.release();
});

afterAll(async () => {
  await deleteFavouriteMoviesSeriesTable();
});
