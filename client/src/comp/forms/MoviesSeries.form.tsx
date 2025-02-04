import Card from "@mui/material/Card";
import { Formik } from "formik";
import { moviesSeriesSchema } from "../../validations/form.validation";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import {
  getMoviesSeriesRecommendation,
  setFormData,
  setPage,
} from "../../redux/moviesSeriesSlice.redux";

export const MoviesSeriesForm = () => {
  const dispatch = useAppDispatch();
  const { moviesSeriesForm } = useAppSelector((state) => state.moviesSeries);

  return (
    <Card elevation={0} sx={{ overflow: "visible", background: "transparent" }}>
      <Formik
        validationSchema={moviesSeriesSchema}
        initialValues={{
          genre: moviesSeriesForm?.genre ?? 0,
          content: moviesSeriesForm?.content ?? "series",
          release: [2000, 2025],
          runtime: [0, 180],
          region: moviesSeriesForm?.region ?? "all",
        }}
        onSubmit={async (values) => {
          await dispatch(
            getMoviesSeriesRecommendation({
              genre: values.genre,
              content: values.content,
              release: values.release,
              runtime: values.runtime,
              region: values.region,
              page: 1,
            })
          );
          dispatch(
            setFormData({
              genre: values.genre,
              content: values.content,
              release: values.release,
              runtime: values.runtime,
              region: values.region,
              page: 1,
            })
          );
          dispatch(setPage(1));
        }}
      >
        {({
          values,
          touched,
          handleSubmit,
          setFieldValue,
          handleBlur,
          errors,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Stack gap={2} direction="row" flexWrap="wrap">
                <FormControl
                  size="small"
                  error={Boolean(errors.content && touched.content)}
                >
                  <InputLabel id="content-select-label">Content</InputLabel>
                  <Select
                    label="Content"
                    id="content-select"
                    name="content"
                    value={values.content}
                    onBlur={handleBlur}
                    onChange={async (e) => {
                      // Change content type
                      const newContentValue = e.target.value;
                      await setFieldValue("content", newContentValue);

                      // Switch content value if action or sci-fi selected for tmdb genre labelling
                      if (newContentValue === "series" && values.genre === 28) {
                        await setFieldValue("genre", 10759);
                      } else if (
                        newContentValue === "movies" &&
                        values.genre === 10759
                      ) {
                        await setFieldValue("genre", 28);
                      } else if (
                        newContentValue === "series" &&
                        values.genre === 878
                      ) {
                        await setFieldValue("genre", 10765);
                      } else if (
                        newContentValue === "movies" &&
                        values.genre === 10765
                      ) {
                        await setFieldValue("genre", 878);
                      }

                      handleSubmit();
                    }}
                    labelId="content-select-label"
                  >
                    <MenuItem value="movies">Movies</MenuItem>
                    <MenuItem value="series">Series</MenuItem>
                  </Select>
                  {errors.genre && touched.genre && (
                    <FormHelperText>{errors.genre}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  size="small"
                  error={Boolean(errors.genre && touched.genre)}
                >
                  <InputLabel id="genre-select-label">Genre</InputLabel>
                  <Select
                    label="Genre"
                    id="genre-select"
                    name="genre"
                    value={values.genre}
                    onBlur={handleBlur}
                    onChange={async (e) => {
                      await setFieldValue("genre", e.target.value);
                      handleSubmit();
                    }}
                    labelId="genre-select-label"
                  >
                    <MenuItem value={0}>Any</MenuItem>
                    <MenuItem value={values.content === "movies" ? 28 : 10759}>
                      Action
                    </MenuItem>
                    <MenuItem value={18}>Drama</MenuItem>
                    <MenuItem value={80}>Crime</MenuItem>
                    <MenuItem value={35}>Comedy</MenuItem>
                    <MenuItem value={values.content === "movies" ? 878 : 10765}>
                      Sci-Fi
                    </MenuItem>
                  </Select>
                  {errors.genre && touched.genre && (
                    <FormHelperText>{errors.genre}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  size="small"
                  error={Boolean(errors.region && touched.region)}
                >
                  <InputLabel id="region-select-label">Region</InputLabel>
                  <Select
                    label="Region"
                    id="region-select"
                    name="region"
                    value={values.region}
                    onBlur={handleBlur}
                    onChange={async (e) => {
                      await setFieldValue("region", e.target.value);
                      handleSubmit();
                    }}
                    labelId="region-select-label"
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="US">United states</MenuItem>
                    <MenuItem value="JP">Japanese</MenuItem>
                    <MenuItem value="ES">Spanish</MenuItem>
                  </Select>
                  {errors.region && touched.region && (
                    <FormHelperText>{errors.region}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};
