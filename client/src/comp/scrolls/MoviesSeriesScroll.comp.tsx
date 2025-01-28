import { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import Box from "@mui/material/Box";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import {
  clearMoviesSeries,
  decrementPage,
  getMoviesSeriesRecommendation,
  incrementPage,
} from "../../redux/moviesSeriesSlice.redux";
import { MoviesSeriesCard } from "../card/MoviesSeriesCard.comp";

export const MoviesSeriesScroll = () => {
  const dispatch = useAppDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { TMDBmoviesSeries, moviesSeriesForm, loading, page } = useAppSelector(
    (state) => state.moviesSeries
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [TMDBmoviesSeries]);

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
    <Dialog
      open={Boolean(TMDBmoviesSeries)}
      onClose={() => dispatch(clearMoviesSeries())}
      scroll="body"
      fullWidth
      maxWidth="lg"
      PaperProps={{
        style: {
          background: "transparent",
          backdropFilter: "blur(0.25rem)",
          WebkitBackdropFilter: "blur(0.25rem)",
          boxShadow: "none",
        },
      }}
    >
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
          onClick={async () => {
            if (isAtStart && page > 1) {
              if (moviesSeriesForm) {
                await dispatch(
                  getMoviesSeriesRecommendation({
                    genre: moviesSeriesForm?.genre,
                    content: moviesSeriesForm?.content,
                    release: moviesSeriesForm?.release,
                    runtime: moviesSeriesForm?.runtime,
                    region: moviesSeriesForm?.region,
                    page: page - 1,
                  })
                );

                dispatch(decrementPage());
              }
            } else {
              scroll("left");
            }
          }}
          sx={{
            position: "absolute",
            color: "white",
            left: 0,
            height: 370,
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
        {TMDBmoviesSeries?.map((movieSeries) => (
          <Box
            key={movieSeries.id}
            sx={{
              minWidth: {
                xs: "100%",
                sm: "50%",
                md: "33.33%",
                xl: "25%",
              },
              width: "100%",
            }}
          >
            <MoviesSeriesCard movieSeries={movieSeries} />
          </Box>
        ))}
        <IconButton
          loading={loading}
          onClick={async () => {
            if (isAtEnd) {
              if (moviesSeriesForm) {
                await dispatch(
                  getMoviesSeriesRecommendation({
                    genre: moviesSeriesForm?.genre,
                    content: moviesSeriesForm?.content,
                    release: moviesSeriesForm?.release,
                    runtime: moviesSeriesForm?.runtime,
                    region: moviesSeriesForm?.region,
                    page: page + 1,
                  })
                );

                dispatch(incrementPage());
              }
            } else {
              scroll("right");
            }
          }}
          sx={{
            position: "absolute",
            right: 0,
            height: 370,
            borderRadius: 0,
            color: "white",
            backdropFilter: "blur(0.25rem)",
            WebkitBackdropFilter: "blur(1rem)",
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
    </Dialog>
  );
};
