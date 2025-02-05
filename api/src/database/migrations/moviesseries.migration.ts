import { pool } from "../../config/pool.config";

export const createFavouriteMoviesSeriesTable = async () => {
  const query = `
		CREATE TABLE IF NOT EXISTS favourite_movies_series(
			database_id SERIAL PRIMARY KEY,
			user_id VARCHAR(255),
			id INTEGER NOT NULL,
			media_type VARCHAR(10) NOT NULL CHECK (media_type IN ('movie', 'series')),
			adult BOOLEAN DEFAULT false,
			backdrop_path VARCHAR(255) NOT NULL,
			genre_ids INTEGER[],
			homepage VARCHAR(255),
			origin_country TEXT[],
			original_language VARCHAR(20),
			overview TEXT,
			popularity DECIMAL(10, 2),
			poster_path VARCHAR(255),
			status VARCHAR(50),
			tagline TEXT,
			vote_average DECIMAL(3, 2),
			vote_count INTEGER,
			liked BOOLEAN DEFAULT false,
			belongs_to_collection JSONB,
			budget INTEGER,
			imdb_id VARCHAR(20),
			original_title VARCHAR(255),
			release_date VARCHAR(20),
			revenue BIGINT,
			runtime INTEGER,
			title VARCHAR(255),
			video BOOLEAN DEFAULT false,
			created_by JSONB,
			episode_run_time INTEGER[],
			first_air_date VARCHAR(20),
			in_production BOOLEAN,
			languages TEXT[],
			last_air_date VARCHAR(20),
			last_episode_to_air JSONB,
			name VARCHAR(255),
			next_episode_to_air JSONB,
			networks JSONB,
			number_of_episodes INTEGER,
			number_of_seasons INTEGER,
			original_name VARCHAR(255),
			seasons JSONB,
			type VARCHAR(50)
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
