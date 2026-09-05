import { ZodError } from "zod";

/**
 * Returns middleware that validates req.body against the given Zod schema.
 * On success, req.body is replaced with the parsed (and coerced) data.
 * On failure, responds 400 with a list of field errors.
 *
 * @param {import('zod').ZodTypeAny} schema
 */
const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({ message: "Validation failed", errors });
    }
    next(error);
  }
};

export default validate;
