import { pool } from "../../config/pool.config";

export const createStatusTable = async () => {
  const client = await pool.connect();

  try {
    await client.query(`
			CREATE TABLE IF NOT EXISTS setup_status (
				id SERIAL PRIMARY KEY,
				movies_series_stored BOOLEAN DEFAULT FALSE
			);
		`);

    await client.query(`
			INSERT INTO setup_status (
				id, movies_Series_stored
			) VALUES (
			 	1, FALSE
			) ON CONFLICT (id) DO NOTHING;
		`);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  } finally {
    client.release();
  }
};

export const deleteStatusTable = async () => {
  const client = await pool.connect();

  try {
    client.query("DROP TABLE IF EXISTS setup_status");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  } finally {
    client.release();
  }
};
