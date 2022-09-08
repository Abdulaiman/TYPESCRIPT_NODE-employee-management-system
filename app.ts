import { NextFunction, Request, Response } from "express";

const express = require("express");
const app = express();
const UserRouter = require("./src/routes/users-routes");

app.use(express.json());

app.use("/api/v1/users", UserRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: "not found",
    message: `can't find ${req.url} on this server`,
  });
});
export {};
module.exports = app;
