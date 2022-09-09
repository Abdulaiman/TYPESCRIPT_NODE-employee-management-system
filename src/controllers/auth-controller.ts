import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
const AppError = require("../../utils/app-error");
import User from "../model/user-model";
const jwt = require("jsonwebtoken");

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    const token = jwt.sign(
      { id: user._id },
      process.env.JSONWEBTOKEN_SECRET_KEY,
      {
        expiresIn: process.env.JSONWEBTOKEN_EXPIRES_IN,
      }
    );

    res.status(201).json({
      status: "success",
      token,
      user,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: { email: String; password: String } = req.body;
    const user = await User.findOne({ email });
    const decoded = await user?.correctPassword(password, user.password);
    if (!user || !decoded) {
      return next(
        new AppError(
          "invalid email adress or password please check and try again"
        )
      );
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JSONWEBTOKEN_SECRET_KEY,
      {
        expiresIn: process.env.JSONWEBTOKEN_EXPIRES_IN,
      }
    );

    res.status(201).json({
      status: "success",
      token,
    });
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next(
        new AppError("you are not logged in please log in to have access")
      );
    }
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY);
    if (!decoded) {
      return next(
        new AppError("json web token is invalid please provide a valid token")
      );
    }
    console.log(decoded);
    const { id } = decoded;
    const user = await User.findById(id);

    req.user = user;

    next();
  }
);
