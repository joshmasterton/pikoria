import * as yup from "yup";

export const moviesSeriesSchema = yup.object().shape({
  genre: yup.number().required("Content type is required"),
  content: yup.string().required("Content type is required"),
  rating: yup.number().required("Rating is required"),
  release: yup
    .array()
    .of(yup.number())
    .length(2)
    .required("Release year is required"),
  runtime: yup
    .array()
    .of(yup.number())
    .length(2)
    .required("Runtime is required"),
  region: yup.string().required("Region preference is required"),
});
