import axios from "axios";
import {
  MoviesSeriesForm,
  TMDBMovieSeriesType,
} from "../types/moviesSeries.type";
import { addMoviesSeries } from "../database/models/moviesseries.model";

export const processMoviesSeriesRecommendation = async (
  recommendationData: MoviesSeriesForm
) => {
  try {
    const { TMDB_API_KEY, TMDB_URL } = process.env;

    const endpoint =
      recommendationData.content === "movies"
        ? "/discover/movie"
        : "/discover/tv";

    const params =
      recommendationData.content === "movies"
        ? {
            api_key: TMDB_API_KEY,
            include_video: true,
            "vote_count.gte": 400,
            ...(recommendationData.genre !== 0 && {
              with_genres: recommendationData.genre,
            }),
            "vote_average.gte": recommendationData.rating,
            "primary_release_date.gte": `${recommendationData.release[0]}-01-01`,
            "primary_release_date.lte": `${recommendationData.release[1]}-12-31`,
            "with_runtime.gte": `${recommendationData.runtime[0]}`,
            "with_runtime.lte": `${recommendationData.runtime[1]}`,
            ...(recommendationData.region !== "All" && {
              with_origin_country: recommendationData.region,
              sort_by: "vote_average.desc",
            }),
          }
        : {
            api_key: TMDB_API_KEY,
            include_video: true,
            "vote_count.gte": 400,
            ...(recommendationData.genre !== 0 && {
              with_genres: recommendationData.genre,
            }),
            "vote_average.gte": recommendationData.rating,
            "first_air_date.gte": `${recommendationData.release[0]}-01-01`,
            "first_air_date.lte": `${recommendationData.release[1]}-12-31`,
            "with_runtime.gte": `${recommendationData.runtime[0]}`,
            "with_runtime.lte": `${recommendationData.runtime[1]}`,
            ...(recommendationData.region !== "All" && {
              with_origin_country: recommendationData.region,
            }),
            sort_by: "vote_average.desc",
          };

    const TMDBResponse = await axios.get(`${TMDB_URL}${endpoint}`, {
      params,
    });

    const TMDBMoviesSeries: TMDBMovieSeriesType[] = TMDBResponse.data.results;

    if (TMDBMoviesSeries) {
      await addMoviesSeries(TMDBMoviesSeries);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
