import AppError from "./AppError.js";

class BadRequestError extends AppError {
  constructor(message = "Bad Request", statusCode = 400, data = {}) {
    super(message, statusCode, data);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    this.data = data;
  }
}
export default BadRequestError;
