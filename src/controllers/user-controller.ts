import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
const AppError = require("../../utils/app-error");
import User from "../model/user-model";

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
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      status: "success",
      user,
    });
  }
);
