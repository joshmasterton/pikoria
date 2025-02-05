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

export const MoviesSeriesPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    loadingMoviesSeriesRecommendations,
    moviesSeriesRecommendations,
    recommendationsPage,
    moviesSeriesForm,
  } = useAppSelector((state) => state.moviesSeries);

  useEffect(() => {
    if (!moviesSeriesForm) {
      dispatch(
        getMoviesSeriesRecommendation({
          genre: 0,
          content: "series",
          release: [2000, 2025],
          runtime: [0, 180],
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
      });
    } else {
      dispatch(
        getMoviesSeriesRecommendation({
          genre: moviesSeriesForm.genre,
          content: moviesSeriesForm.content,
          release: [2000, 2025],
          runtime: [0, 180],
          region: moviesSeriesForm.region,
          page: recommendationsPage,
        })
      );
    }
  }, [dispatch, moviesSeriesForm, user, recommendationsPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [recommendationsPage]);

  return (
    <>
      <Nav />
      <Side />
      <Stack flexGrow={1} p={2} gap={2} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        <MoviesSeriesForm />
        <Grid container spacing={2} position="relative">
          {moviesSeriesRecommendations?.results?.map((movieSeries) => (
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={movieSeries.id}>
              <MoviesSeriesCard movieSeries={movieSeries} />
            </Grid>
          ))}
          <Stack minWidth="100%" flex={1} gap={2} alignItems="center">
            <Pagination
              key={recommendationsPage}
              shape="rounded"
              page={recommendationsPage}
              disabled={loadingMoviesSeriesRecommendations}
              color="primary"
              variant="outlined"
              count={moviesSeriesRecommendations?.total_pages}
              onChange={async (_e, value) => {
                if (moviesSeriesForm) {
                  dispatch(setRecommendationsPage(value));
                  await dispatch(
                    getMoviesSeriesRecommendation({
                      genre: moviesSeriesForm?.genre,
                      content: moviesSeriesForm?.content,
                      release: [2000, 2025],
                      runtime: [0, 180],
                      region: moviesSeriesForm?.region,
                      page: value,
                    })
                  );
                }
              }}
            />
          </Stack>
        </Grid>
      </Stack>
    </>
  );
};
