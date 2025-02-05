import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import {
  clearFavourites,
  getFavouriteMoviesSeries,
  setFavouritesPage,
} from "../redux/moviesSeriesSlice.redux";
import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import { MoviesSeriesCardAdvanced } from "../comp/card/MoviesSeriesCard.comp";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    loadingFavourites,
    favouriteMoviesSeries,
    loadingLike,
    favouritesPage,
  } = useAppSelector((state) => state.moviesSeries);

  useEffect(() => {
    dispatch(getFavouriteMoviesSeries({ page: favouritesPage }));
  }, [dispatch, user, loadingLike, favouritesPage]);

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

  return (
    <>
      <Nav />
      <Side />
      <Stack p={2} gap={2} flexGrow={1} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        {favouriteMoviesSeries && (
          <Grid container spacing={2} position="relative">
            {favouriteMoviesSeries.results?.map((movieSeries) => (
              <Grid
                size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                key={movieSeries.id}
              >
                <MoviesSeriesCardAdvanced movieSeries={movieSeries} />
              </Grid>
            ))}
            <Stack minWidth="100%" flex={1} gap={2} alignItems="center">
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
                    })
                  );
                }}
              />
            </Stack>
          </Grid>
        )}
      </Stack>
    </>
  );
};
