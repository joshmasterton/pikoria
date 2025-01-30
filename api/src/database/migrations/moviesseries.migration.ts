import { pool } from "../../config/pool.config";

export const createFavouriteMoviesSeriesTable = async () => {
  const query = `
		CREATE TABLE IF NOT EXISTS favourite_movies_series(
			id SERIAL PRIMARY KEY,
			user_id VARCHAR(255),
			adult BOOLEAN DEFAULT false,
			backdrop_path VARCHAR(255) NOT NULL,
			genre_ids INTEGER[],
			movie_series_id INTEGER NOT NULL,
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
			vote_count INTEGER
		)
	`;

  const client = await pool.connect();

  try {
    await client.query(query);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error creating favourite_movie_series table");
    }
  } finally {
    client.release();
  }
};

export const deleteFavouriteMoviesSeriesTable = async () => {
  const client = await pool.connect();
  try {
    await client.query("DROP TABLE IF EXISTS favourite_movies_series");
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
