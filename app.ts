import { NextFunction, Request, Response } from "express";
const { globalErrorHandler } = require("./src/controllers/error-controller");
const express = require("express");
const app = express();
const UserRouter = require("./src/routes/users-routes");
const DepartmentsRouter = require("./src/routes/department-route");
const NoticeRoute = require("./src/routes/notice-route");
const LeaveRoute = require("./src/routes/leave-route");
const ComplaintsRoute = require("./src/routes/complaints-route");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/departments", DepartmentsRouter);
app.use("/api/v1/notice", NoticeRoute);
app.use("/api/v1/leaves", LeaveRoute);
app.use("/api/v1/complaints", ComplaintsRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: "not found",
    message: `can't find ${req.url} on this server`,
  });
});

app.use(globalErrorHandler);
export {};
module.exports = app;
