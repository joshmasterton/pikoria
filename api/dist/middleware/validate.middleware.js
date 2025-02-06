import { ValidationError } from "yup";
// Check body is validated
export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        }
        catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ errors: error.errors });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: "Error validating inputs" });
            }
        }
    };
};
// Check query and params is validated
export const validateQuery = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.query, { abortEarly: false });
            next();
        }
        catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ errors: error.errors });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: "Error validating inputs" });
            }
        }
    };
};
// Check query and params is validated
export const validateQueryParams = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate({ params: req.params, query: req.query }, { abortEarly: false });
            next();
        }
        catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ errors: error.errors });
            }
            else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: "Error validating inputs" });
            }
        }
    };
};
