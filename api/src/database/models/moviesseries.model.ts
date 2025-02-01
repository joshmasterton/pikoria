import axios from "axios";
import { pool } from "../../config/pool.config";
import { MoviesSeriesType } from "../../types/moviesSeries.type";

export const insertFavouriteMoviesSeries = async (
  user_id: string,
  favouriteMovieSeries: MoviesSeriesType
) => {
  const client = await pool.connect();

  try {
    // Does favourite movie_series already exist in database for the user
    const checkQuery = `
			SELECT 1 FROM favourite_movies_series
			WHERE user_id = $1 AND movie_series_id = $2 AND media_type = $3
		`;

    const checkValues = [
      user_id,
      favouriteMovieSeries.id,
      favouriteMovieSeries.media_type,
    ];
    const checkResult = await client.query(checkQuery, checkValues);

    if (checkResult.rowCount && checkResult.rowCount > 0) {
      // If already exists delete from database for user
      const deleteQuery = `
				DELETE FROM favourite_movies_series
				WHERE user_id = $1 AND movie_series_id = $2 AND media_type = $3
			`;
      const deleteValues = [
        user_id,
        favouriteMovieSeries.id,
        favouriteMovieSeries.media_type,
      ];
      await client.query(deleteQuery, deleteValues);

      return {
        message: `Removed ${
          favouriteMovieSeries.title || favouriteMovieSeries.name
        } from favourites`,
      };
    } else {
      // Add into database to store for user
      const insertQuery = `
        INSERT INTO favourite_movies_series (
          user_id, movie_series_id, media_type, adult, backdrop_path, genre_ids,
          original_language, original_title, original_name, overview, popularity,
          poster_path, release_date, first_air_date, title, name, video,
          vote_average, vote_count
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19
        ) RETURNING *
      `;

      const insertValues = [
        user_id,
        favouriteMovieSeries.id,
        favouriteMovieSeries.media_type,
        favouriteMovieSeries.adult,
        favouriteMovieSeries.backdrop_path,
        favouriteMovieSeries.genres.map((g) => g.id), // Store only genre IDs
        favouriteMovieSeries.original_language,
        favouriteMovieSeries.original_title,
        favouriteMovieSeries.original_name,
        favouriteMovieSeries.overview,
        favouriteMovieSeries.popularity,
        favouriteMovieSeries.poster_path,
        favouriteMovieSeries.release_date,
        favouriteMovieSeries.first_air_date,
        favouriteMovieSeries.title,
        favouriteMovieSeries.name,
        favouriteMovieSeries.video,
        favouriteMovieSeries.vote_average,
        favouriteMovieSeries.vote_count,
      ];

      await client.query(insertQuery, insertValues);

      return {
        message: `Added ${
          favouriteMovieSeries.title || favouriteMovieSeries.name
        } to favourites`,
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

// Get favourite movies_series
export const processMoviesSeriesRetrieval = async (user_id: string) => {
  const client = await pool.connect();
  try {
    const query = `
			SELECT * FROM favourite_movies_series
			WHERE user_id = $1
		`;

    const response = await client.query(query, [user_id]);

    if (response.rowCount && response.rowCount > 0) {
      const favouriteMoviesSeries = response.rows as MoviesSeriesType[];

      const favouriteMoviesSeriesLiked: MoviesSeriesType[] = await Promise.all(
        favouriteMoviesSeries.map(async (movieSeries) => {
          const liked = await checkLikedStatus(movieSeries.id, user_id);

          return {
            ...movieSeries,
            liked: liked,
          };
        })
      );

      return favouriteMoviesSeriesLiked;
    }
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

// Get movie_series
export const processMovieSeriesRetrieval = async (
  movie_series_id: number,
  content: "movie" | "series",
  user_id?: string
) => {
  // TMDB API key
  const { TMDB_API_KEY, TMDB_URL } = process.env;

  if (!TMDB_API_KEY) {
    throw new Error("Environment variables missing");
  }

  // Movies or series
  const endpoint = content === "movie" ? "/movie" : "/tv";
  const client = await pool.connect();

  try {
    const TMDBResponse = await axios.get(
      `${TMDB_URL}${endpoint}/${movie_series_id}?api_key=${TMDB_API_KEY}`
    );

    const TMDBMovieSeries: MoviesSeriesType = TMDBResponse.data;

    if (!TMDBMovieSeries) {
      return;
    }

    const liked = await checkLikedStatus(TMDBMovieSeries.id, user_id);

    return {
      ...TMDBMovieSeries,
      liked: liked,
    } as MoviesSeriesType;
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

// Does favourite movie_series already exist in database for the user
export const checkLikedStatus = async (
  movies_series_id: number,
  user_id?: string
) => {
  const client = await pool.connect();

  try {
    const checkQuery = `
			SELECT 1 FROM favourite_movies_series
			WHERE user_id = $1 AND movie_series_id = $2
		`;

    const checkValues = [user_id, movies_series_id];

    const checkLiked = await client.query(checkQuery, checkValues);

    if (checkLiked.rowCount && checkLiked.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  } finally {
    client.release();
  }
};
