import AppError from "./AppError.js";

class NotFoundError extends AppError {
  constructor(message = "Not Found", statusCode = 404, data = {}) {
    super(message, statusCode, data);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    this.data = data;
  }
}
export default NotFoundError;
