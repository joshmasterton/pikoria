import { NextFunction, Request, Response } from "express";
import { moviesSeriesSchema } from "../validation/moviesSeries.validation";
import { ValidationError } from "yup";
import { MoviesSeriesForm } from "../types/moviesSeries.type";

// Check movies/series form is validated
export const validateMovieSeriesForm = async (
  req: Request<{}, {}, MoviesSeriesForm>,
  res: Response,
  next: NextFunction
) => {
  try {
    await moviesSeriesSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Error validating movies/series inputs" });
    }
  }
};
