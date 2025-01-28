import { Router } from "express";
import { validateMovieSeriesForm } from "../middleware/validate.middleware";
import { submitMoviesSeriesRecommendation } from "../controllers/moviesSeries.controller";

export const moviesSeriesRouter = Router();

moviesSeriesRouter.post(
  "/recommend",
  validateMovieSeriesForm,
  submitMoviesSeriesRecommendation
);
