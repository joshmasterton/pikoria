import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { SideBar } from "../comps/SideBar.comp";
import { BreadCrumb } from "../comps/BreadCrumb.comp";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchMoviesSeries, reset } from "../store/moviesSeries.slice";
import { MovieSeriesCard } from "../comps/cards/MoviesSeries.card";
import { SkeletonCard } from "../comps/cards/Skeleton.card";

export const Home = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch<AppDispatch>();

  const { moviesSeries, loading } = useSelector(
    (state: RootState) => state.moviesSeries
  );

  useEffect(() => {
    dispatch(fetchMoviesSeries());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch, loading]);

  return (
    <Box>
      <SideBar />
      <Grid
        container
        sx={{
          minWidth: "100%",
          transition: theme.transitions.create("padding", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          paddingLeft: isLargeScreen ? 31 : 0,
        }}
      >
        <BreadCrumb />
        <Stack p={3} gap={3} width="100%">
          <Typography variant="h6">Recommendations</Typography>
          <Grid container spacing={3} width="100%">
            {loading || !moviesSeries?.data ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                    <SkeletonCard />
                  </Grid>
                ))}
              </>
            ) : (
              <>
                {moviesSeries?.data &&
                  moviesSeries.data?.map((movieSeries) => (
                    <Grid key={movieSeries.id} size={{ xs: 12, md: 6, lg: 4 }}>
                      <MovieSeriesCard movieSeries={movieSeries} />
                    </Grid>
                  ))}
              </>
            )}
          </Grid>
        </Stack>
      </Grid>
    </Box>
  );
};
