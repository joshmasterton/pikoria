import Card from "@mui/material/Card";
import { Formik } from "formik";
import { moviesSeriesSchema } from "../../validations/form.validation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import {
  getMoviesSeriesRecommendation,
  setFormData,
} from "../../redux/moviesSeriesSlice.redux";

export const MoviesSeriesForm = ({
  close,
}: {
  close: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const topFormRef = useRef<HTMLFormElement>(null);
  const { loading, page } = useAppSelector((state) => state.moviesSeries);

  useEffect(() => {
    topFormRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [page]);

  return (
    <Card variant="outlined">
      <Formik
        validationSchema={moviesSeriesSchema}
        initialValues={{
          genre: 0,
          content: "series",
          release: [2000, 2025],
          runtime: [0, 180],
          region: "all",
        }}
        onSubmit={async (values) => {
          await dispatch(
            getMoviesSeriesRecommendation({
              genre: values.genre,
              content: values.content,
              release: values.release,
              runtime: values.runtime,
              region: values.region,
              page,
            })
          );
          dispatch(
            setFormData({
              genre: values.genre,
              content: values.content,
              release: values.release,
              runtime: values.runtime,
              region: values.region,
              page,
            })
          );
          close(false);
        }}
      >
        {({
          values,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          errors,
        }) => {
          return (
            <form onSubmit={handleSubmit} ref={topFormRef}>
              <Stack p={3} gap={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="start"
                >
                  <Typography variant="h5">Find a movie or series</Typography>
                  <IconButton size="small" onClick={() => close(false)}>
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <Stack gap={2}>
                  <FormControl>
                    <Typography>Content</Typography>
                    <RadioGroup
                      row
                      onChange={(e) => {
                        // Change content type
                        const newContentValue = e.target.value;
                        setFieldValue("content", newContentValue);

                        // Switch content value if action or sci-fi selected for tmdb genre labelling
                        if (
                          newContentValue === "series" &&
                          values.genre === 28
                        ) {
                          setFieldValue("genre", 10759);
                        } else if (
                          newContentValue === "movies" &&
                          values.genre === 10759
                        ) {
                          setFieldValue("genre", 28);
                        } else if (
                          newContentValue === "series" &&
                          values.genre === 878
                        ) {
                          setFieldValue("genre", 10765);
                        } else if (
                          newContentValue === "movies" &&
                          values.genre === 10765
                        ) {
                          setFieldValue("genre", 878);
                        }
                      }}
                      value={values.content}
                      aria-labelledby="content-select-group"
                      name="content-select"
                    >
                      <FormControlLabel
                        value="movies"
                        control={<Radio />}
                        label="Movies"
                      />
                      <FormControlLabel
                        value="series"
                        control={<Radio />}
                        label="Series"
                      />
                    </RadioGroup>
                    {errors.content && touched.content && (
                      <FormHelperText>{errors.content}</FormHelperText>
                    )}
                  </FormControl>
                  <Stack gap={1}>
                    <Typography>Genre</Typography>
                    <FormControl
                      size="small"
                      fullWidth
                      error={Boolean(errors.genre && touched.genre)}
                    >
                      <InputLabel id="genre-select-label">Genre</InputLabel>
                      <Select
                        label="Genre"
                        id="genre-select"
                        name="genre"
                        value={values.genre}
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("genre", e.target.value)}
                        labelId="genre-select-label"
                      >
                        <MenuItem value={0}>Any</MenuItem>
                        <MenuItem
                          value={values.content === "movies" ? 28 : 10759}
                        >
                          Action
                        </MenuItem>
                        <MenuItem value={18}>Drama</MenuItem>
                        <MenuItem value={80}>Crime</MenuItem>
                        <MenuItem value={35}>Comedy</MenuItem>
                        <MenuItem
                          value={values.content === "movies" ? 878 : 10765}
                        >
                          Sci-Fi
                        </MenuItem>
                      </Select>
                      {errors.genre && touched.genre && (
                        <FormHelperText>{errors.genre}</FormHelperText>
                      )}
                    </FormControl>
                  </Stack>
                  <Box>
                    <Typography>Release date</Typography>
                    <Box p={1}>
                      <Slider
                        getAriaLabel={() => "Release date"}
                        onChange={handleChange}
                        value={values.release}
                        valueLabelDisplay="auto"
                        min={1970}
                        max={new Date().getFullYear()}
                        name="release"
                        marks={[
                          { value: 1970, label: 1970 },
                          { value: 1990, label: 1990 },
                          { value: 2010, label: 2010 },
                          {
                            value: new Date().getFullYear(),
                            label: new Date().getFullYear(),
                          },
                        ]}
                        disableSwap
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Typography>Runtime</Typography>
                    <Box p={1}>
                      <Slider
                        getAriaLabel={() => "Runtime"}
                        onChange={handleChange}
                        value={values.runtime}
                        valueLabelDisplay="auto"
                        min={10}
                        max={240}
                        name="runtime"
                        step={10}
                        marks={[
                          { value: 10, label: 10 },
                          { value: 60, label: 60 },
                          { value: 120, label: 120 },
                          { value: 180, label: 180 },
                          { value: 240, label: 240 },
                        ]}
                        disableSwap
                      />
                    </Box>
                  </Box>
                  <Stack gap={1}>
                    <Typography>Region</Typography>
                    <FormControl
                      size="small"
                      fullWidth
                      error={Boolean(errors.region && touched.region)}
                    >
                      <InputLabel id="region-select-label">Region</InputLabel>
                      <Select
                        label="Region"
                        id="region-select"
                        name="region"
                        value={values.region}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue("region", e.target.value);
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
                  <Button type="submit" loading={loading} variant="contained">
                    Let's go!
                  </Button>
                </Stack>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};
