import Notice from "../model/notice-model";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catch-async";
const AppError = require("../../utils/app-error");

export const createNotice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notice = await Notice.create(req.body);

    res.status(201).json({
      status: "success",
      notice,
    });
  }
);

export const getAllNotice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notices = await Notice.find().sort({ _id: -1 });

    res.status(200).json({
      status: "success",
      notices,
    });
  }
);
export const getNotice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    if (!notice) {
      return next(new AppError("there is no notice found with this id"));
    }
    res.status(200).json({
      status: "success",
      notice,
    });
  }
);
export const updateNotice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const notice = await Notice.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      status: "success",
      notice,
    });
  }
);
export const deleteNotice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      notice,
    });
  }
);
