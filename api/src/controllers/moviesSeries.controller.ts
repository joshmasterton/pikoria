import { Response } from "express";
import {
  processGetMoviesSeries,
  processLikeMovieSeries,
} from "../services/moviesSeries.service";
import { MoviesSeriesForm } from "../types/moviesSeries.type";
import { RequestWithUser } from "../types/request.type";
import { AxiosError } from "axios";
import {
  getFavouriteMoviesSeries,
  getMovieSeries,
} from "../database/models/moviesSeries.model";

// Get movies_series recommendations
export const submitGetMoviesSeries = async (
  req: RequestWithUser<{}, {}, MoviesSeriesForm>,
  res: Response
) => {
  try {
    const recommendationData = req.body;
    const { user } = req;

    const recommendedMoviesSeries = await processGetMoviesSeries(
      recommendationData,
      user?.uid
    );

    res.status(200).json(recommendedMoviesSeries);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res
        .status(400)
        .json({ error: "Error submitting movies_series recommendation" });
    }
  }
};

// Insert movies_series into favourites
export const sumbitLikeMovieSeries = async (
  req: RequestWithUser<{}, {}, { id: number; content: "movie" | "series" }>,
  res: Response
) => {
  try {
    const { user } = req;
    const { id, content } = req.body;

    if (!user) {
      throw new Error("No user present");
    }

    await processLikeMovieSeries(user?.uid, id);

    const movieSeries = await getMovieSeries(id, content, user?.uid);

    res.status(200).json(movieSeries);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error: "Error adding movie_series to liked list" });
  }
};

// Get a movie or series
export const submitGetMovieSeries = async (
  req: RequestWithUser<{ id: number }, {}, {}, { content: "movie" | "series" }>,
  res: Response
) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { content } = req.query;

    const movieSeries = await getMovieSeries(id, content, user?.uid);

    res.status(200).json(movieSeries);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.code);
    } else {
      console.log(error);
    }
    res.status(400).json({ error: "Error getting movie_series" });
  }
};

// Get favourite movies_series
export const submitGetFavouriteMoviesSeries = async (
  req: RequestWithUser<{}, {}, {}, { page: number; search?: string }>,
  res: Response
) => {
  try {
    const { user } = req;
    const { page, search } = req.query;

    if (!user) {
      throw new Error("No user present");
    }

    const favouriteMoviesSeries = await getFavouriteMoviesSeries(
      user?.uid,
      page,
      search
    );

    res.status(200).json(favouriteMoviesSeries);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getting movies_series from favourites" });
  }
};
