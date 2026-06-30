import env from "../config/env.js";
const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;

  res.status(status).json({
    message: err.message || "Internal Server Error",
    success: false,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
