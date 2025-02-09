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
  setRecommendationsPage,
} from "../../redux/moviesSeriesSlice.redux";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const MoviesSeriesForm = () => {
  const dispatch = useAppDispatch();
  const { moviesSeriesForm, loadingMoviesSeriesRecommendations } =
    useAppSelector((state) => state.moviesSeries);

  // Genre options for movies and series
  const movieGenres = [
    { value: 28, label: "Action" },
    { value: 12, label: "Adventure" },
    { value: 16, label: "Animation" },
    { value: 35, label: "Comedy" },
    { value: 80, label: "Crime" },
    { value: 99, label: "Documentary" },
    { value: 18, label: "Drama" },
    { value: 10751, label: "Family" },
    { value: 14, label: "Fantasy" },
    { value: 36, label: "History" },
    { value: 27, label: "Horror" },
    { value: 10402, label: "Music" },
    { value: 9648, label: "Mystery" },
    { value: 10749, label: "Romance" },
    { value: 878, label: "Sci-Fi" },
    { value: 10770, label: "TV Movie" },
    { value: 53, label: "Thriller" },
    { value: 10752, label: "War" },
    { value: 37, label: "Western" },
  ];

  const seriesGenres = [
    { value: 10759, label: "Action & Adventure" },
    { value: 16, label: "Animation" },
    { value: 35, label: "Comedy" },
    { value: 80, label: "Crime" },
    { value: 18, label: "Drama" },
    { value: 10751, label: "Family" },
    { value: 14, label: "Fantasy" },
    { value: 9648, label: "Mystery" },
    { value: 10764, label: "Reality" },
    { value: 10765, label: "Sci-Fi & Fantasy" },
    { value: 10766, label: "Soap" },
    { value: 10767, label: "Talk" },
    { value: 10768, label: "War & Politics" },
    { value: 37, label: "Western" },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        overflow: "visible",
        background: "transparent",
      }}
    >
      <Formik
        validationSchema={moviesSeriesSchema}
        initialValues={{
          genre: moviesSeriesForm?.genre ?? 0,
          content: moviesSeriesForm?.content ?? "series",
          release: [2000, 2025],
          runtime: [0, 180],
          region: moviesSeriesForm?.region ?? "all",
          search: moviesSeriesForm?.search ?? "",
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
              search: values.search,
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
              search: values.search,
            })
          );
          dispatch(setRecommendationsPage(1));
        }}
      >
        {({
          values,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue,
          handleBlur,
          errors,
        }) => {
          const genreOptions =
            values.content === "movies" ? movieGenres : seriesGenres;

          return (
            <form onSubmit={handleSubmit}>
              <Stack
                gap={2}
                direction="row"
                flexWrap="wrap"
                justifyContent="start"
              >
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={2}
                  flexGrow={{ xs: 1, sm: 0 }}
                >
                  <FormControl
                    sx={{ flex: 1 }}
                    size="small"
                    disabled={loadingMoviesSeriesRecommendations}
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
                        await setFieldValue("genre", 0);

                        handleSubmit();
                        console.log(values.genre);
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
                    sx={{ flex: 1 }}
                    disabled={loadingMoviesSeriesRecommendations}
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
                      {genreOptions.map((genre) => (
                        <MenuItem key={genre.label} value={genre.value}>
                          {genre.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.genre && touched.genre && (
                      <FormHelperText>{errors.genre}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    sx={{ flex: 1 }}
                    disabled={loadingMoviesSeriesRecommendations}
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
                <TextField
                  size="small"
                  onChange={handleChange}
                  name="search"
                  label="Search"
                  value={values.search}
                  disabled={loadingMoviesSeriesRecommendations}
                  sx={{ flexGrow: 1 }}
                  id="moviesSeriesSearch"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton type="submit" size="small">
                          <SearchIcon />
                        </IconButton>
                      ),
                    },
                  }}
                />
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};
