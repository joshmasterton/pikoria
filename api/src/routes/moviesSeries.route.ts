import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
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
import {
  MoviesSeriesForm,
  TMDBMovieSeriesType,
} from "../types/moviesSeries.type";
import {
  favouriteMoviesSeriesScheme,
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
  validate<TMDBMovieSeriesType>(favouriteMoviesSeriesScheme),
  addToLikes
);

moviesSeriesRouter.get("/:id/get", verifyTokenOptional, getMovieSeries);

moviesSeriesRouter.get("/favourites", verifyToken, getFavourites);
