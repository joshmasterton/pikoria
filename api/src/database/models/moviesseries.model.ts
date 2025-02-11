import { pool } from "../../config/pool.config";
import {
  MoviesSeries,
  MoviesSeriesForm,
  MoviesSeriesWithResults,
} from "../../types/moviesSeries.type";

export const insertFavouriteMovieSeries = async (
  user_id: string,
  movie_series_id: number
) => {
  const client = await pool.connect();

  try {
    // Does favourite movie_series already exist in database for the user
    const checkResult = await client.query(
      `
				SELECT 1 FROM favourite_movies_series
				WHERE user_id = $1 AND movie_series_id = $2;
			`,
      [user_id, movie_series_id]
    );

    if (checkResult.rowCount && checkResult.rowCount > 0) {
      // If already exists delete from database for user
      await client.query(
        `
					DELETE FROM favourite_movies_series
					WHERE user_id = $1 AND movie_series_id = $2;
				`,
        [user_id, movie_series_id]
      );

      return {
        message: `Removed movie_series from favourites`,
      };
    } else {
      // Add into database to store for user
      await client.query(
        `
					INSERT INTO favourite_movies_series (
						user_id, movie_series_id
					)	VALUES ($1, $2);
				`,
        [user_id, movie_series_id]
      );

      return {
        message: `Added movie_series to favourites`,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error inserting into movies_series");
    }
  } finally {
    client.release();
  }
};

// Get movie/series
export const getMoviesSeries = async (
  recommendationData: MoviesSeriesForm,
  user_id?: string
) => {
  const client = await pool.connect();

  try {
    // filters of users form and page
    const { genre, content, region, page, search } = recommendationData;
    const genreFilter = genre ? `AND ${genre} = ANY(genre_ids)` : "";
    const typeFilter = content
      ? `AND type = '${content === "movies" ? "movie" : "series"}'`
      : "";
    const regionFilter =
      region && region !== "all" ? `AND original_language = '${region}'` : "";
    const searchFilter = search ? `AND (title ILIKE $4 OR name ILIKE $4)` : "";

    // Total movies_series
    const total = await client.query(
      `
				SELECT COUNT(*) as total FROM movies_series
				WHERE 1 = 1
				${
          search
            ? `AND (title ILIKE $1 OR name ILIKE $1)`
            : `
					${genreFilter}
					${typeFilter}
					${regionFilter}`
        }
			`,
      search ? [`%${search}%`] : []
    );
    const total_results = parseInt(total.rows[0].total, 10);
    const total_pages = Math.ceil(total_results / 20);

    // All movies_series
    const response = await client.query(
      `
				WITH filtered_movies_series AS (
					SELECT DISTINCT ms.*
					FROM movies_series ms
					LEFT JOIN favourite_movies_series f
						ON ms.id = f.movie_Series_id AND f.user_id = $1
					WHERE 1 = 1
					${
            search
              ? `${searchFilter}`
              : `${genreFilter}
					${typeFilter}
					${regionFilter}`
          }
				)
        SELECT fm.*,
					CASE
						WHEN f.user_id IS NOT NULL THEN true
						ELSE false
						END AS liked
				FROM filtered_movies_series fm
				LEFT JOIN favourite_movies_series f
					ON fm.id = f.movie_series_id AND f.user_id = $1
				ORDER BY (fm.vote_average * 2 + fm.popularity * 0.5 + fm.vote_count * 0.1) DESC
        OFFSET $2 LIMIT $3;
      `,
      search
        ? [user_id, page * 20, 20, `%${search}%`]
        : [user_id, page * 20, 20]
    );

    return {
      results: response.rows as MoviesSeries[],
      total_pages,
      total_results,
    } as MoviesSeriesWithResults;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error getting movies_series");
    }
  } finally {
    client.release();
  }
};

// Get favourite movies_series
export const getFavouriteMoviesSeries = async (
  user_id: string,
  page: number,
  search?: string
) => {
  const client = await pool.connect();

  try {
    // Total favourite_movies_series
    const total = await client.query(
      `
				SELECT COUNT(*) as total
				FROM movies_series ms
				JOIN favourite_movies_series f ON f.movie_series_id = ms.id
				WHERE f.user_id = $1
				${search ? `AND (title ILIKE $2 OR name ILIKE $2)` : ""}
			`,
      search ? [user_id, `%${search}%`] : [user_id]
    );

    const total_results = parseInt(total.rows[0].total, 10);
    const total_pages = Math.ceil(total_results / 20);

    // All favourite_movies_series for user
    const response = await client.query(
      `
				WITH filtered_movies_series AS (
					SELECT DISTINCT ms.*
					FROM movies_series ms
					JOIN favourite_movies_series f
						ON f.movie_series_id = ms.id AND f.user_id = $1
					WHERE 1 = 1
					${search ? "AND (title ILIKE $4 OR name ILIKE $4)" : ""}
				)
        SELECT fm.*,
					CASE
						WHEN f.user_id IS NOT NULL THEN true
						ELSE false
						END AS liked
				FROM filtered_movies_series fm
				JOIN favourite_movies_series f
					ON f.movie_series_id = fm.id AND f.user_id = $1
				ORDER BY (fm.vote_average * 2 + fm.popularity * 0.5 + fm.vote_count * 0.1) DESC
        OFFSET $2 LIMIT $3;
      `,
      search
        ? [user_id, page * 20, 20, `%${search}%`]
        : [user_id, page * 20, 20]
    );

    return {
      results: response.rows as MoviesSeries[],
      total_pages,
      total_results,
    } as MoviesSeriesWithResults;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error getting movies_series");
    }
  } finally {
    client.release();
  }
};

// Get movie_series
export const getMovieSeries = async (
  id: number,
  content: "movie" | "series",
  user_id?: string
) => {
  // Movies or series
  const client = await pool.connect();

  try {
    const movieSeries = await client.query(
      `
			SELECT ms.*,
				CASE
					WHEN f.user_id IS NOT NULL THEN true
					ELSE false
					END AS liked
			FROM movies_series ms
			LEFT JOIN favourite_movies_series f
				ON ms.id = f.movie_series_id AND f.user_id = $1
			WHERE ms.id = $2 AND ms.type = $3
		`,
      [user_id, id, content]
    );

    if (movieSeries.rowCount === 0) {
      return;
    }

    return {
      ...movieSeries.rows[0],
    } as MoviesSeries;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error getting favourite movies_series");
    }
  } finally {
    client.release();
  }
};
