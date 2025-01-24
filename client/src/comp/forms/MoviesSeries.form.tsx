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

export const MoviesSeriesForm = () => {
  return (
    <Card variant="outlined">
      <Formik
        validationSchema={moviesSeriesSchema}
        initialValues={{
          genre: "",
          content: "",
          release: [2000, 2025],
          runtime: [90, 180],
          region: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({
          values,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          errors,
        }) => {
          return (
            <form>
              <Stack p={3} gap={3}>
                <Typography variant="h5">Find a movie or series</Typography>
                <Stack gap={2}>
                  <FormControl
                    size="small"
                    fullWidth
                    error={Boolean(errors.content && touched.content)}
                  >
                    <InputLabel id="content-select-label">Content</InputLabel>
                    <Select
                      label="Content"
                      id="content-select"
                      name="content"
                      value={values.content}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue("content", e.target.value);
                        setFieldValue("genre", "");
                      }}
                      labelId="content-select-label"
                    >
                      <MenuItem value="movies">Movies</MenuItem>
                      <MenuItem value="series">Series</MenuItem>
                    </Select>
                    {errors.content && touched.content && (
                      <FormHelperText>{errors.content}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    size="small"
                    fullWidth
                    error={Boolean(errors.genre && touched.genre)}
                  >
                    <InputLabel id="genre-select-label">Genre</InputLabel>
                    {values.content === "movies" ? (
                      <Select
                        label="Genre"
                        id="genre-select"
                        name="genre"
                        value={values.genre}
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("genre", e.target.value)}
                        labelId="genre-select-label"
                      >
                        <MenuItem value="adventure">Adventure</MenuItem>
                        <MenuItem value="action">Action</MenuItem>
                        <MenuItem value="drama">Drama</MenuItem>
                        <MenuItem value="comedy">Comedy</MenuItem>
                      </Select>
                    ) : (
                      <Select
                        label="Genre"
                        id="genre-select"
                        name="genre"
                        value={values.genre}
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("genre", e.target.value)}
                        labelId="genre-select-label"
                      >
                        <MenuItem value="action&adventure">
                          Action & Adventure
                        </MenuItem>
                        <MenuItem value="drama">Drama</MenuItem>
                        <MenuItem value="sci-fi&fantasy">
                          Sci-Fi & Fantasy
                        </MenuItem>
                        <MenuItem value="crime">Crime</MenuItem>
                        <MenuItem value="comedy">Comedy</MenuItem>
                      </Select>
                    )}
                    {errors.genre && touched.genre && (
                      <FormHelperText>{errors.genre}</FormHelperText>
                    )}
                  </FormControl>
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
                      <MenuItem value="unitedStates">United states</MenuItem>
                      <MenuItem value="japan">Japanese</MenuItem>
                      <MenuItem value="spain">Spanish</MenuItem>
                    </Select>
                    {errors.region && touched.region && (
                      <FormHelperText>{errors.region}</FormHelperText>
                    )}
                  </FormControl>
                  <Button variant="contained">Let's go!</Button>
                </Stack>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};
