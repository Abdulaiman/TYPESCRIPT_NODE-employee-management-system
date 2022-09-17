"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.login = exports.signUp = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const AppError = require("../../utils/app-error");
const user_model_1 = __importDefault(require("../model/user-model"));
const jwt = require("jsonwebtoken");
exports.signUp = (0, catch_async_1.default)(async (req, res, next) => {
    const user = await user_model_1.default.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JSONWEBTOKEN_SECRET_KEY, {
        expiresIn: process.env.JSONWEBTOKEN_EXPIRES_IN,
    });
    res.status(201).json({
        status: "success",
        token,
        user,
    });
});
exports.login = (0, catch_async_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_model_1.default.findOne({ email });
    const decoded = await user?.correctPassword(password, user.password);
    if (!user || !decoded) {
        return next(new AppError("invalid email adress or password please check and try again"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JSONWEBTOKEN_SECRET_KEY, {
        expiresIn: process.env.JSONWEBTOKEN_EXPIRES_IN,
    });
    res.status(201).json({
        status: "success",
        token,
        user,
    });
});
exports.protect = (0, catch_async_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else {
        return next(new AppError("you are not logged in please log in to have access"));
    }
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY);
    if (!decoded) {
        return next(new AppError("json web token is invalid please provide a valid token"));
    }
    const { id } = decoded;
    const user = await user_model_1.default.findById(id);
    req.user = user;
    next();
});
