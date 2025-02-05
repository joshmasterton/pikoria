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
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store.redux";
import { likeMovieSeries } from "../../redux/moviesSeriesSlice.redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { FavoriteBorderRounded } from "@mui/icons-material";

export const MoviesSeriesCard = ({
  movieSeries,
}: {
  movieSeries: MoviesSeriesRecommendationsType;
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Checkbox
        color="error"
        sx={{ position: "absolute", zIndex: 3, bottom: 10, right: 10 }}
        onClick={async () =>
          await dispatch(
            likeMovieSeries({
              id: movieSeries.id,
              content: movieSeries.name ? "series" : "movie",
            })
          )
        }
        checked={movieSeries.liked}
        icon={<FavoriteBorderRounded />}
        checkedIcon={<FavoriteIcon />}
      />
      <CardActionArea
        aria-label={`${movieSeries.name || movieSeries.title} Action`}
        onClick={() =>
          navigate(
            `/movie-series/${movieSeries.name ? "series" : "movie"}/${
              movieSeries.id
            }`
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
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Checkbox
        color="error"
        sx={{ position: "absolute", zIndex: 3, bottom: 10, right: 10 }}
        onClick={async () =>
          await dispatch(
            likeMovieSeries({
              id: movieSeries.id,
              content: movieSeries.name ? "series" : "movie",
            })
          )
        }
        checked={movieSeries.liked}
        icon={<FavoriteBorderRounded />}
        checkedIcon={<FavoriteIcon />}
      />
      <CardActionArea
        aria-label={`${movieSeries.name || movieSeries.title} Action`}
        onClick={() =>
          navigate(
            `/movie-series/${movieSeries.name ? "series" : "movie"}/${
              movieSeries.id
            }`
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
