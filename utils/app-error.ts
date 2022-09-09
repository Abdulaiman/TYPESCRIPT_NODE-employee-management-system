class AppError extends Error {
  statusCode: Number;
  status: String;
  isOperational: Boolean;
  constructor(message: string, statusCode: Number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
