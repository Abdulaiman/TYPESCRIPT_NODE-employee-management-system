const AppError = require("../../utils/app-error");
import { Request, Response, NextFunction } from "express";
const handleCastErrorDb = (err: any) => {
  const message = `invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateKeyDb = (err: any) => {
  const message = `dupliacte field value "${err.keyValue.name}" please use another value`;
  return new AppError(message, 400);
};
const handleValidationErrorDb = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleError = () => new AppError("invalid token please login again", 401);
const handleJwtExpired = () =>
  new AppError("your token is expired please login again", 401);

const sendErrorProd = (err: any, res: Response) => {
  console.log("just testing right herre");
  console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: "error",
      message: err,
    });
  }
};

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

exports.globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  } else if (process.env.NODE_ENV === "development") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDb(error);
    if (error.code === 11000) error = handleDuplicateKeyDb(error);
    if (err.name === "ValidationError") error = handleValidationErrorDb(error);
    if (error.name === "JsonWebTokenError") error = handleError();
    if (error.name === "TokenExpiredError") error = handleJwtExpired();
    sendErrorDev(err, res);
  }
};
export {};
