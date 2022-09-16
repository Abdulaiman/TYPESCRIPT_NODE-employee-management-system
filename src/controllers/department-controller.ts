import Department from "../model/departments-model";
import User from "../model/user-model";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catch-async";
const AppError = require("../../utils/app-error");

export const createDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const managerr = await User.findOne({ lastName: req.body.manager });

    req.body.manager = managerr?._id;

    const department = await Department.create(req.body);

    res.status(201).json({
      status: "success",
      department,
    });
  }
);
export const getAllDepartments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const departments = await Department.find()
      .populate("manager developers")
      .sort({ _id: -1 })
      .select("-password");

    res.status(200).json({
      status: "success",
      length: departments.length,
      departments,
    });
  }
);
export const getDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const department = await Department.findById(id).populate(
      "manager developers"
    );
    if (!department) {
      return next(new AppError("no user found with that id", 400));
    }
    res.status(200).json({
      status: "success",
      department,
    });
  }
);
export const updateDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const managerr = await User.findOne({ lastName: req.body.manager });

    req.body.manager = managerr?._id;
    const department = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("manager developers");
    res.status(200).json({
      status: "success",
      department,
    });
  }
);
export const deleteDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
    });
  }
);
