import { pool } from "../../config/pool.config";
import {
  MovieSeriesType,
  TMDBMovieSeriesType,
} from "../../types/moviesSeries.type";

export const addMoviesSeries = async (moviesSeries: TMDBMovieSeriesType[]) => {
  const query = `
		INSERT INTO movies_series (
			adult, backdrop_path, genre_ids,
			movie_series_id, original_language,
			original_title, original_name, overview,
			popularity, poster_path, release_date, first_air_date,
			title, name, video, vote_average, vote_count
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7,
			$8, $9, $10, $11, $12, $13,
			$14, $15, $16, $17
		) RETURNING *;
	`;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const movieSeries of moviesSeries) {
      const {
        adult,
        backdrop_path,
        genre_ids,
        id,
        original_language,
        original_title,
        original_name,
        overview,
        popularity,
        poster_path,
        release_date,
        first_air_date,
        title,
        name,
        video,
        vote_average,
        vote_count,
      } = movieSeries;

      const checkQuery = `SELECT 1 FROM movies_series WHERE movie_series_id = $1`;
      const checkResult = await client.query(checkQuery, [id]);

      if (checkResult.rowCount === 0) {
        await client.query(query, [
          adult,
          `https://image.tmdb.org/t/p/original${backdrop_path}`,
          genre_ids,
          id,
          original_language,
          original_title,
          original_name,
          overview,
          popularity,
          `https://image.tmdb.org/t/p/original${poster_path}`,
          release_date,
          first_air_date,
          title,
          name,
          video,
          vote_average,
          vote_count,
        ]);

        console.log(
          `Inserted ${title || name} into movies_series successfully`
        );
      } else {
        console.log(`${title || name} already exists in database`);
      }
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error adding movies/series to database");
    }
  } finally {
    client.release();
  }
};

export const getMoviesSeries = async (
  searchQuery: string = "",
  page: number = 0,
  pageSize: number = 20
) => {
  const offset = page * pageSize;

  const query = `
		SELECT * FROM movies_series
		WHERE (title ILIKE $1 OR name ILIKE $1)
		LIMIT $2 OFFSET $3;
	`;

  const client = await pool.connect();

  try {
    const result = await client.query(query, [
      `%${searchQuery}%`,
      pageSize,
      offset,
    ]);

    const countResult = await client.query(
      `
			SELECT COUNT(*) FROM movies_series
			WHERE (title ILIKE $1 OR name ILIKE $1);
		`,
      [`%${searchQuery}%`]
    );

    return {
      data: result.rows[0] ? (result.rows as MovieSeriesType[]) : undefined,
      total: parseInt(countResult.rows[0].count),
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / pageSize),
      currentPage: page,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error getting movies/series");
    }
  } finally {
    client.release();
  }
};
