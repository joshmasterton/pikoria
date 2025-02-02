import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import { alpha, useTheme } from "@mui/material/styles";
import {
  MoviesSeriesRecommendationsType,
  MoviesSeriesType,
} from "../../types/moviesSeries.type";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import { getMovieSeries } from "../../redux/moviesSeriesSlice.redux";
import CircularProgress from "@mui/material/CircularProgress";

export const MoviesSeriesCard = ({
  movieSeries,
}: {
  movieSeries: MoviesSeriesRecommendationsType;
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { loadingMovieSeries } = useAppSelector((state) => state.moviesSeries);

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {loadingMovieSeries && (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          bgcolor={alpha(theme.palette.background.default, 0.5)}
          sx={{
            zIndex: 5,
          }}
        >
          <CircularProgress color="inherit" />
        </Stack>
      )}
      <CardActionArea
        disabled={loadingMovieSeries}
        aria-label={`${movieSeries.name || movieSeries.title} Action`}
        onClick={async () =>
          await dispatch(
            getMovieSeries({
              id: movieSeries.id,
              content: movieSeries.name ? "series" : "movie",
            })
          )
        }
      >
        <CardMedia
          height={400}
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${movieSeries.poster_path}`}
        />
        <Card
          sx={{
            p: 1.5,
            position: "absolute",
            top: 10,
            backdropFilter: "blur(2rem)",
            WebkitBackdropFilter: "blur(2rem)",
            right: 10,
            zIndex: 2,
          }}
        >
          {Math.floor(movieSeries.vote_average * 10) / 10}
        </Card>
        <CardContent
          sx={{
            height: 200,
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            borderRadius: 1,
            zIndex: 2,
            backdropFilter: "blur(2rem)",
            WebkitBackdropFilter: "blur(2rem)",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)",
            background: alpha(theme.palette.background.default, 0.05),
          }}
        >
          <Stack gap={2} justifyContent="end" height="100%">
            <Typography
              color="white"
              textOverflow="ellipsis"
              overflow="hidden"
              sx={{ whiteSpace: "nowrap" }}
            >
              {movieSeries.name || movieSeries.title}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const MoviesSeriesCardAdvanced = ({
  movieSeries,
}: {
  movieSeries: MoviesSeriesType;
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { loadingMovieSeries } = useAppSelector((state) => state.moviesSeries);

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {loadingMovieSeries && (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          bgcolor={alpha(theme.palette.background.default, 0.5)}
          sx={{
            zIndex: 5,
          }}
        >
          <CircularProgress color="inherit" />
        </Stack>
      )}
      <CardActionArea
        disabled={loadingMovieSeries}
        aria-label={`${movieSeries.name || movieSeries.title} Action`}
        onClick={async () =>
          await dispatch(
            getMovieSeries({
              id: movieSeries.movie_series_id || movieSeries.id,
              content: movieSeries.name ? "series" : "movie",
            })
          )
        }
      >
        <CardMedia
          height={400}
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${movieSeries.poster_path}`}
        />
        <Card
          sx={{
            p: 1.5,
            position: "absolute",
            top: 10,
            backdropFilter: "blur(2rem)",
            WebkitBackdropFilter: "blur(2rem)",
            right: 10,
            zIndex: 2,
          }}
        >
          {Math.floor(movieSeries.vote_average * 10) / 10}
        </Card>
        <CardContent
          sx={{
            height: 200,
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            borderRadius: 1,
            zIndex: 2,
            backdropFilter: "blur(2rem)",
            WebkitBackdropFilter: "blur(2rem)",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)",
            background: alpha(theme.palette.background.default, 0.05),
          }}
        >
          <Stack gap={2} justifyContent="end" height="100%">
            <Typography
              color="white"
              textOverflow="ellipsis"
              overflow="hidden"
              sx={{ whiteSpace: "nowrap" }}
            >
              {movieSeries.name || movieSeries.title}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
