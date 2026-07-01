import env from "../config/env.js";
const errorMiddlware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  return res.status(err.statusCode).json({
    success: false,
    message,
    error: env.NODE_ENV === "development" && err.stack && err.data,
  });
};

export default errorMiddlware;
