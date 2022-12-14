"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth-controller");
const auth_controller_2 = require("../controllers/auth-controller");
const user_controller_1 = require("../controllers/user-controller");
const express = require("express");
const Router = express.Router();
Router.post("/sign-up", auth_controller_1.signUp);
Router.post("/login", auth_controller_1.login);
Router.use(auth_controller_2.protect);
Router.get("/me", user_controller_1.getMe);
Router.patch("/update-me", user_controller_1.updateMe);
Router.get("/get-approved-users", user_controller_1.getApprovedUsers);
Router.get("/get-not-approved-users", user_controller_1.getNotApprovedUsers);
Router.patch("/update-password", user_controller_1.updatePassword);
Router.patch("/update-user/:id", user_controller_1.updateUser);
Router.route("/").get(user_controller_1.getAllUsers);
Router.get("/get-dashboard-data", user_controller_1.getDashboardData);
Router.route("/:id").get(user_controller_1.getUser);
module.exports = Router;
