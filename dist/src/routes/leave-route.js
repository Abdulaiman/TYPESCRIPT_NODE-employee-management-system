"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth-controller");
const leave_controller_1 = require("../controllers/leave-controller");
const express = require("express");
const Router = express.Router();
Router.use(auth_controller_1.protect);
Router.get("/get-leave-stats", leave_controller_1.getLeaveStats);
Router.get("/get-my-leaves", leave_controller_1.getMyLeaves);
Router.get("/get-my-leaves-stats", leave_controller_1.getMyLeavesStats);
Router.get("/get-waiting-for-approval-leaves", leave_controller_1.getWaitingForApprovalLeaves);
Router.get("/get-approved-leaves", leave_controller_1.getApprovedLeaves);
Router.get("/get-declined-leaves", leave_controller_1.getDeclinedLeaves);
Router.route("/").post(leave_controller_1.createLeave).get(leave_controller_1.getAllLeaves);
Router.route("/:id").patch(leave_controller_1.updateLeave).delete(leave_controller_1.deleteLeave).get(leave_controller_1.getLeave);
module.exports = Router;
