import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import {
  clearFavourites,
  getFavouriteMoviesSeries,
  setFavouritesFromData,
  setFavouritesPage,
} from "../redux/moviesSeriesSlice.redux";
import { useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { MoviesSeriesCardAdvanced } from "../comp/card/MoviesSeriesCard.comp";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { Formik } from "formik";
import { favouriteMoviesSeriesSchema } from "../validations/form.validation";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { ScrollCard } from "../comp/card/ScrollCard.comp";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const favouriteMoviesSeriesScrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const {
    loadingFavourites,
    favouriteMoviesSeries,
    favouriteMoviesSeriesForm,
    favouritesPage,
  } = useAppSelector((state) => state.moviesSeries);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSavedPosition = () => {
    const savedScrollPosition = sessionStorage.getItem(
      "pikoria_favourite_movies_series_scroll_position"
    );

    if (savedScrollPosition) {
      if (favouriteMoviesSeriesScrollRef.current) {
        favouriteMoviesSeriesScrollRef.current.scrollTo({
          left: parseInt(savedScrollPosition, 10),
        });
      }
    }
  };

  useEffect(() => {
    dispatch(
      getFavouriteMoviesSeries({
        page: favouritesPage,
        search: favouriteMoviesSeriesForm?.search,
      })
    ).then(() => {
      scrollToSavedPosition();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user, favouriteMoviesSeriesForm]);

  useEffect(() => {
    return () => {
      dispatch(clearFavourites());
    };
  }, [dispatch]);

  useEffect(() => {
    const ref = favouriteMoviesSeriesScrollRef.current;

    const saveScrollPosition = () => {
      if (ref) {
        const { scrollLeft, scrollWidth, clientWidth } = ref;
        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setScrollProgress(progress);

        sessionStorage.setItem(
          "pikoria_favourite_movies_series_scroll_position",
          scrollLeft.toString()
        );
      }
    };

    if (ref && !loadingFavourites && favouriteMoviesSeries) {
      ref.addEventListener("scroll", saveScrollPosition);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("scroll", saveScrollPosition);
      }
    };
  }, [loadingFavourites, favouriteMoviesSeries]);

  return (
    <>
      <Nav />
      <Side />
      <Stack gap={2} p={2} flexGrow={1} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        <Stack flexGrow={1}>
          <Formik
            validationSchema={favouriteMoviesSeriesSchema}
            initialValues={{
              search: favouriteMoviesSeriesForm?.search
                ? favouriteMoviesSeriesForm.search
                : "",
            }}
            onSubmit={async (values) => {
              await dispatch(
                getFavouriteMoviesSeries({
                  page: favouritesPage,
                  search: values.search,
                })
              ).then(() => {
                // Reset scroll position and scroll to top
                sessionStorage.setItem(
                  "pikoria_movies_series_scroll_position",
                  "0"
                );

                if (favouriteMoviesSeriesScrollRef.current) {
                  favouriteMoviesSeriesScrollRef.current.scrollTo({
                    left: 0,
                  });

                  setScrollProgress(0);
                }
              });
              dispatch(
                setFavouritesFromData({
                  search: values.search,
                })
              );
            }}
          >
            {({ handleSubmit, handleChange, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <TextField
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    name="search"
                    label="Search"
                    value={values.search}
                    disabled={loadingFavourites}
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
                </form>
              );
            }}
          </Formik>
        </Stack>
        {loadingFavourites ? (
          <Stack width="100%" height="100%">
            <LinearProgress color="primary" />
          </Stack>
        ) : (
          <Stack borderRadius={1}>
            {favouriteMoviesSeries &&
            favouriteMoviesSeries.results.length > 0 ? (
              <Stack>
                <ScrollCard
                  ref={favouriteMoviesSeriesScrollRef}
                  scrollProgress={scrollProgress}
                >
                  <>
                    {favouriteMoviesSeries.results?.map((movieSeries) => (
                      <Stack
                        key={movieSeries.id}
                        minWidth={{ xs: "100%", sm: 350 }}
                      >
                        <MoviesSeriesCardAdvanced movieSeries={movieSeries} />
                      </Stack>
                    ))}
                  </>
                </ScrollCard>
                <Stack
                  minWidth="100%"
                  flex={1}
                  p={2}
                  gap={2}
                  alignItems="center"
                >
                  <Pagination
                    key={favouritesPage}
                    shape="rounded"
                    page={favouritesPage + 1}
                    disabled={loadingFavourites}
                    color="primary"
                    variant="outlined"
                    count={favouriteMoviesSeries?.total_pages}
                    onChange={async (_e, value) => {
                      dispatch(setFavouritesPage(value - 1));
                      await dispatch(
                        getFavouriteMoviesSeries({
                          page: value - 1,
                          search: favouriteMoviesSeriesForm?.search,
                        })
                      ).then(() => {
                        // Reset scroll position and scroll to top
                        sessionStorage.setItem(
                          "pikoria_movies_series_scroll_position",
                          "0"
                        );

                        if (favouriteMoviesSeriesScrollRef.current) {
                          favouriteMoviesSeriesScrollRef.current.scrollTo({
                            left: 0,
                          });

                          setScrollProgress(0);
                        }
                      });
                    }}
                  />
                </Stack>
              </Stack>
            ) : !user ? (
              <Stack gap={2}>
                <Typography>
                  Sign in to see your favourite movies / series
                </Typography>
                <Button
                  onClick={() => navigate("/auth/signin")}
                  variant="contained"
                  sx={{ width: "fit-content" }}
                >
                  Sign in
                </Button>
              </Stack>
            ) : (
              <Stack gap={2}>
                <Typography>No movies / series found</Typography>
                <Button
                  onClick={() => navigate("/categories")}
                  variant="contained"
                  sx={{ width: "fit-content" }}
                >
                  Browse
                </Button>
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </>
  );
};
