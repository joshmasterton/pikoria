import { Response } from "express";
import {
  processFavouriteMoviesSeries,
  processMoviesSeriesRecommendation,
} from "../services/moviesSeries.service";
import {
  MoviesSeriesForm,
  TMDBMovieSeriesType,
} from "../types/moviesSeries.type";
import { RequestWithUser } from "../types/request.type";
import {
  processMovieSeriesRetrieval,
  processMoviesSeriesRetrieval,
} from "../database/models/moviesSeries.model";
import { AxiosError } from "axios";

// Submit users personal preferences to get a movie_series
export const submitMoviesSeriesRecommendation = async (
  req: RequestWithUser<{}, {}, MoviesSeriesForm>,
  res: Response
) => {
  try {
    const recommendationData = req.body;
    const { user } = req;

    const recommendedData = await processMoviesSeriesRecommendation(
      recommendationData,
      user?.uid
    );

    res.status(200).json(recommendedData);
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
export const addToLikes = async (
  req: RequestWithUser<{}, {}, TMDBMovieSeriesType>,
  res: Response
) => {
  try {
    const { user } = req;
    const favouriteMovieSeries = req.body;

    if (!user) {
      throw new Error("No user present");
    }

    const result = await processFavouriteMoviesSeries(
      user?.uid,
      favouriteMovieSeries
    );

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error: "Error adding movie_series to liked list" });
  }
};

export const getMovieSeries = async (
  req: RequestWithUser<{ id: number }, {}, {}, { content: "movie" | "series" }>,
  res: Response
) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { content } = req.query;

    const movieSeries = await processMovieSeriesRetrieval(
      id,
      content,
      user?.uid
    );

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
export const getFavourites = async (req: RequestWithUser, res: Response) => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("No user present");
    }

    const favouriteMoviesSeries = await processMoviesSeriesRetrieval(user?.uid);

    res.status(200).json(favouriteMoviesSeries);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getting movies_series from favourites" });
  }
};
