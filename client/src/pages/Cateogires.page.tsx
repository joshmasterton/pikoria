import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import movies from "../assets/movies.jpg";
import games from "../assets/games.jpg";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { MoviesSeriesForm } from "../comp/forms/MoviesSeries.form";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import { MoviesSeriesScroll } from "../comp/scrolls/MoviesSeriesScroll.comp";
import {
  clearMoviesSeries,
  decrementRecommendationPage,
  getMoviesSeriesRecommendation,
  incrementRecommendationPage,
} from "../redux/moviesSeriesSlice.redux";

export const Categories = () => {
  const dispatch = useAppDispatch();
  const [moviesSeriesFormOpen, setMoviesSeriesFormOpen] = useState(false);
  const {
    moviesSeriesRecommendations,
    moviesSeriesForm,
    recommendationPage,
    loadingMoviesSeriesRecommendations,
  } = useAppSelector((state) => state.moviesSeries);

  const getLessMoviesSeries = async () => {
    if (moviesSeriesForm) {
      await dispatch(
        getMoviesSeriesRecommendation({
          genre: moviesSeriesForm?.genre,
          content: moviesSeriesForm?.content,
          release: moviesSeriesForm?.release,
          runtime: moviesSeriesForm?.runtime,
          region: moviesSeriesForm?.region,
          page: recommendationPage - 1,
        })
      );

      dispatch(decrementRecommendationPage());
    }
  };

  const getMoreMoviesSeries = async () => {
    if (moviesSeriesForm) {
      await dispatch(
        getMoviesSeriesRecommendation({
          genre: moviesSeriesForm?.genre,
          content: moviesSeriesForm?.content,
          release: moviesSeriesForm?.release,
          runtime: moviesSeriesForm?.runtime,
          region: moviesSeriesForm?.region,
          page: recommendationPage + 1,
        })
      );

      dispatch(incrementRecommendationPage());
    }
  };

  return (
    <>
      <Nav />
      <Side />
      <Stack flexGrow={1} p={2} gap={2} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        <Dialog
          open={Boolean(moviesSeriesRecommendations)}
          onClose={() => dispatch(clearMoviesSeries())}
          scroll="body"
          fullWidth
          maxWidth="lg"
          slotProps={{
            paper: {
              style: {
                background: "transparent",
                backdropFilter: "blur(0.25rem)",
                WebkitBackdropFilter: "blur(0.25rem)",
                boxShadow: "none",
              },
            },
          }}
        >
          <MoviesSeriesScroll
            moviesSeriesRecommendations={moviesSeriesRecommendations}
            favouriteMoviesSeries={undefined}
            loading={loadingMoviesSeriesRecommendations}
            page={recommendationPage}
            getLess={getLessMoviesSeries}
            getMore={getMoreMoviesSeries}
          />
        </Dialog>
        <Dialog
          scroll="body"
          fullWidth
          maxWidth="sm"
          open={moviesSeriesFormOpen}
          onClose={() => setMoviesSeriesFormOpen(false)}
        >
          <MoviesSeriesForm close={setMoviesSeriesFormOpen} />
        </Dialog>
        <Card variant="outlined" sx={{ width: "100%", height: 400 }}>
          <CardActionArea
            onClick={() => setMoviesSeriesFormOpen(true)}
            aria-label="Movies/Series"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              position: "relative",
              height: "100%",
            }}
          >
            <Stack
              width="100%"
              height="100%"
              sx={{
                zIndex: 1,
                p: 2,
                maskImage:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 60%)",
                backdropFilter: "blur(0.5rem)",
                WebkitBackdropFilter: "blur(0.5rem)",
              }}
            >
              <Typography color="white">Movies / Series</Typography>
            </Stack>
            <Avatar
              variant="square"
              src={movies}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </CardActionArea>
        </Card>
        <Card variant="outlined" sx={{ width: "100%", height: 400 }}>
          <CardActionArea
            aria-label="Games"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              position: "relative",
              height: "100%",
            }}
          >
            <Stack
              width="100%"
              height="100%"
              sx={{
                zIndex: 1,
                p: 2,
                maskImage:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 60%)",
                backdropFilter: "blur(0.5rem)",
                WebkitBackdropFilter: "blur(0.5rem)",
              }}
            >
              <Typography color="white">Games</Typography>
            </Stack>
            <Avatar
              variant="square"
              src={games}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </CardActionArea>
        </Card>
      </Stack>
    </>
  );
};
