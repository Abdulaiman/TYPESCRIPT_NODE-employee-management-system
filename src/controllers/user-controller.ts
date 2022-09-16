import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
const AppError = require("../../utils/app-error");
import User from "../model/user-model";
import Leave from "../model/leave-model";
import Department from "../model/departments-model";
import { listenerCount } from "events";

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id: id } = req.user;
    const user = await User.findById(id);

    res.status(200).json({
      status: "success",
      user,
    });
  }
);
export const getApprovedUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let users = await User.aggregate([
      {
        $match: { isVerified: true },
      },
    ]);
    users = await Department.populate(users, { path: "department" });
    res.status(200).json({
      status: "success",
      users,
    });
  }
);
export const getNotApprovedUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let users = await User.aggregate([
      {
        $match: { isVerified: false },
      },
    ]);
    users = await Department.populate(users, { path: "department" });
    res.status(200).json({
      status: "success",
      users,
    });
  }
);
export const getDashboardData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.aggregate([
      {
        $match: { isVerified: true },
      },
    ]);
    const departments = await Department.find();
    const leaves = await Leave.find();

    res.status(200).json({
      status: "success",
      staff: users.length,
      dep: departments.length,
      leave: leaves.length,
    });
  }
);

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "this route can't be used to update the password of a user"
        )
      );
    }
    const { _id: id } = req.user;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    res.status(200).json({
      status: "success",
      user,
    });
  }
);
export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "this route can't be used to update the password of a user"
        )
      );
    }

    const dep = await Department.findOne({
      name: req.body.department,
    }).select("-password");
    req.body.department = dep?._id;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    res.status(200).json({
      status: "success",
      user,
    });
  }
);
export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find().sort({ _id: -1 });

    res.status(200).json({
      status: "success",
      length: users.length,
      users,
    });
  }
);
export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    res.status(200).json({
      status: "success",
      user,
    });
  }
);
export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id: id } = req.user;
    const { password, newPassword } = req.body;
    const user = await User.findById(id);
    const correctPassword = await user?.correctPassword(
      password,
      user.password
    );
    if (!user) {
      return next(new AppError("no user found with that id", 400));
    }
    if (!correctPassword) {
      return next(
        new AppError(
          "provided password is wrong please check and try again",
          400
        )
      );
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      user,
    });
  }
);
