"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotice = exports.updateNotice = exports.getNotice = exports.getAllNotice = exports.createNotice = void 0;
const notice_model_1 = __importDefault(require("../model/notice-model"));
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const AppError = require("../../utils/app-error");
exports.createNotice = (0, catch_async_1.default)(async (req, res, next) => {
    const notice = await notice_model_1.default.create(req.body);
    res.status(201).json({
        status: "success",
        notice,
    });
});
exports.getAllNotice = (0, catch_async_1.default)(async (req, res, next) => {
    const notices = await notice_model_1.default.find().sort({ _id: -1 });
    res.status(200).json({
        status: "success",
        notices,
    });
});
exports.getNotice = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const notice = await notice_model_1.default.findById(id);
    if (!notice) {
        return next(new AppError("there is no notice found with this id"));
    }
    res.status(200).json({
        status: "success",
        notice,
    });
});
exports.updateNotice = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const notice = await notice_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
        status: "success",
        notice,
    });
});
exports.deleteNotice = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const notice = await notice_model_1.default.findByIdAndDelete(id);
    res.status(200).json({
        status: "success",
        notice,
    });
});
