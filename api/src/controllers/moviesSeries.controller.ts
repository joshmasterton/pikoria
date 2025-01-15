import { Request, Response } from "express";
import { processMoviesSeriesRecommendation } from "../services/moviesSeries.service";
import { MoviesSeriesForm } from "../types/moviesSeries.type";
import { getMoviesSeries } from "../database/models/moviesseries.model";

// Submit users personal preferences to get a movie
export const submitMoviesSeriesRecommendation = async (
  req: Request<{}, {}, MoviesSeriesForm>,
  res: Response
) => {
  try {
    const recommendationData = req.body;

    await processMoviesSeriesRecommendation(recommendationData);

    res.status(200).json({ message: "Movies/series processed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res
        .status(400)
        .json({ error: "Error submitting movies/series recommendation" });
    }
  }
};

export const triggerGetMoviesSeries = async (_req: Request, res: Response) => {
  try {
    const result = await getMoviesSeries();
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Error getting movies/series" });
    }
  }
};
