import { login, signUp } from "../controllers/auth-controller";
import { protect } from "../controllers/auth-controller";
import {
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  getDashboardData,
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
Router.get("/get-approved-users", getApprovedUsers);
Router.get("/get-not-approved-users", getNotApprovedUsers);
Router.patch("/update-password", updatePassword);
Router.patch("/update-user/:id", updateUser);
Router.route("/").get(getAllUsers);
Router.get("/get-dashboard-data", getDashboardData);
Router.route("/:id").get(getUser);
export {};
module.exports = Router;
