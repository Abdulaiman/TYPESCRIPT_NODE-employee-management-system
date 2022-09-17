"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getDepartment = exports.getAllDepartments = exports.createDepartment = void 0;
const departments_model_1 = __importDefault(require("../model/departments-model"));
const user_model_1 = __importDefault(require("../model/user-model"));
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const AppError = require("../../utils/app-error");
exports.createDepartment = (0, catch_async_1.default)(async (req, res, next) => {
    const managerr = await user_model_1.default.findOne({ lastName: req.body.manager });
    req.body.manager = managerr?._id;
    const department = await departments_model_1.default.create(req.body);
    res.status(201).json({
        status: "success",
        department,
    });
});
exports.getAllDepartments = (0, catch_async_1.default)(async (req, res, next) => {
    const departments = await departments_model_1.default.find()
        .populate("manager developers")
        .sort({ _id: -1 })
        .select("-password");
    res.status(200).json({
        status: "success",
        length: departments.length,
        departments,
    });
});
exports.getDepartment = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const department = await departments_model_1.default.findById(id).populate("manager developers");
    if (!department) {
        return next(new AppError("no user found with that id", 400));
    }
    res.status(200).json({
        status: "success",
        department,
    });
});
exports.updateDepartment = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const managerr = await user_model_1.default.findOne({ lastName: req.body.manager });
    req.body.manager = managerr?._id;
    const department = await departments_model_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
    }).populate("manager developers");
    res.status(200).json({
        status: "success",
        department,
    });
});
exports.deleteDepartment = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    await departments_model_1.default.findByIdAndDelete(id);
    res.status(204).json({
        status: "success",
    });
});
