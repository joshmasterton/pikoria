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

export const getFavouriteMoviesSeriesSchema = yup.object().shape({
  page: yup.number().required(),
});

// Like movie_series schema
export const likeMovieSeriesSchema = yup.object().shape({
  id: yup.number().required(),
  content: yup.string().oneOf(["movie", "series"]).required(),
});
