import { MoviesSeriesForm } from "../types/moviesSeries.type";
import {
  getMoviesSeries,
  insertFavouriteMovieSeries,
} from "../database/models/moviesSeries.model";

export const processGetMoviesSeries = async (
  recommendationData: MoviesSeriesForm,
  user_id?: string
) => {
  try {
    const moviesSeries = await getMoviesSeries(recommendationData, user_id);

    return moviesSeries;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// Like and insert movie series into favourites table
export const processLikeMovieSeries = async (
  user_id: string,
  movie_series_id: number
) => {
  try {
    // Insert into favourite_movies_series table
    return await insertFavouriteMovieSeries(user_id, movie_series_id);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
