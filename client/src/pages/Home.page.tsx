import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import {
  clearFavourites,
  getFavouriteMoviesSeries,
} from "../redux/moviesSeriesSlice.redux";
import { useEffect } from "react";
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
  };

  const getMoreFavouriteMoviesSeries = async () => {
    await dispatch(
      getFavouriteMoviesSeries({
        page: favouritesPage + 1,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(clearFavourites());
    };
  }, [dispatch]);

  return (
    <>
      <Nav />
      <Side />
      <Stack p={2} gap={2} flexGrow={1} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        {favouriteMoviesSeries && (
          <Stack position="relative" gap={1}>
            <Typography>Favourite Movies / Series</Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
};
