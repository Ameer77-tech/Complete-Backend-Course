import { ZodError } from "zod";
import env from "../config/env.js";
import AppError from "../errors/AppError.js";

const errorMiddlware = (err, req, res, next) => {
  if (err instanceof AppError) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      message,
      error: env.NODE_ENV === "development" ? err.data : undefined,
    });
  }

  if (err instanceof ZodError) {
    const details = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: env.NODE_ENV === "development" ? { details } : undefined,
    });
  }

  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    error: env.NODE_ENV === "development" ? { stack: err?.stack } : undefined,
  });
};

export default errorMiddlware;
