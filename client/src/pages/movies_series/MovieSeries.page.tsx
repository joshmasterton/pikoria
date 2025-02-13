import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import {
  clearMovieSeries,
  getMovieSeries,
  likeMovieSeries,
} from "../../redux/moviesSeriesSlice.redux";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Nav } from "../../comp/Nav.comp";
import { Side } from "../../comp/Side.comp";
import CardMedia from "@mui/material/CardMedia";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

export const MovieSeriesPage = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { id, content } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const { movieSeries, loadingMovieSeries, loadingLike } = useAppSelector(
    (state) => state.moviesSeries
  );
  const [movieSeriesDetailsTab, setMovieSeriesDetailsTab] = useState(1);

  useEffect(() => {
    if (id && content) {
      dispatch(
        getMovieSeries({
          id: parseInt(id),
          content: content as "movie" | "series",
        })
      );
    }
  }, [dispatch, content, id, user]);

  useEffect(() => {
    return () => {
      dispatch(clearMovieSeries());
    };
  }, [dispatch]);

  return (
    <>
      <Nav isReturn />
      <Side />
      <Stack mt={8} ml={{ xs: 0, sm: 30.75 }} position="relative">
        {loadingMovieSeries ? (
          <Stack p={2} width="100%" height="100%">
            <LinearProgress color="primary" />
          </Stack>
        ) : (
          movieSeries && (
            <>
              <Stack position="absolute" width="100% ">
                <Box
                  width="100%"
                  height="100%"
                  position="absolute"
                  sx={{
                    background: alpha("#000000", 0.7),
                    maskImage:
                      "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
                  }}
                />
                <Box
                  width="100%"
                  height={400}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backdropFilter: "blur(0.5em)",
                    WebkitBackdropFilter: "blur(0.5rem)",
                    maskImage:
                      "linear-gradient(to top, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 0) 45%)",
                  }}
                />
                <CardMedia
                  height={430}
                  component="img"
                  src={`https://image.tmdb.org/t/p/original/${movieSeries?.backdrop_path}`}
                />
              </Stack>
              <Stack
                gap={2}
                zIndex={1}
                p={2}
                pb={0}
                alignItems={{ xs: "start", md: "end" }}
                direction={{ xs: "column", md: "row" }}
              >
                <CardMedia
                  sx={{
                    minWidth: { xs: "100%", sm: 300 },
                    maxWidth: { xs: "100%", sm: 300 },
                    height: 400,
                    borderRadius: 1,
                  }}
                  component="img"
                  src={`https://image.tmdb.org/t/p/original/${movieSeries?.poster_path}`}
                />
                <Stack
                  direction="column"
                  flexGrow={1}
                  width="100%"
                  pt={{ xs: 1, md: 0 }}
                  color={{ xs: "inherit", md: "white" }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    flexGrow={1}
                  >
                    <Typography variant="h5">
                      {movieSeries?.name || movieSeries?.title}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    gap={1}
                    color={{ xs: "inherit", md: "white" }}
                  >
                    <Typography variant="caption">
                      {movieSeries?.release_date || movieSeries?.first_air_date}
                    </Typography>
                  </Stack>
                  <Stack
                    pt={2}
                    direction="row"
                    alignItems="end"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" gap={1}>
                      <Typography>
                        {Math.floor(movieSeries?.vote_average * 10) / 10}
                      </Typography>
                      <StarRoundedIcon color="warning" />
                    </Stack>
                    <Checkbox
                      sx={{ p: 0 }}
                      color="error"
                      onClick={async () =>
                        await dispatch(
                          likeMovieSeries({
                            id: movieSeries?.id,
                            content: movieSeries?.name ? "series" : "movie",
                          })
                        )
                      }
                      disabled={loadingLike}
                      checked={movieSeries?.liked ?? false}
                      icon={
                        loadingLike ? (
                          <CircularProgress size={23} color="error" />
                        ) : (
                          <FavoriteBorderRounded sx={{ color: "white" }} />
                        )
                      }
                      checkedIcon={
                        loadingLike ? (
                          <CircularProgress size={23} color="error" />
                        ) : (
                          <FavoriteIcon />
                        )
                      }
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Divider sx={{ display: { xs: "block", md: "none" }, pt: 2 }} />
              <Stack p={0} pt={{ xs: 0, md: 2 }} pb={2}>
                <Tabs
                  sx={{
                    px: 2,
                    pt: 1,
                  }}
                  value={movieSeriesDetailsTab}
                  onChange={(_e, newValue) =>
                    setMovieSeriesDetailsTab(newValue)
                  }
                  aria-label="movie-series-details"
                >
                  <Tab
                    value={1}
                    label="Overview"
                    sx={{
                      borderBottom: 1,
                      borderColor: theme.palette.divider,
                    }}
                  />
                </Tabs>
                {movieSeriesDetailsTab === 1 && (
                  <Typography p={2} pb={0}>
                    {movieSeries?.overview}
                  </Typography>
                )}
              </Stack>
            </>
          )
        )}
      </Stack>
    </>
  );
};
