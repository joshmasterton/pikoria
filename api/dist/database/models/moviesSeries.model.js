import { pool } from "../../config/pool.config.js";
export const insertFavouriteMovieSeries = async (user_id, movie_series_id) => {
    const client = await pool.connect();
    try {
        // Does favourite movie_series already exist in database for the user
        const checkResult = await client.query(`
				SELECT 1 FROM favourite_movies_series
				WHERE user_id = $1 AND movie_series_id = $2;
			`, [user_id, movie_series_id]);
        if (checkResult.rowCount && checkResult.rowCount > 0) {
            // If already exists delete from database for user
            await client.query(`
					DELETE FROM favourite_movies_series
					WHERE user_id = $1 AND movie_series_id = $2;
				`, [user_id, movie_series_id]);
            return {
                message: `Removed movie_series from favourites`,
            };
        }
        else {
            // Add into database to store for user
            await client.query(`
					INSERT INTO favourite_movies_series (
						user_id, movie_series_id
					)	VALUES ($1, $2);
				`, [user_id, movie_series_id]);
            return {
                message: `Added movie_series to favourites`,
            };
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error inserting into movies_series");
        }
    }
    finally {
        client.release();
    }
};
// Get movie/series
export const getMoviesSeries = async (recommendationData, user_id) => {
    const client = await pool.connect();
    try {
        // filters of users form and page
        const { genre, content, region, page, search } = recommendationData;
        const genreFilter = genre ? `AND ${genre} = ANY(genre_ids)` : "";
        const typeFilter = content
            ? `AND type = '${content === "movies" ? "movie" : "series"}'`
            : "";
        const regionFilter = region && region !== "all" ? `AND original_language = '${region}'` : "";
        const searchFilter = search ? `AND (title ILIKE $4 OR name ILIKE $4)` : "";
        // Total movies_series
        const total = await client.query(`
				SELECT COUNT(*) as total FROM movies_series
				WHERE 1 = 1
				${search
            ? `AND (title ILIKE $1 OR name ILIKE $1)`
            : `
					${genreFilter}
					${typeFilter}
					${regionFilter}`}
			`, search ? [`%${search}%`] : []);
        const total_results = parseInt(total.rows[0].total, 10);
        const total_pages = Math.ceil(total_results / 20);
        // All movies_series
        const response = await client.query(`
        SELECT ms.*,
					CASE
						WHEN f.user_id IS NOT NULL THEN true
						ELSE false
						END AS liked
				FROM movies_series ms
				LEFT JOIN favourite_movies_series f
					ON ms.id = f.movie_series_id AND f.user_id = $1
        WHERE 1 = 1
				${search
            ? `${searchFilter}`
            : `${genreFilter}
        ${typeFilter}
        ${regionFilter}`}
				ORDER BY vote_average DESC
        OFFSET $2 LIMIT $3;
      `, search
            ? [user_id, page * 20, 20, `%${search}%`]
            : [user_id, page * 20, 20]);
        return {
            results: response.rows,
            total_pages,
            total_results,
        };
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error getting movies_series");
        }
    }
    finally {
        client.release();
    }
};
// Get favourite movies_series
export const getFavouriteMoviesSeries = async (user_id, page, search) => {
    const client = await pool.connect();
    try {
        // Total favourite_movies_series
        const total = await client.query(`
				SELECT COUNT(*) as total
				FROM movies_series ms
				JOIN favourite_movies_series f ON f.movie_series_id = ms.id
				WHERE f.user_id = $1
				${search ? `AND (title ILIKE $2 OR name ILIKE $2)` : ""}
			`, search ? [user_id, `%${search}%`] : [user_id]);
        const total_results = parseInt(total.rows[0].total, 10);
        const total_pages = Math.ceil(total_results / 20);
        // All favourite_movies_series for user
        const response = await client.query(`
        SELECT ms.*,
					CASE
						WHEN f.user_id IS NOT NULL THEN true
						ELSE false
						END AS liked
				FROM movies_series ms
				JOIN favourite_movies_series f ON f.movie_series_id = ms.id
        WHERE 1 = 1
				${search ? "AND (title ILIKE $3 OR name ILIKE $3)" : ""}
				ORDER BY vote_average DESC
        OFFSET $1 LIMIT $2;
      `, search ? [page * 20, 20, `%${search}%`] : [page * 20, 20]);
        return {
            results: response.rows,
            total_pages,
            total_results,
        };
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error getting movies_series");
        }
    }
    finally {
        client.release();
    }
};
// Get movie_series
export const getMovieSeries = async (id, content, user_id) => {
    // Movies or series
    const client = await pool.connect();
    try {
        const movieSeries = await client.query(`
			SELECT ms.*,
				CASE
					WHEN f.user_id IS NOT NULL THEN true
					ELSE false
					END AS liked
			FROM movies_series ms
			LEFT JOIN favourite_movies_series f
				ON ms.id = f.movie_series_id AND f.user_id = $1
			WHERE ms.id = $2 AND ms.type = $3
		`, [user_id, id, content]);
        if (movieSeries.rowCount === 0) {
            return;
        }
        return {
            ...movieSeries.rows[0],
        };
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error getting favourite movies_series");
        }
    }
    finally {
        client.release();
    }
};
