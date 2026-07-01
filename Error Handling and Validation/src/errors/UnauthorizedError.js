import AppError from "./AppError.js";

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", statusCode = 400, data = {}) {
    super(message, statusCode, data);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    this.data = data;
  }
}
export default UnauthorizedError;
