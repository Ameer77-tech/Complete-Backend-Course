class AppError extends Error {
  constructor(message = "Something Went Wrong", statusCode = 500, data = {}) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    this.data = data;
  }
}
export default AppError;
