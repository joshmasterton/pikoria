import { Router } from "express";
import {
  validate,
  validateQueryParams,
} from "../middleware/validate.middleware";
import {
  addToLikes,
  getFavourites,
  getMovieSeries,
  submitMoviesSeriesRecommendation,
} from "../controllers/moviesSeries.controller";
import {
  verifyToken,
  verifyTokenOptional,
} from "../middleware/verifyToken.middleware";
import { MoviesSeriesForm, MoviesSeriesType } from "../types/moviesSeries.type";
import {
  favouriteMoviesSeriesSchema,
  getMovieSeriesSchema,
  moviesSeriesSchema,
} from "../validation/moviesSeries.validation";

export const moviesSeriesRouter = Router();

moviesSeriesRouter.post(
  "/recommend",
  verifyTokenOptional,
  validate<MoviesSeriesForm>(moviesSeriesSchema),
  submitMoviesSeriesRecommendation
);

moviesSeriesRouter.post(
  "/like",
  verifyToken,
  validate<MoviesSeriesType>(favouriteMoviesSeriesSchema),
  addToLikes
);

moviesSeriesRouter.get(
  "/:id/get",
  verifyTokenOptional,
  validateQueryParams<{ id: number; content: "movie" | "series" }>(
    getMovieSeriesSchema
  ),
  getMovieSeries
);

moviesSeriesRouter.get("/favourites", verifyToken, getFavourites);
