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
import { useEffect } from "react";
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

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    loadingFavourites,
    favouriteMoviesSeries,
    favouriteMoviesSeriesForm,
    favouritesPage,
  } = useAppSelector((state) => state.moviesSeries);

  useEffect(() => {
    dispatch(
      getFavouriteMoviesSeries({
        page: favouritesPage,
        search: favouriteMoviesSeriesForm?.search,
      })
    );
  }, [dispatch, user, favouritesPage, favouriteMoviesSeriesForm]);

  useEffect(() => {
    return () => {
      dispatch(clearFavourites());
    };
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [favouritesPage]);

  // Scroll to last scroll position
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        "pikoria_favourite_movies_series_scroll_position",
        window.scrollY.toString()
      );
    };

    window.addEventListener("scroll", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    if (!loadingFavourites && favouriteMoviesSeries) {
      const savedScrollPosition = sessionStorage.getItem(
        "pikoria_favourite_movies_series_scroll_position"
      );

      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScrollPosition, 10),
          });
        }, 100);
      }
    }
  }, [favouriteMoviesSeries, loadingFavourites]);

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
              );
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
          <Stack>
            {favouriteMoviesSeries &&
            favouriteMoviesSeries.results.length > 0 ? (
              <Stack>
                <Stack direction="row" overflow="auto" gap={2}>
                  {favouriteMoviesSeries.results?.map((movieSeries) => (
                    <Stack
                      key={movieSeries.id}
                      minWidth={{ xs: "100%", sm: 350 }}
                    >
                      <MoviesSeriesCardAdvanced movieSeries={movieSeries} />
                    </Stack>
                  ))}
                </Stack>
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
                      );
                    }}
                  />
                </Stack>
              </Stack>
            ) : (
              <Typography>No movies / series found</Typography>
            )}
          </Stack>
        )}
      </Stack>
    </>
  );
};
