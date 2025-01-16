import { pool } from "../../config/pool.config";

export const createMoviesSeriesTable = async () => {
  const query = `
		CREATE TABLE IF NOT EXISTS movies_series (
			id SERIAL PRIMARY KEY,
			movie_series_id INTEGER NOT NULL,
			adult BOOLEAN DEFAULT false,
			backdrop_path VARCHAR(255) NOT NULL,
			genre_ids INTEGER[],
			original_language VARCHAR(20),
			original_title VARCHAR(255),
			original_name VARCHAR(255),
			overview TEXT,
			popularity DECIMAL(10, 2),
			poster_path VARCHAR(255),
			release_date VARCHAR(255),
			first_air_date VARCHAR(255),
			title VARCHAR(255),
			name VARCHAR(255),
			video BOOLEAN DEFAULT false,
			vote_average DECIMAL(3, 2),
			vote_count INTEGER,
			created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
		)
	`;

  const client = await pool.connect();

  try {
    await client.query(query);
    console.log("movies_series table created successully");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error creating movies_series table");
    }
  } finally {
    client.release();
  }
};

export const deleteMoviesSeriesTable = async () => {
  const client = await pool.connect();
  try {
    await client.query("DROP TABLE IF EXISTS movies_series");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error deleting movies_series table");
    }
  } finally {
    client.release();
  }
};
