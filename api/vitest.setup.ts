import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { createDatabaseIfNotExists } from "./src/config/database.config";
import {
  createMoviesSeriesTable,
  deleteMoviesSeriesTable,
} from "./src/database/migrations/moviesseries.migration";
import { pool } from "./src/config/pool.config";
import { PoolClient } from "pg";

let client: PoolClient;

beforeAll(async () => {
  await deleteMoviesSeriesTable();
  await createDatabaseIfNotExists();
  await createMoviesSeriesTable();
});

beforeEach(async () => {
  client = await pool.connect();
  await client.query("BEGIN");
});

afterEach(async () => {
  await client.query("ROLLBACK");
  client.release();
});

afterAll(async () => {
  await deleteMoviesSeriesTable();
});
