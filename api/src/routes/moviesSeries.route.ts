import { Router } from "express";
import {
  validate,
  validateQuery,
  validateQueryParams,
} from "../middleware/validate.middleware";
import {
  submitGetFavouriteMoviesSeries,
  submitGetMovieSeries,
  submitMoviesSeriesRecommendation,
  sumbitLikeMovieSeries,
} from "../controllers/moviesSeries.controller";
import {
  verifyToken,
  verifyTokenOptional,
} from "../middleware/verifyToken.middleware";
import {
  LikeMovieSeriesForm,
  MoviesSeriesForm,
} from "../types/moviesSeries.type";
import {
  getFavouriteMoviesSeriesSchema,
  getMovieSeriesSchema,
  likeMovieSeriesSchema,
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
  validate<LikeMovieSeriesForm>(likeMovieSeriesSchema),
  sumbitLikeMovieSeries
);

moviesSeriesRouter.get(
  "/:id/get",
  verifyTokenOptional,
  validateQueryParams<{ id: number; content: "movie" | "series" }>(
    getMovieSeriesSchema
  ),
  submitGetMovieSeries
);

moviesSeriesRouter.get(
  "/favouriteMoviesSeries",
  verifyToken,
  validateQuery<{ page: number }>(getFavouriteMoviesSeriesSchema),
  submitGetFavouriteMoviesSeries
);
