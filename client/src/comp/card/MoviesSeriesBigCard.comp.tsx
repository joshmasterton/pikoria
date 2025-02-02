import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { CustomTooltip } from "../CustomTooltip.comp";
import {
  clearMovieSeries,
  likeMovieSeries,
} from "../../redux/moviesSeriesSlice.redux";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import CircularProgress from "@mui/material/CircularProgress";

export const MoviesSeriesBigCard = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { movieSeries, loadingLike } = useAppSelector(
    (state) => state.moviesSeries
  );

  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        minHeight: 400,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <CardContent>
        <Stack gap={2} direction="row">
          <Stack gap={2}>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <CardMedia
                height={150}
                sx={{
                  maxWidth: 115,
                }}
                component="img"
                src={`https://image.tmdb.org/t/p/w500/${movieSeries?.poster_path}`}
              />

              <Stack overflow="hidden" flexGrow={1}>
                <Typography variant="h6">
                  {movieSeries?.name || movieSeries?.title}
                </Typography>
                <Typography variant="caption">
                  {movieSeries?.first_air_date || movieSeries?.release_date}
                </Typography>
                {movieSeries?.vote_average && !isSmallScreen ? (
                  <Rating
                    size="small"
                    max={10}
                    readOnly
                    precision={0.25}
                    sx={{ pt: 0.5, overflow: "hidden" }}
                    value={Math.floor(movieSeries.vote_average * 10) / 10}
                  />
                ) : (
                  <Typography>
                    {movieSeries?.vote_average &&
                      Math.floor(movieSeries.vote_average * 10) / 10}
                  </Typography>
                )}
                <Stack
                  direction="row"
                  flexGrow={1}
                  pt={2}
                  justifyContent="end"
                  alignItems="end"
                >
                  <CustomTooltip title="Add to watch later">
                    <Checkbox
                      color="success"
                      inputProps={{ "aria-label": "Add to watch later" }}
                      icon={<AddToQueueIcon />}
                      checkedIcon={<AddToQueueIcon />}
                    />
                  </CustomTooltip>
                  <CustomTooltip title="Add to favourites">
                    <Checkbox
                      color="error"
                      inputProps={{ "aria-label": "Favourite" }}
                      icon={
                        loadingLike ? (
                          <CircularProgress color="error" size={24} />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }
                      onClick={async () => {
                        if (movieSeries) {
                          await dispatch(likeMovieSeries(movieSeries));
                        }
                      }}
                      disabled={loadingLike}
                      checked={movieSeries?.liked || false}
                      checkedIcon={
                        loadingLike ? (
                          <CircularProgress color="error" size={24} />
                        ) : (
                          <FavoriteIcon />
                        )
                      }
                    />
                  </CustomTooltip>
                </Stack>
              </Stack>
              <Stack alignItems="end">
                <IconButton
                  size="small"
                  sx={{
                    backdropFilter: "blur(0.25rem)",
                    WebkitBackdropFilter: "blur(0.25rem)",
                  }}
                  onClick={() => dispatch(clearMovieSeries())}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            <Typography>{movieSeries?.overview}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Stack
        width={{ sx: "100%", sm: 2000 }}
        maxWidth={{ xs: "100%", sm: 300 }}
      >
        <CardMedia
          height="100%"
          sx={{
            maxHeight: { xs: 300, sm: "100%" },
            maskImage: {
              xs: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
              sm: "linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
            },
          }}
          component="img"
          alt={`${movieSeries?.name || movieSeries?.title} backdrop`}
          src={`https://image.tmdb.org/t/p/original/${movieSeries?.backdrop_path}`}
        />
      </Stack>
    </Card>
  );
};
