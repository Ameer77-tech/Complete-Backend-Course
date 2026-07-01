import env from "../config/env.js";
import AppError from "../errors/AppError.js";
const errorMiddlware = (err, req, res, next) => {
  if (err instanceof AppError) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      message,
      error: env.NODE_ENV === "development" && err.stack && err.data,
    });
  }
};

export default errorMiddlware;
