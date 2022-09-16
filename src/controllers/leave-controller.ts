import Leave from "../model/leave-model";
import User from "../model/user-model";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catch-async";
const AppError = require("../../utils/app-error");

export const createLeave = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    req.body.employee = user._id;
    const leave = await Leave.create(req.body);
    await User.findByIdAndUpdate(
      user._id,
      {
        $inc: { leavesTaken: 1 },
      },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      leave,
    });
  }
);
export const getAllLeaves = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const leaves = await Leave.find().populate("employee").sort({ _id: -1 });

    res.status(200).json({
      status: "success",
      length: leaves.length,
      leaves,
    });
  }
);
export const getLeave = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const leave = await Leave.findById(id).populate("employee");
    if (!leave) {
      return next(new AppError("there is no leave found with this is"));
    }
    res.status(200).json({
      status: "success",
      leave,
    });
  }
);
export const updateLeave = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(id, req.body, { new: true });
    if (!leave) {
      return next(new AppError("there is no leave found with this is"));
    }

    res.status(200).json({
      status: "success",
      leave,
    });
  }
);
export const deleteLeave = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const leave = await Leave.findByIdAndDelete(id);
    if (!leave) {
      return next(new AppError("there is no leave found with this is"));
    }

    res.status(200).json({
      status: "success",
      leave,
    });
  }
);
export const getLeaveStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const stats1 = await Leave.aggregate([
      {
        $match: { status: { $ne: "hello" } },
      },
      {
        $group: {
          _id: "$status",
          sum: { $sum: 1 },
        },
      },
    ]).sort({ _id: -1 });
    const stats2 = await Leave.aggregate([
      {
        $match: { status: { $ne: "hello" } },
      },
      {
        $group: {
          _id: "$type",
          sum: { $sum: 1 },
        },
      },
    ]).sort({ _id: -1 });
    if (!stats1 || !stats2) {
      return next(new AppError("there is no stats1 found with this is"));
    }

    res.status(200).json({
      status: "success",
      stats1,
      stats2,
    });
  }
);
export const getWaitingForApprovalLeaves = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let leaves = await Leave.aggregate([
      {
        $match: { status: "waiting-for-approval" },
      },
    ]).sort({ _id: -1 });

    leaves = await User.populate(leaves, { path: "employee" });
    if (!leaves) {
      return next(new AppError("there is no leaves found with this is"));
    }

    res.status(200).json({
      status: "success",
      length: leaves.length,
      leaves,
    });
  }
);
export const getDeclinedLeaves = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let leaves = await Leave.aggregate([
      {
        $match: { status: "declined" },
      },
    ]).sort({ _id: -1 });

    leaves = await User.populate(leaves, { path: "employee" });
    if (!leaves) {
      return next(new AppError("there is no leaves found with this is"));
    }

    res.status(200).json({
      status: "success",
      length: leaves.length,
      leaves,
    });
  }
);
export const getApprovedLeaves = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let leaves = await Leave.aggregate([
      {
        $match: { status: "approved" },
      },
    ]).sort({ _id: -1 });
    leaves = await User.populate(leaves, { path: "employee" });
    if (!leaves) {
      return next(new AppError("there is no leaves found with this is"));
    }

    res.status(200).json({
      status: "success",
      leaves,
    });
  }
);
export const getMyLeaves = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id;
    let leaves = await Leave.aggregate([
      {
        $match: { employee: id },
      },
    ]).sort({ _id: -1 });
    leaves = await User.populate(leaves, { path: "employee" });
    if (!leaves) {
      return next(new AppError("there is no leave found with this is"));
    }

    res.status(200).json({
      status: "success",
      leaves,
    });
  }
);
export const getMyLeavesStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id;
    let stats2 = await Leave.aggregate([
      {
        $match: { employee: id },
      },
      {
        $group: {
          _id: "$status",
          sum: { $sum: 1 },
        },
      },
    ]).sort({ _id: -1 });

    res.status(200).json({
      status: "success",
      stats2,
    });
  }
);
