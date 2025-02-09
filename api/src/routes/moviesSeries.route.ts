import { Router, Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from "express-validator";
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
import { RequestWithUser } from "../types/request.type";

export const moviesSeriesRouter = Router();

moviesSeriesRouter.post(
  "/recommend",
  verifyTokenOptional,
  [
    body("genre").isInt(),
    body("content").trim().escape(),
    body("page").isInt({ min: 1 }),
    body("region").trim().escape(),
    body("search").optional().trim().escape(),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  validate<MoviesSeriesForm>(moviesSeriesSchema),
  submitMoviesSeriesRecommendation
);

moviesSeriesRouter.post(
  "/like",
  verifyToken,
  [body("id").isInt(), body("content").trim().escape()],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  validate<LikeMovieSeriesForm>(likeMovieSeriesSchema),
  sumbitLikeMovieSeries
);

moviesSeriesRouter.get(
  "/:id/get",
  verifyTokenOptional,
  [param("id").isInt(), query("content").optional().trim().escape()],
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  validateQueryParams<{ id: number; content: "movie" | "series" }>(
    getMovieSeriesSchema
  ),
  submitGetMovieSeries
);

moviesSeriesRouter.get(
  "/favouriteMoviesSeries",
  verifyToken,
  [query("string").optional().trim().escape()],
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  validateQuery<{ page: number }>(getFavouriteMoviesSeriesSchema),
  submitGetFavouriteMoviesSeries
);
