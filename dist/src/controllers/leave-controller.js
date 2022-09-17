"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyLeavesStats = exports.getMyLeaves = exports.getApprovedLeaves = exports.getDeclinedLeaves = exports.getWaitingForApprovalLeaves = exports.getLeaveStats = exports.deleteLeave = exports.updateLeave = exports.getLeave = exports.getAllLeaves = exports.createLeave = void 0;
const leave_model_1 = __importDefault(require("../model/leave-model"));
const user_model_1 = __importDefault(require("../model/user-model"));
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const AppError = require("../../utils/app-error");
exports.createLeave = (0, catch_async_1.default)(async (req, res, next) => {
    const { user } = req;
    req.body.employee = user._id;
    const leave = await leave_model_1.default.create(req.body);
    await user_model_1.default.findByIdAndUpdate(user._id, {
        $inc: { leavesTaken: 1 },
    }, { new: true });
    res.status(201).json({
        status: "success",
        leave,
    });
});
exports.getAllLeaves = (0, catch_async_1.default)(async (req, res, next) => {
    const leaves = await leave_model_1.default.find().populate("employee").sort({ _id: -1 });
    res.status(200).json({
        status: "success",
        length: leaves.length,
        leaves,
    });
});
exports.getLeave = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const leave = await leave_model_1.default.findById(id).populate("employee");
    if (!leave) {
        return next(new AppError("there is no leave found with this is"));
    }
    res.status(200).json({
        status: "success",
        leave,
    });
});
exports.updateLeave = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const leave = await leave_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
    if (!leave) {
        return next(new AppError("there is no leave found with this is"));
    }
    res.status(200).json({
        status: "success",
        leave,
    });
});
exports.deleteLeave = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const leave = await leave_model_1.default.findByIdAndDelete(id);
    if (!leave) {
        return next(new AppError("there is no leave found with this is"));
    }
    res.status(200).json({
        status: "success",
        leave,
    });
});
exports.getLeaveStats = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const stats1 = await leave_model_1.default.aggregate([
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
    const stats2 = await leave_model_1.default.aggregate([
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
});
exports.getWaitingForApprovalLeaves = (0, catch_async_1.default)(async (req, res, next) => {
    let leaves = await leave_model_1.default.aggregate([
        {
            $match: { status: "waiting-for-approval" },
        },
    ]).sort({ _id: -1 });
    leaves = await user_model_1.default.populate(leaves, { path: "employee" });
    if (!leaves) {
        return next(new AppError("there is no leaves found with this is"));
    }
    res.status(200).json({
        status: "success",
        length: leaves.length,
        leaves,
    });
});
exports.getDeclinedLeaves = (0, catch_async_1.default)(async (req, res, next) => {
    let leaves = await leave_model_1.default.aggregate([
        {
            $match: { status: "declined" },
        },
    ]).sort({ _id: -1 });
    leaves = await user_model_1.default.populate(leaves, { path: "employee" });
    if (!leaves) {
        return next(new AppError("there is no leaves found with this is"));
    }
    res.status(200).json({
        status: "success",
        length: leaves.length,
        leaves,
    });
});
exports.getApprovedLeaves = (0, catch_async_1.default)(async (req, res, next) => {
    let leaves = await leave_model_1.default.aggregate([
        {
            $match: { status: "approved" },
        },
    ]).sort({ _id: -1 });
    leaves = await user_model_1.default.populate(leaves, { path: "employee" });
    if (!leaves) {
        return next(new AppError("there is no leaves found with this is"));
    }
    res.status(200).json({
        status: "success",
        leaves,
    });
});
exports.getMyLeaves = (0, catch_async_1.default)(async (req, res, next) => {
    const id = req.user._id;
    let leaves = await leave_model_1.default.aggregate([
        {
            $match: { employee: id },
        },
    ]).sort({ _id: -1 });
    leaves = await user_model_1.default.populate(leaves, { path: "employee" });
    if (!leaves) {
        return next(new AppError("there is no leave found with this is"));
    }
    res.status(200).json({
        status: "success",
        leaves,
    });
});
exports.getMyLeavesStats = (0, catch_async_1.default)(async (req, res, next) => {
    const id = req.user._id;
    let stats2 = await leave_model_1.default.aggregate([
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
});
