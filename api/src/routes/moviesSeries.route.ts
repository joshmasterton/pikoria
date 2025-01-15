import { Router } from "express";
import { validateMovieSeriesForm } from "../middleware/validate.middleware";
import {
  submitMoviesSeriesRecommendation,
  triggerGetMoviesSeries,
} from "../controllers/moviesSeries.controller";

export const moviesSeriesRouter = Router();

moviesSeriesRouter.get("/get", triggerGetMoviesSeries);

moviesSeriesRouter.post(
  "/recommend",
  validateMovieSeriesForm,
  submitMoviesSeriesRecommendation
);
