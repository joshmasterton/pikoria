import { pool } from "../../config/pool.config.js";
export const createFavouriteMoviesSeriesTable = async () => {
    const query = `
		CREATE TABLE IF NOT EXISTS favourite_movies_series(
			id SERIAL PRIMARY KEY,
			movie_series_id INT NOT NULL,
			user_id VARCHAR(255) NOT NULL
		);
	`;
    const client = await pool.connect();
    try {
        await client.query(query);
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error creating favourite_movie_series table");
        }
    }
    finally {
        client.release();
    }
};
export const createMoviesSeriesTable = async () => {
    const query = `
		CREATE TABLE IF NOT EXISTS movies_series (
			id SERIAL PRIMARY KEY,
			tmdb_id INT UNIQUE NOT NULL,
			type VARCHAR(10) CHECK (type IN ('movie', 'series')) NOT NULL,
			title VARCHAR(255),
			name VARCHAR(255),
			original_title VARCHAR(255),
			original_name VARCHAR(255),
			original_language VARCHAR(10),
			overview TEXT,
			release_date VARCHAR(100),
			first_air_date VARCHAR(100),
			popularity DECIMAL(10, 5),
			vote_average DECIMAL(3, 2),
			vote_count INT,
			poster_path TEXT,
			backdrop_path TEXT,
			origin_country TEXT[],
			genre_ids INT[]
		);
	`;
    const client = await pool.connect();
    try {
        await client.query(query);
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error creating favourite_movie_series table");
        }
    }
    finally {
        client.release();
    }
};
export const deleteFavouriteMoviesSeriesTable = async () => {
    const client = await pool.connect();
    try {
        await client.query("DROP TABLE IF EXISTS favourite_movies_series");
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error deleting favourite movies_series table");
        }
    }
    finally {
        client.release();
    }
};
export const deleteMoviesSeriesTable = async () => {
    const client = await pool.connect();
    try {
        await client.query("DROP TABLE IF EXISTS movies_series");
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error deleting movies_series table");
        }
    }
    finally {
        client.release();
    }
};
