import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catch-async";
import Complaint from "../model/complaints-model";
const AppError = require("../../utils/app-error");

export const createComplaints = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("just enter");
    if (!(req.body.anonymous === "true")) {
      req.body.employee = req.user._id;
    } else {
      req.body.employee = undefined;
    }
    console.log("just enter2");
    const complaint = await Complaint.create(req.body);
    console.log("just enter3");

    res.status(201).json({
      status: "success",
      complaint,
    });
  }
);
export const getAllComplaints = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const complaints = await Complaint.find().populate("employee");

    res.status(201).json({
      status: "success",
      length: complaints.length,
      complaints,
    });
  }
);
export const getComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const complaint = await Complaint.findById(id).populate("employee");
    if (!complaint) {
      return next(new AppError("there is no complaint found with this is"));
    }
    res.status(201).json({
      status: "success",

      complaint,
    });
  }
);
export const updateComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const complaint = await Complaint.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("employee");
    if (!complaint) {
      return next(new AppError("there is no complaint found with this is"));
    }
    res.status(201).json({
      status: "success",
      complaint,
    });
  }
);
export const deleteComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const complaint = await Complaint.findByIdAndDelete(id).populate(
      "employee"
    );
    if (!complaint) {
      return next(new AppError("there is no complaint found with this is"));
    }
    res.status(204).json({
      status: "success",
      complaint,
    });
  }
);
