import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import {
  decrementFavouritesPage,
  getFavouriteMoviesSeries,
  incrementFavouritesPage,
} from "../redux/moviesSeriesSlice.redux";
import { useEffect } from "react";
import { MoviesSeriesScroll } from "../comp/scrolls/MoviesSeriesScroll.comp";
import Typography from "@mui/material/Typography";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    favouritesPage,
    favouriteMoviesSeries,
    loadingFavourites,
    loadingLike,
  } = useAppSelector((state) => state.moviesSeries);

  useEffect(() => {
    dispatch(getFavouriteMoviesSeries({ page: 0 }));
  }, [dispatch, user, loadingLike]);

  const getLessFavouriteMoviesSeries = async () => {
    await dispatch(
      getFavouriteMoviesSeries({
        page: favouritesPage - 1,
      })
    );

    dispatch(decrementFavouritesPage());
  };

  const getMoreFavouriteMoviesSeries = async () => {
    await dispatch(
      getFavouriteMoviesSeries({
        page: favouritesPage + 1,
      })
    );

    dispatch(incrementFavouritesPage());
  };

  return (
    <>
      <Nav />
      <Side />
      <Stack p={2} gap={2} flexGrow={1} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        {favouriteMoviesSeries && (
          <Stack position="relative" gap={1}>
            <Typography>Favourite Movies / Series</Typography>
            <MoviesSeriesScroll
              favouriteMoviesSeries={favouriteMoviesSeries}
              moviesSeriesRecommendations={undefined}
              loading={loadingFavourites}
              page={favouritesPage}
              getLess={getLessFavouriteMoviesSeries}
              getMore={getMoreFavouriteMoviesSeries}
            />
          </Stack>
        )}
      </Stack>
    </>
  );
};
