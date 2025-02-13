import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import * as yup from "yup";

// Check body is validated
export const validate = <T>(schema: yup.ObjectSchema<any>) => {
  return async (req: Request<{}, {}, T>, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ errors: error.errors });
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Error validating inputs" });
      }
    }
  };
};

// Check query and params is validated
export const validateQuery = <T>(schema: yup.ObjectSchema<any>) => {
  return async (
    req: Request<{}, {}, {}, T>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.validate(req.query, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ errors: error.errors });
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Error validating inputs" });
      }
    }
  };
};

// Check query and params is validated
export const validateQueryParams = <T>(schema: yup.ObjectSchema<any>) => {
  return async (
    req: Request<{}, {}, {}, T>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.validate(
        { params: req.params, query: req.query },
        { abortEarly: false }
      );
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ errors: error.errors });
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Error validating inputs" });
      }
    }
  };
};
