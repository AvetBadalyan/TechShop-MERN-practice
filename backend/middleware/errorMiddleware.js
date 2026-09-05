const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const body = { message: err.message };
  // Only expose the stack trace outside production to avoid leaking internals.
  if (process.env.NODE_ENV !== "production") {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
};

export { errorHandler, notFound };
