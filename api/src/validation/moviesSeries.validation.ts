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
