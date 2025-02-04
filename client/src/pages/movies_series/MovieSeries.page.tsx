import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import { getMovieSeries } from "../../redux/moviesSeriesSlice.redux";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";

export const MovieSeriesPage = () => {
  const dispatch = useAppDispatch();
  const { id, content } = useParams();
  const { movieSeries } = useAppSelector((state) => state.moviesSeries);

  useEffect(() => {
    if (id && content) {
      dispatch(
        getMovieSeries({
          id: parseInt(id),
          content: content as "movie" | "series",
        })
      );
    }
  }, [dispatch, content, id]);

  return <Stack>{movieSeries?.name || movieSeries?.title}</Stack>;
};
