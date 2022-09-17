"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.getUser = exports.getAllUsers = exports.updateUser = exports.updateMe = exports.getDashboardData = exports.getNotApprovedUsers = exports.getApprovedUsers = exports.getMe = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const AppError = require("../../utils/app-error");
const user_model_1 = __importDefault(require("../model/user-model"));
const leave_model_1 = __importDefault(require("../model/leave-model"));
const departments_model_1 = __importDefault(require("../model/departments-model"));
exports.getMe = (0, catch_async_1.default)(async (req, res, next) => {
    const { _id: id } = req.user;
    const user = await user_model_1.default.findById(id);
    res.status(200).json({
        status: "success",
        user,
    });
});
exports.getApprovedUsers = (0, catch_async_1.default)(async (req, res, next) => {
    let users = await user_model_1.default.aggregate([
        {
            $match: { isVerified: true },
        },
    ]);
    users = await departments_model_1.default.populate(users, { path: "department" });
    res.status(200).json({
        status: "success",
        users,
    });
});
exports.getNotApprovedUsers = (0, catch_async_1.default)(async (req, res, next) => {
    let users = await user_model_1.default.aggregate([
        {
            $match: { isVerified: false },
        },
    ]);
    users = await departments_model_1.default.populate(users, { path: "department" });
    res.status(200).json({
        status: "success",
        users,
    });
});
exports.getDashboardData = (0, catch_async_1.default)(async (req, res, next) => {
    const users = await user_model_1.default.aggregate([
        {
            $match: { isVerified: true },
        },
    ]);
    const departments = await departments_model_1.default.find();
    const leaves = await leave_model_1.default.find();
    res.status(200).json({
        status: "success",
        staff: users.length,
        dep: departments.length,
        leave: leaves.length,
    });
});
exports.updateMe = (0, catch_async_1.default)(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError("this route can't be used to update the password of a user"));
    }
    const { _id: id } = req.user;
    const user = await user_model_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
    }).select("-password");
    res.status(200).json({
        status: "success",
        user,
    });
});
exports.updateUser = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError("this route can't be used to update the password of a user"));
    }
    const dep = await departments_model_1.default.findOne({
        name: req.body.department,
    }).select("-password");
    req.body.department = dep?._id;
    const user = await user_model_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
    }).select("-password");
    res.status(200).json({
        status: "success",
        user,
    });
});
exports.getAllUsers = (0, catch_async_1.default)(async (req, res, next) => {
    const users = await user_model_1.default.find().sort({ _id: -1 });
    res.status(200).json({
        status: "success",
        length: users.length,
        users,
    });
});
exports.getUser = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const user = await user_model_1.default.findById(id).select("-password");
    res.status(200).json({
        status: "success",
        user,
    });
});
exports.updatePassword = (0, catch_async_1.default)(async (req, res, next) => {
    const { _id: id } = req.user;
    const { password, newPassword } = req.body;
    const user = await user_model_1.default.findById(id);
    const correctPassword = await user?.correctPassword(password, user.password);
    if (!user) {
        return next(new AppError("no user found with that id", 400));
    }
    if (!correctPassword) {
        return next(new AppError("provided password is wrong please check and try again", 400));
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
        user,
    });
});
