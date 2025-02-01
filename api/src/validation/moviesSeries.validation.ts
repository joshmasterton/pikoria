import * as yup from "yup";

// Get movies_series recommendation schema
export const moviesSeriesSchema = yup.object().shape({
  genre: yup.string().required("Genre is required"),
  content: yup
    .string()
    .required("Content type is required")
    .oneOf(["movies", "series"]),
  page: yup.number().required("page is required"),
  release: yup.array().of(yup.number()),
  runtime: yup.array().of(yup.number()),
  region: yup.string().required("Region is required"),
});

// Get movie_series schema
export const getMovieSeriesSchema = yup.object().shape({
  params: yup.object({
    id: yup.number().required(),
  }),
  query: yup.object({
    content: yup.string().oneOf(["movie", "series"]),
  }),
});

// Favourite movie_series schema
export const favouriteMoviesSeriesSchema = yup.object().shape({
  adult: yup.boolean(),
  backdrop_path: yup.string().nullable(),
  media_type: yup.string().oneOf(["movie", "series"]).required(),
  genres: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
    })
  ),
  homepage: yup.string().url().nullable(),
  id: yup.number().required(),
  liked: yup.boolean().default(false),
  origin_country: yup.array().of(yup.string()),
  original_language: yup.string(),
  overview: yup.string().nullable(),
  popularity: yup.number(),
  poster_path: yup.string().nullable(),
  production_companies: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
      logo_path: yup.string().nullable(),
      origin_country: yup.string().nullable(),
    })
  ),
  production_countries: yup.array().of(
    yup.object().shape({
      iso_3166_1: yup.string().required(),
      name: yup.string().required(),
    })
  ),
  spoken_languages: yup.array().of(
    yup.object().shape({
      iso_639_1: yup.string().required(),
      name: yup.string().required(),
    })
  ),
  status: yup.string().nullable(),
  tagline: yup.string().nullable(),
  vote_average: yup.number(),
  vote_count: yup.number(),

  // Properties specific to movies
  belongs_to_collection: yup
    .object()
    .shape({
      id: yup.number().nullable(),
      name: yup.string().nullable(),
      poster_path: yup.string().nullable(),
      backdrop_path: yup.string().nullable(),
    })
    .nullable(),
  budget: yup.number().nullable(),
  imdb_id: yup.string().nullable(),
  original_title: yup.string().nullable(),
  release_date: yup.string().nullable(),
  revenue: yup.number().nullable(),
  runtime: yup.number().nullable(),
  title: yup.string().nullable(),
  video: yup.boolean(),

  // Properties specific to series
  created_by: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().nullable(),
        credit_id: yup.string().nullable(),
        name: yup.string().nullable(),
        original_name: yup.string().nullable(),
        gender: yup.number().nullable(),
        profile_path: yup.string().nullable(),
      })
    )
    .nullable(),
  episode_run_time: yup.array().of(yup.number()).nullable(),
  first_air_date: yup.string().nullable(),
  in_production: yup.boolean().nullable(),
  languages: yup.array().of(yup.string()).nullable(),
  last_air_date: yup.string().nullable(),
  last_episode_to_air: yup
    .object()
    .shape({
      id: yup.number().nullable(),
      name: yup.string().nullable(),
      overview: yup.string().nullable(),
      vote_average: yup.number().nullable(),
      vote_count: yup.number().nullable(),
      air_date: yup.string().nullable(),
      episode_number: yup.number().nullable(),
      episode_type: yup.string().nullable(),
      production_code: yup.string().nullable(),
      runtime: yup.number().nullable(),
      season_number: yup.number().nullable(),
      show_id: yup.number().nullable(),
      still_path: yup.string().nullable(),
    })
    .nullable(),
  name: yup.string().nullable(),
  networks: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().nullable(),
        name: yup.string().nullable(),
        logo_path: yup.string().nullable(),
        origin_country: yup.string().nullable(),
      })
    )
    .nullable(),
  next_episode_to_air: yup.mixed().nullable(),
  number_of_episodes: yup.number().nullable(),
  number_of_seasons: yup.number().nullable(),
  original_name: yup.string().nullable(),
  seasons: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().nullable(),
        name: yup.string().nullable(),
        season_number: yup.number().nullable(),
        episode_count: yup.number().nullable(),
        air_date: yup.string().nullable(),
        poster_path: yup.string().nullable(),
      })
    )
    .nullable(),
  type: yup.string().nullable(),
});
