import AppError from "./AppError.js";

class ConflictError extends AppError {
  constructor(message = "Conflict", statusCode = 409, data = {}) {
    super(message, statusCode, data);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    this.data = data;
  }
}
export default ConflictError;
