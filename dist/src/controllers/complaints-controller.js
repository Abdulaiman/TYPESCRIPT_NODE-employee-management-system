"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComplaint = exports.updateComplaint = exports.getComplaint = exports.getAllComplaints = exports.createComplaints = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const complaints_model_1 = __importDefault(require("../model/complaints-model"));
const AppError = require("../../utils/app-error");
exports.createComplaints = (0, catch_async_1.default)(async (req, res, next) => {
    if (!(req.body.anonymous === "true")) {
        req.body.employee = req.user._id;
    }
    else {
        req.body.employee = undefined;
    }
    const complaint = await complaints_model_1.default.create(req.body);
    res.status(201).json({
        status: "success",
        complaint,
    });
});
exports.getAllComplaints = (0, catch_async_1.default)(async (req, res, next) => {
    const complaints = await complaints_model_1.default.find()
        .sort({ _id: -1 })
        .populate("employee");
    res.status(201).json({
        status: "success",
        length: complaints.length,
        complaints,
    });
});
exports.getComplaint = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const complaint = await complaints_model_1.default.findById(id).populate("employee");
    if (!complaint) {
        return next(new AppError("there is no complaint found with this is"));
    }
    res.status(201).json({
        status: "success",
        complaint,
    });
});
exports.updateComplaint = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const complaint = await complaints_model_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
    }).populate("employee");
    if (!complaint) {
        return next(new AppError("there is no complaint found with this is"));
    }
    res.status(201).json({
        status: "success",
        complaint,
    });
});
exports.deleteComplaint = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const complaint = await complaints_model_1.default.findByIdAndDelete(id).populate("employee");
    if (!complaint) {
        return next(new AppError("there is no complaint found with this is"));
    }
    res.status(204).json({
        status: "success",
        complaint,
    });
});
