import axios from "axios";
import { pool } from "../../config/pool.config";
import { MoviesSeriesType } from "../../types/moviesSeries.type";

export const insertFavouriteMovieSeries = async (
  user_id: string,
  movieSeriesToLike: MoviesSeriesType
) => {
  const client = await pool.connect();

  try {
    // Does favourite movie_series already exist in database for the user
    const checkQuery = `
			SELECT 1 FROM favourite_movies_series
			WHERE user_id = $1 AND id = $2 AND media_type = $3
		`;

    const checkValues = [
      user_id,
      movieSeriesToLike.id,
      movieSeriesToLike.name ? "series" : "movie",
    ];
    const checkResult = await client.query(checkQuery, checkValues);

    if (checkResult.rowCount && checkResult.rowCount > 0) {
      // If already exists delete from database for user
      const deleteQuery = `
				DELETE FROM favourite_movies_series
				WHERE user_id = $1 AND id = $2 AND media_type = $3
			`;
      const deleteValues = [
        user_id,
        movieSeriesToLike.id,
        movieSeriesToLike.name ? "series" : "movie",
      ];
      await client.query(deleteQuery, deleteValues);

      return {
        message: `Removed ${
          movieSeriesToLike.title || movieSeriesToLike.name
        } from favourites`,
      };
    } else {
      // Add into database to store for user
      const insertQuery = `
        INSERT INTO favourite_movies_series (
          user_id, id, media_type, adult, backdrop_path, genre_ids,
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
        movieSeriesToLike.id,
        movieSeriesToLike.name ? "series" : "movie",
        movieSeriesToLike.adult,
        movieSeriesToLike.backdrop_path,
        movieSeriesToLike.genres.map((g) => g.id), // Store only genre IDs
        movieSeriesToLike.original_language,
        movieSeriesToLike.original_title,
        movieSeriesToLike.original_name,
        movieSeriesToLike.overview,
        movieSeriesToLike.popularity,
        movieSeriesToLike.poster_path,
        movieSeriesToLike.release_date,
        movieSeriesToLike.first_air_date,
        movieSeriesToLike.title,
        movieSeriesToLike.name,
        movieSeriesToLike.video,
        movieSeriesToLike.vote_average,
        movieSeriesToLike.vote_count,
      ];

      await client.query(insertQuery, insertValues);

      return {
        message: `Added ${
          movieSeriesToLike.title || movieSeriesToLike.name
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
export const getFavouriteMoviesSeries = async (
  user_id: string,
  page: number,
  search?: string
) => {
  const client = await pool.connect();
  try {
    // Check if search term included
    let searchQuery: string = "";
    let searchValues: (string | number)[] = [user_id];

    if (search && search.trim() !== "") {
      searchQuery = `AND (title ILIKE $2 OR name ILIKE $2)`;
      searchValues.push(`%${search}%`);
    }

    const totalQuery = `
			SELECT COUNT(*) AS total FROM favourite_movies_series
			WHERE user_id = $1 ${searchQuery}
		`;
    const totalResponse = await client.query(totalQuery, searchValues);
    const total_results = parseInt(totalResponse.rows[0].total, 10);
    const total_pages = Math.ceil(total_results / 20);

    const query = `
			SELECT * FROM favourite_movies_series
			WHERE user_id = $1 ${searchQuery}
			LIMIT 20 OFFSET $${search ? 3 : 2}
		`;

    searchValues.push(page * 20);

    const response = await client.query(query, searchValues);

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

      return {
        results: favouriteMoviesSeriesLiked,
        total_results,
        total_pages,
      };
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
export const getMovieSeries = async (
  id: number,
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
      `${TMDB_URL}${endpoint}/${id}?api_key=${TMDB_API_KEY}`
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
export const checkLikedStatus = async (id: number, user_id?: string) => {
  const client = await pool.connect();

  try {
    const checkQuery = `
			SELECT 1 FROM favourite_movies_series
			WHERE user_id = $1 AND id = $2
		`;

    const checkValues = [user_id, id];

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
