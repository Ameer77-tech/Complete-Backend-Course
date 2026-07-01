import AppError from "./AppError.js";

class ForbiddenError extends AppError {
  constructor(message = "Forbidden", statusCode = 300, data = {}) {
    super(message, statusCode, data);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    this.data = data;
  }
}
export default ForbiddenError;
