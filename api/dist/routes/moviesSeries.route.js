import { Router } from "express";
import { body, param, query, validationResult } from "express-validator";
import { validate, validateQuery, validateQueryParams, } from "../middleware/validate.middleware.js";
import { submitGetFavouriteMoviesSeries, submitGetMovieSeries, submitGetMoviesSeries, sumbitLikeMovieSeries, } from "../controllers/moviesSeries.controller.js";
import { verifyToken, verifyTokenOptional, } from "../middleware/verifyToken.middleware.js";
import { getFavouriteMoviesSeriesSchema, getMovieSeriesSchema, likeMovieSeriesSchema, moviesSeriesSchema, } from "../validation/moviesSeries.validation.js";
export const moviesSeriesRouter = Router();
moviesSeriesRouter.post("/recommend", verifyTokenOptional, [
    body("genre").isInt(),
    body("content").trim().escape(),
    body("page").isInt({ min: 0 }),
    body("region").trim().escape(),
    body("search").optional().trim().escape(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, validate(moviesSeriesSchema), submitGetMoviesSeries);
moviesSeriesRouter.post("/like", verifyToken, [body("id").isInt(), body("content").trim().escape()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, validate(likeMovieSeriesSchema), sumbitLikeMovieSeries);
moviesSeriesRouter.get("/:id/get", verifyTokenOptional, [param("id").isInt(), query("content").optional().trim().escape()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, validateQueryParams(getMovieSeriesSchema), submitGetMovieSeries);
moviesSeriesRouter.get("/favouriteMoviesSeries", verifyToken, [query("string").optional().trim().escape()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, validateQuery(getFavouriteMoviesSeriesSchema), submitGetFavouriteMoviesSeries);
