import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import User from "../model/user-model";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create({
      name: "aiman",
      email: "test@test.com",
      password: "test1234",
      passwordConfirm: "test1234",
    });

    res.status(201).json({
      status: "success",
      user,
    });
  }
);
