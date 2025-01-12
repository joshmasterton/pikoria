import {
  Button,
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
import * as yup from "yup";

const moviesSeriesSchema = yup.object().shape({
  genre: yup.array().of(yup.string()).min(1, "At least one genre is required"),
  mood: yup.array().of(yup.string()).min(1, "At least one mood is required"),
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
  language: yup.string().required("Language preference is required"),
});

export const MoviesSeriesForm = () => {
  const currentYear = new Date().getFullYear();

  const moodArray = [
    { value: "happy", title: "Happy" },
    { value: "sad", title: "Sad" },
    { value: "Chill", title: "Chill" },
  ];

  const genreArray = [
    { value: "action", title: "Action" },
    { value: "adventure", title: "Adventure" },
    { value: "animation", title: "Animation" },
    { value: "horror", title: "Horror" },
    { value: "mystery", title: "Mystery" },
    { value: "science-fiction", title: "Science Fiction" },
    { value: "war", title: "War" },
  ];

  return (
    <Formik
      initialValues={{
        genre: [],
        mood: [],
        content: "",
        release: [2000, currentYear],
        rating: 8,
        runtime: [90, 180],
        language: "",
      }}
      validationSchema={moviesSeriesSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
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
              <Typography>What genre are you looking for?</Typography>
              <FormControl
                size="small"
                error={Boolean(touched.genre && errors.genre)}
                fullWidth
              >
                <InputLabel id="genre">Genre</InputLabel>
                <Select
                  multiple
                  name="genre"
                  onChange={(e) => setFieldValue("genre", e.target.value)}
                  onBlur={handleBlur}
                  value={values.genre}
                  labelId="genre"
                  label="Genre"
                  id="genreSelect"
                >
                  {genreArray.map((genre) => (
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
            <Stack gap={2}>
              <Typography>Choose your mood?</Typography>
              <FormControl
                error={Boolean(touched.mood && errors.mood)}
                size="small"
                fullWidth
              >
                <InputLabel id="mood">Mood</InputLabel>
                <Select
                  multiple
                  name="mood"
                  value={values.mood}
                  onChange={(e) => setFieldValue("mood", e.target.value)}
                  onBlur={handleBlur}
                  labelId="mood"
                  label="Mood"
                  id="moodSelect"
                >
                  {moodArray.map((mood) => (
                    <MenuItem key={mood.value} value={mood.value}>
                      {mood.title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.mood && touched.mood && (
                  <FormHelperText>{errors.mood}</FormHelperText>
                )}
              </FormControl>
            </Stack>
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelId="content"
                  label="Content"
                  name="content"
                  id="contentSelect"
                >
                  <MenuItem value="movie">Movies</MenuItem>
                  <MenuItem value="series">Series</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
                {errors.content && touched.content && (
                  <FormHelperText>{errors.content}</FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack gap={1.5}>
              <Typography>Minumum rating</Typography>
              <Rating
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
                  step={10}
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
              <Typography>Choose your preferred language?</Typography>
              <FormControl
                error={Boolean(touched.language && errors.language)}
                size="small"
                fullWidth
              >
                <InputLabel id="language">Language</InputLabel>
                <Select
                  value={values.language}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="language"
                  labelId="language"
                  label="Language"
                  id="languageSelect"
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="spanish">Spanish</MenuItem>
                  <MenuItem value="japanese">Japanese</MenuItem>
                </Select>
                {errors.language && touched.language && (
                  <FormHelperText>{errors.language}</FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Button variant="contained" type="submit">
              Let's go
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};
