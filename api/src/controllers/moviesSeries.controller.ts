import { Request, Response } from "express";
import { processMoviesSeriesRecommendation } from "../services/moviesSeries.service";
import { MoviesSeriesForm } from "../types/moviesSeries.type";

// Submit users personal preferences to get a movie
export const submitMoviesSeriesRecommendation = async (
  req: Request<{}, {}, MoviesSeriesForm>,
  res: Response
) => {
  try {
    const recommendationData = req.body;

    const recommendedData = await processMoviesSeriesRecommendation(
      recommendationData
    );

    res.status(200).json(recommendedData);
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
