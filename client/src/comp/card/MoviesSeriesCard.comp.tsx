import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store.redux";
import { likeMovieSeries } from "../../redux/moviesSeriesSlice.redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { MoviesSeries } from "../../types/moviesSeries.type";

export const MoviesSeriesCard = ({
  movieSeries,
}: {
  movieSeries: MoviesSeries;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingLike, setLoadingLike] = useState(false);

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
        onClick={async () => {
          setLoadingLike(true);
          await dispatch(
            likeMovieSeries({
              id: movieSeries.id,
              content: movieSeries.name ? "series" : "movie",
            })
          );
          setLoadingLike(false);
        }}
        disabled={loadingLike}
        checked={movieSeries.liked}
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
      <CardActionArea
        aria-label={`${movieSeries.name || movieSeries.title} Action`}
        onClick={() =>
          navigate(
            `/movie-series/${movieSeries.name ? "series" : "movie"}/${
              movieSeries.id
            }`,
            { state: { from: location.pathname } }
          )
        }
      >
        <CardMedia
          height={400}
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${movieSeries.poster_path}`}
        />
        <Card
          variant="outlined"
          sx={{
            p: 1.5,
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
          }}
        >
          {Math.floor(movieSeries.vote_average * 10) / 10}
        </Card>
        <Box
          width="100%"
          height={70}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 2,
            backdropFilter: "blur(0.25em)",
            WebkitBackdropFilter: "blur(0.25rem)",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
        <CardContent
          sx={{
            height: 300,
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 2,
            background: alpha("#000000", 0.7),
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%)",
          }}
        >
          <Stack gap={2} justifyContent="end" height="100%">
            <Typography
              color="white"
              textOverflow="ellipsis"
              maxWidth="85%"
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
  movieSeries: MoviesSeries;
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loadingLike, setLoadingLike] = useState(false);

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: 1,
      }}
    >
      <Checkbox
        color="error"
        sx={{ position: "absolute", zIndex: 3, bottom: 10, right: 10 }}
        onClick={async () => {
          setLoadingLike(true);
          await dispatch(
            likeMovieSeries({
              id: movieSeries.id,
              content: movieSeries.name ? "series" : "movie",
            })
          );
          setLoadingLike(false);
        }}
        checked={movieSeries.liked}
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
      <CardActionArea
        aria-label={`${movieSeries.name || movieSeries.title} Action`}
        onClick={() =>
          navigate(
            `/movie-series/${movieSeries.name ? "series" : "movie"}/${
              movieSeries.id
            }`,
            { state: { from: location.pathname } }
          )
        }
      >
        <CardMedia
          height={400}
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${movieSeries.poster_path}`}
        />
        <Card
          variant="outlined"
          sx={{
            p: 1.5,
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
          }}
        >
          {Math.floor(movieSeries.vote_average * 10) / 10}
        </Card>
        <Box
          width="100%"
          height={70}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            borderRadius: 1,
            zIndex: 2,
            backdropFilter: "blur(0.25em)",
            WebkitBackdropFilter: "blur(0.25rem)",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1)50%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
        <CardContent
          sx={{
            height: 300,
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 2,
            background: alpha("#000000", 0.7),
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%)",
          }}
        >
          <Stack gap={2} justifyContent="end" height="100%">
            <Typography
              maxWidth="85%"
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
