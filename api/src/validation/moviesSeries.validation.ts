import * as yup from "yup";

// Get movies_series recommendation schema
export const moviesSeriesSchema = yup.object().shape({
  genre: yup.string().required("Genre is required"),
  content: yup
    .string()
    .required("Content type is required")
    .oneOf(["movies", "series"]),
  page: yup.number().required("page is required"),
  region: yup.string().required("Region is required"),
  search: yup.string().optional(),
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
  string: yup.string().optional(),
});

// Like movie_series schema
export const likeMovieSeriesSchema = yup.object().shape({
  id: yup.number().required(),
  content: yup.string().oneOf(["movie", "series"]).required(),
});
