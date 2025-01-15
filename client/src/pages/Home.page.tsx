import { Box, useMediaQuery, useTheme } from "@mui/material";
import { SideBar } from "../comps/SideBar.comp";
import { BreadCrumb } from "../comps/BreadCrumb.comp";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchMoviesSeries } from "../store/moviesSeries.slice";
import { MovieSeriesCard } from "../comps/ItemCard.comp";

export const Home = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch<AppDispatch>();

  const { moviesSeries } = useSelector(
    (state: RootState) => state.moviesSeries
  );

  useEffect(() => {
    dispatch(fetchMoviesSeries());
  }, [dispatch]);

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
        <Grid size={12} spacing={3} sx={{ p: 3 }} container>
          {moviesSeries?.data &&
            moviesSeries.data?.map((movieSeries) => (
              <MovieSeriesCard key={movieSeries.id} movieSeries={movieSeries} />
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};
