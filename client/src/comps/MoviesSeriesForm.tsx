import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { moviesSeriesSchema } from "../validation/forms.validate";
import axios, { AxiosError } from "axios";
import { MoviesSeriesFormType } from "../types/forms.type";

export const MoviesSeriesForm = () => {
  const currentYear = new Date().getFullYear();

  const movieGenreArray = [
    { value: 0, title: "All" },
    { value: 28, title: "Action" },
    { value: 12, title: "Adventure" },
    { value: 16, title: "Animation" },
    { value: 35, title: "Comedy" },
    { value: 80, title: "Crime" },
    { value: 99, title: "Documentary" },
    { value: 18, title: "Drama" },
    { value: 10751, title: "Family" },
    { value: 14, title: "Fantasy" },
    { value: 36, title: "History" },
    { value: 27, title: "Horror" },
    { value: 9648, title: "Mystery" },
    { value: 10749, title: "Romance" },
    { value: 878, title: "Science Fiction" },
    { value: 53, title: "Thriller" },
    { value: 10752, title: "War" },
  ];

  const tvGenreArray = [
    { value: 0, title: "All" },
    { value: 16, title: "Animation" },
    { value: 10764, title: "Action & Adventure" },
    { value: 35, title: "Comedy" },
    { value: 18, title: "Drama" },
    { value: 80, title: "Crime" },
    { value: 10763, title: "News" },
    { value: 10765, title: "Sci-Fi & Fantasy" },
    { value: 10766, title: "Soap" },
    { value: 10767, title: "Talk" },
    { value: 10768, title: "War & Politics" },
    { value: 10751, title: "Family" },
    { value: 36, title: "History" },
    { value: 27, title: "Horror" },
    { value: 10749, title: "Romance" },
    { value: 53, title: "Thriller" },
  ];

  const onMovieSeriesSubmit = async (values: MoviesSeriesFormType) => {
    try {
      const moviesSeriesResponse = await axios.post(
        "http://localhost:80/movies-series/recommend",
        values
      );

      console.log(moviesSeriesResponse.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.errors);
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Error on movies/series recommendation request");
      }
    }
  };

  return (
    <Formik
      initialValues={{
        genre: 0,
        content: "",
        release: [2000, currentYear],
        rating: 7,
        runtime: [0, 180],
        region: "All",
      }}
      validationSchema={moviesSeriesSchema}
      onSubmit={onMovieSeriesSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Typography pb={2} variant="h5">
              Let's find something to watch!
            </Typography>
            <Stack gap={2}>
              <Typography>Are you looking for movies or series</Typography>
              <FormControl
                error={Boolean(touched.content && errors.content)}
                size="small"
                fullWidth
              >
                <InputLabel id="content">Content</InputLabel>
                <Select
                  value={values.content}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("genre", 0);
                  }}
                  onBlur={handleBlur}
                  labelId="content"
                  label="Content"
                  name="content"
                  id="contentSelect"
                >
                  <MenuItem value="movies">Movies</MenuItem>
                  <MenuItem value="series">Series</MenuItem>
                </Select>
                {errors.content && touched.content && (
                  <FormHelperText>{errors.content}</FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack gap={2}>
              <Typography>What genre are you looking for?</Typography>
              <FormControl
                size="small"
                error={Boolean(touched.genre && errors.genre)}
                fullWidth
              >
                <InputLabel id="genre">Genre</InputLabel>
                <Select
                  name="genre"
                  onChange={(e) => setFieldValue("genre", e.target.value)}
                  onBlur={handleBlur}
                  value={values.genre}
                  labelId="genre"
                  label="Genre"
                  id="genreSelect"
                >
                  {values.content === "movies"
                    ? movieGenreArray.map((genre) => (
                        <MenuItem key={genre.value} value={genre.value}>
                          {genre.title}
                        </MenuItem>
                      ))
                    : tvGenreArray.map((genre) => (
                        <MenuItem key={genre.value} value={genre.value}>
                          {genre.title}
                        </MenuItem>
                      ))}
                </Select>
                {errors.genre && touched.genre && (
                  <FormHelperText>{errors.genre}</FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack gap={1.5}>
              <Typography>Minumum rating</Typography>
              <Rating
                precision={0.5}
                value={values.rating}
                onChange={(_e, newValue) => setFieldValue("rating", newValue)}
                max={10}
              />
            </Stack>
            <Stack>
              <Typography>Released after (year)</Typography>
              <Stack p={1} pt={0}>
                <Slider
                  marks={[
                    { value: 1950, label: 1950 },
                    { value: 1970, label: 1970 },
                    { value: 1990, label: 1990 },
                    { value: 2010, label: 2010 },
                    { value: currentYear, label: currentYear },
                  ]}
                  disableSwap
                  value={values.release}
                  step={1}
                  onChange={(_e, newValue) =>
                    setFieldValue("release", newValue)
                  }
                  defaultValue={[2000, currentYear]}
                  min={1950}
                  max={currentYear}
                  valueLabelDisplay="auto"
                  getAriaLabel={() => "Realease year"}
                />
              </Stack>
            </Stack>
            <Stack>
              <Typography>Runtime (minutes)</Typography>
              <Stack p={1} pt={0}>
                <Slider
                  disableSwap
                  marks={[
                    { value: 0, label: 0 },
                    { value: 60, label: 60 },
                    { value: 120, label: 120 },
                    { value: 180, label: 180 },
                    { value: 240, label: 240 },
                    { value: 300, label: 300 },
                    { value: currentYear, label: currentYear },
                  ]}
                  defaultValue={[90, 180]}
                  value={values.runtime}
                  onChange={(_e, newValue) =>
                    setFieldValue("runtime", newValue)
                  }
                  step={10}
                  min={0}
                  max={300}
                  valueLabelDisplay="auto"
                  getAriaLabel={() => "Runtime range"}
                />
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Typography>Choose your preferred region?</Typography>
              <FormControl
                error={Boolean(touched.region && errors.region)}
                size="small"
                fullWidth
              >
                <InputLabel id="region">Region</InputLabel>
                <Select
                  value={values.region}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="region"
                  labelId="region"
                  label="Region"
                  id="regionSelect"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="GB">United Kingdom</MenuItem>
                  <MenuItem value="ES">Spain</MenuItem>
                  <MenuItem value="FR">France</MenuItem>
                  <MenuItem value="JP">Japan</MenuItem>
                  <MenuItem value="KR">South Korea</MenuItem>
                </Select>
                {errors.region && touched.region && (
                  <FormHelperText>{errors.region}</FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Button variant="contained" type="submit">
              Let's go
            </Button>
            <Card />
          </Stack>
        </form>
      )}
    </Formik>
  );
};
