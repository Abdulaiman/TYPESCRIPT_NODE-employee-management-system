import { login, signUp } from "../controllers/auth-controller";
import { protect } from "../controllers/auth-controller";
import {
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updatePassword,
  updateUser,
} from "../controllers/user-controller";
const express = require("express");
const Router = express.Router();

Router.post("/sign-up", signUp);
Router.post("/login", login);
Router.use(protect);
Router.get("/me", getMe);
Router.patch("/update-me", updateMe);
Router.patch("/update-password", updatePassword);
Router.patch("/update-user/:id", updateUser);
Router.route("/").get(getAllUsers);
Router.route("/:id").get(getUser);
export {};
module.exports = Router;
