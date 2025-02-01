import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import { MoviesSeriesBigCard } from "../comp/card/MoviesSeriesBigCard.comp";
import {
  clearMovieSeries,
  getFavouriteMoviesSeries,
} from "../redux/moviesSeriesSlice.redux";
import { MoviesSeriesCardAdvanced } from "../comp/card/MoviesSeriesCard.comp";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { movieSeries, favouriteMoviesSeries } = useAppSelector(
    (state) => state.moviesSeries
  );

  useEffect(() => {
    dispatch(getFavouriteMoviesSeries());
  }, [dispatch, user]);

  return (
    <>
      <Nav />
      <Side />
      <Stack p={2} gap={2} flexGrow={1} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        <Stack>
          <Typography>Favourites</Typography>
          <Stack direction="row" sx={{ overflowX: "scroll" }}>
            {favouriteMoviesSeries?.map((movieSeries) => (
              <MoviesSeriesCardAdvanced
                key={movieSeries.id}
                movieSeries={movieSeries}
              />
            ))}
          </Stack>
        </Stack>
        <Dialog
          scroll="body"
          fullWidth
          maxWidth="md"
          open={Boolean(movieSeries)}
          onClose={() => {
            dispatch(clearMovieSeries());
          }}
        >
          <MoviesSeriesBigCard />
        </Dialog>
      </Stack>
    </>
  );
};
