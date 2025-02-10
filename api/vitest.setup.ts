import { afterAll, afterEach, beforeAll, beforeEach, vitest } from "vitest";
import { createDatabaseIfNotExists } from "./src/config/database.config";
import {
  createFavouriteMoviesSeriesTable,
  createMoviesSeriesTable,
  deleteFavouriteMoviesSeriesTable,
  deleteMoviesSeriesTable,
} from "./src/database/migrations/moviesseries.migration";
import {
  createStatusTable,
  deleteStatusTable,
} from "./src/database/migrations/status.migration";
import { storeMoviesSeries } from "./src/database/data/moviesSeries.data";
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
  await deleteMoviesSeriesTable();
  await deleteStatusTable();
  await deleteFavouriteMoviesSeriesTable();

  await createDatabaseIfNotExists();
  await createStatusTable();
  await createFavouriteMoviesSeriesTable();
  await createMoviesSeriesTable();

  await storeMoviesSeries(new Date().getFullYear() - 1);
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
  await deleteMoviesSeriesTable();
  await deleteStatusTable();
  await deleteFavouriteMoviesSeriesTable();
});
