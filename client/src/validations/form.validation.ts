import * as yup from "yup";

export const moviesSeriesSchema = yup.object().shape({
  genre: yup
    .number()
    .notOneOf([-1], "Genre is required")
    .required("Genre is required"),
  content: yup
    .string()
    .required("Content type is required")
    .oneOf(["movies", "series"]),
  region: yup.string().required("Region is required"),
  search: yup.string().optional(),
});

export const favouriteMoviesSeriesSchema = yup.object().shape({
  search: yup.string().optional(),
});
