import { NextFunction, Request, Response } from "express";
const { globalErrorHandler } = require("./src/controllers/error-controller");
const express = require("express");
const app = express();
const UserRouter = require("./src/routes/users-routes");
const DepartmentsRouter = require("./src/routes/department-route");

app.use(express.json());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/departments", DepartmentsRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: "not found",
    message: `can't find ${req.url} on this server`,
  });
});

app.use(globalErrorHandler);
export {};
module.exports = app;
