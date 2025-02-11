import { Nav } from "../../comp/Nav.comp";
import { Side } from "../../comp/Side.comp";
import { CustomBreadCrumbs } from "../../comp/CustomBreadCrumbs.comp";
import { MoviesSeriesForm } from "../../comp/forms/MoviesSeries.form";
import {
  getMoviesSeriesRecommendation,
  setFormData,
  setRecommendationsPage,
} from "../../redux/moviesSeriesSlice.redux";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import { MoviesSeriesCard } from "../../comp/card/MoviesSeriesCard.comp";
import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

export const MoviesSeriesPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    loadingMoviesSeriesRecommendations,
    moviesSeriesRecommendations,
    recommendationsPage,
    moviesSeriesForm,
  } = useAppSelector((state) => state.moviesSeries);

  const scrollToSavedPosition = () => {
    const savedScrollPosition = sessionStorage.getItem(
      "pikoria_movies_series_scroll_position"
    );

    if (savedScrollPosition) {
      window.scrollTo({
        top: parseInt(savedScrollPosition, 10),
      });
    }
  };

  useEffect(() => {
    // If form from redux is present
    if (!moviesSeriesForm) {
      dispatch(
        getMoviesSeriesRecommendation({
          genre: 0,
          content: "series",
          region: "all",
          page: recommendationsPage,
        })
      ).then(() => {
        dispatch(
          setFormData({
            genre: 0,
            content: "series",
            release: [2000, 2025],
            runtime: [0, 180],
            region: "all",
            page: recommendationsPage,
          })
        );

        scrollToSavedPosition();
      });
    } else {
      dispatch(
        getMoviesSeriesRecommendation({
          genre: moviesSeriesForm.genre,
          content: moviesSeriesForm.content,
          region: moviesSeriesForm.region,
          page: recommendationsPage,
          search: moviesSeriesForm.search,
        })
      ).then(() => {
        // Store to saved scroll position
        scrollToSavedPosition();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, moviesSeriesForm, user]);

  // Save last scroll position
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        "pikoria_movies_series_scroll_position",
        window.scrollY.toString()
      );
    };

    if (!loadingMoviesSeriesRecommendations && moviesSeriesRecommendations) {
      window.addEventListener("scroll", saveScrollPosition);
    }

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
    };
  }, [loadingMoviesSeriesRecommendations, moviesSeriesRecommendations]);

  return (
    <>
      <Nav />
      <Side />
      <Stack flexGrow={1} p={2} gap={2} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        <MoviesSeriesForm />
        <Grid
          aria-label="movies-series"
          container
          spacing={2}
          position="relative"
        >
          {loadingMoviesSeriesRecommendations ? (
            <Stack width="100%" height="100%">
              <LinearProgress color="primary" />
            </Stack>
          ) : moviesSeriesRecommendations &&
            moviesSeriesRecommendations?.results.length > 0 ? (
            <>
              {moviesSeriesRecommendations?.results?.map((movieSeries) => (
                <Grid
                  aria-label={movieSeries.name || movieSeries.title}
                  size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                  key={movieSeries.id}
                >
                  <MoviesSeriesCard movieSeries={movieSeries} />
                </Grid>
              ))}
              <Stack minWidth="100%" flex={1} gap={2} alignItems="center">
                <Pagination
                  key={recommendationsPage}
                  shape="rounded"
                  page={recommendationsPage + 1}
                  disabled={loadingMoviesSeriesRecommendations}
                  color="primary"
                  variant="outlined"
                  count={moviesSeriesRecommendations?.total_pages}
                  onChange={async (_e, value) => {
                    if (moviesSeriesForm) {
                      // Get new page movies_series
                      dispatch(setRecommendationsPage(value - 1));
                      await dispatch(
                        getMoviesSeriesRecommendation({
                          genre: moviesSeriesForm?.genre,
                          content: moviesSeriesForm?.content,
                          region: moviesSeriesForm?.region,
                          page: value - 1,
                          search: moviesSeriesForm.search,
                        })
                      ).then(() => {
                        // Reset scroll position and scroll to top
                        sessionStorage.setItem(
                          "pikoria_movies_series_scroll_position",
                          "0"
                        );

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      });
                    }
                  }}
                />
              </Stack>
            </>
          ) : (
            <Stack>No movies / series found</Stack>
          )}
        </Grid>
      </Stack>
    </>
  );
};
