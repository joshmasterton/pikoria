import axios from "axios";
import {
  MoviesSeriesForm,
  MoviesSeriesRecommendationsType,
  MoviesSeriesType,
} from "../types/moviesSeries.type";
import {
  checkLikedStatus,
  insertFavouriteMoviesSeries,
} from "../database/models/moviesseries.model";

export const processMoviesSeriesRecommendation = async (
  recommendationData: MoviesSeriesForm,
  user_id?: string
) => {
  try {
    // TMDB API key
    const { TMDB_API_KEY, TMDB_URL } = process.env;

    // Movies or series
    const endpoint =
      recommendationData.content === "movies"
        ? "/discover/movie"
        : "/discover/tv";

    // Get TMDB movies_series based off user forms
    const params =
      recommendationData.content === "movies"
        ? {
            api_key: TMDB_API_KEY,
            include_video: true,
            page: recommendationData.page,
            "vote_count.gte": 400,
            ...(recommendationData.genre !== 0 && {
              with_genres: recommendationData.genre,
            }),
            "primary_release_date.gte": `${recommendationData.release[0]}-01-01`,
            "primary_release_date.lte": `${recommendationData.release[1]}-12-31`,
            "with_runtime.gte": `${recommendationData.runtime[0]}`,
            "with_runtime.lte": `${recommendationData.runtime[1]}`,
            ...(recommendationData.region !== "all" && {
              with_origin_country: recommendationData.region,
              sort_by: "vote_average.desc",
            }),
          }
        : {
            api_key: TMDB_API_KEY,
            include_video: true,
            page: recommendationData.page,
            "vote_count.gte": 400,
            ...(recommendationData.genre !== 0 && {
              with_genres: recommendationData.genre,
            }),
            "first_air_date.gte": `${recommendationData.release[0]}-01-01`,
            "first_air_date.lte": `${recommendationData.release[1]}-12-31`,
            "with_runtime.gte": `${recommendationData.runtime[0]}`,
            "with_runtime.lte": `${recommendationData.runtime[1]}`,
            ...(recommendationData.region !== "all" && {
              with_origin_country: recommendationData.region,
            }),
            sort_by: "vote_average.desc",
          };

    const TMDBResponse = await axios.get(`${TMDB_URL}${endpoint}`, {
      params,
    });

    const TMDBMoviesSeriesWithLike:
      | MoviesSeriesRecommendationsType[]
      | undefined = await Promise.all(
      TMDBResponse.data.results.map(
        async (movieSeries: MoviesSeriesRecommendationsType) => {
          const liked = await checkLikedStatus(movieSeries.id, user_id);

          return {
            ...movieSeries,
            liked: liked,
          };
        }
      )
    );

    return TMDBMoviesSeriesWithLike;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// Process favourite movie_series request
export const processFavouriteMoviesSeries = async (
  user_id: string,
  favouriteMovieSeries: MoviesSeriesType
) => {
  try {
    // Insert into favourite_movies_series table
    return await insertFavouriteMoviesSeries(user_id, favouriteMovieSeries);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
