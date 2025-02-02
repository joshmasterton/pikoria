import { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import Box from "@mui/material/Box";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import { clearMovieSeries } from "../../redux/moviesSeriesSlice.redux";
import {
  MoviesSeriesCard,
  MoviesSeriesCardAdvanced,
} from "../card/MoviesSeriesCard.comp";
import { MoviesSeriesBigCard } from "../card/MoviesSeriesBigCard.comp";
import {
  MoviesSeriesRecommendationsType,
  MoviesSeriesType,
} from "../../types/moviesSeries.type";

export const MoviesSeriesScroll = ({
  moviesSeriesRecommendations,
  favouriteMoviesSeries,
  loading,
  page,
  getLess,
  getMore,
}: {
  moviesSeriesRecommendations: MoviesSeriesRecommendationsType[] | undefined;
  favouriteMoviesSeries: MoviesSeriesType[] | undefined;
  loading: boolean;
  page: number;
  getLess: () => Promise<void>;
  getMore: () => Promise<void>;
}) => {
  const dispatch = useAppDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { movieSeries } = useAppSelector((state) => state.moviesSeries);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [moviesSeriesRecommendations, favouriteMoviesSeries]);

  const handleScrolling = () => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const clientWidth = scrollContainerRef.current.clientWidth;

      const isScrollAtEnd =
        Math.abs(scrollWidth - (scrollLeft + clientWidth)) <= 100;
      const isScrollAtStart = scrollLeft <= 100;

      setIsAtEnd(isScrollAtEnd);
      setIsAtStart(isScrollAtStart);
    }
  };

  // Custom scroll button function for manual scroll
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      if (direction === "left") {
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollLeft - 600,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollLeft + 600,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <Dialog
        scroll="body"
        fullWidth
        maxWidth="md"
        open={Boolean(movieSeries)}
        onClose={() => {
          dispatch(clearMovieSeries());
        }}
      >
        <MoviesSeriesBigCard />
      </Dialog>
      <Stack
        ref={scrollContainerRef}
        direction="row"
        gap={2}
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        onScroll={handleScrolling}
      >
        <IconButton
          loading={loading}
          onClick={async () => {
            if (isAtStart && page > 1) {
              await getLess();
            } else {
              scroll("left");
            }
          }}
          sx={{
            position: "absolute",
            color: "white",
            left: 0,
            height: 400,
            borderRadius: 0,
            backdropFilter: "blur(0.25rem)",
            WebkitBackdropFilter: "blur(0.25rem)",
            alignItems: "center",
            maskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>
        {moviesSeriesRecommendations &&
          moviesSeriesRecommendations?.map((movieSeries) => (
            <Box
              key={movieSeries.id}
              sx={{
                minWidth: { xs: "100%", sm: 400 },
                width: "100%",
              }}
            >
              <MoviesSeriesCard movieSeries={movieSeries} />
            </Box>
          ))}
        {favouriteMoviesSeries &&
          favouriteMoviesSeries?.map((movieSeries) => (
            <Box
              key={movieSeries.id}
              sx={{
                minWidth: { xs: "100%", sm: 400 },
                width: "100%",
              }}
            >
              <MoviesSeriesCardAdvanced movieSeries={movieSeries} />
            </Box>
          ))}
        <IconButton
          loading={loading}
          onClick={async () => {
            if (isAtEnd) {
              await getMore();
            } else {
              scroll("right");
            }
          }}
          sx={{
            position: "absolute",
            right: 0,
            height: 400,
            borderRadius: 0,
            color: "white",
            backdropFilter: "blur(0.25rem)",
            WebkitBackdropFilter: "blur(0.25rem)",
            alignItems: "center",
            maskImage:
              "linear-gradient(to left, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <ChevronRightRoundedIcon sx={{ borderRadius: 0 }} />
        </IconButton>
      </Stack>
    </>
  );
};
