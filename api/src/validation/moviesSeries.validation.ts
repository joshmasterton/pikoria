import * as yup from "yup";

// movies/series schema
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

// favourite movies/series schema
export const favouriteMoviesSeriesScheme = yup.object().shape({
  adult: yup.boolean(),
  backdrop_path: yup.string(),
  genre_ids: yup.array().of(yup.number()),
  id: yup.number().required(),
  origin_country: yup.array().of(yup.string()),
  original_language: yup.string(),
  original_name: yup.string(),
  overview: yup.string(),
  popularity: yup.number(),
  poster_path: yup.string(),
  first_air_date: yup.string(),
  name: yup.string().required(),
  vote_average: yup.number(),
  vote_count: yup.number(),
});
