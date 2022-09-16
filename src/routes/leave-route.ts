import { protect } from "../controllers/auth-controller";
import {
  createLeave,
  deleteLeave,
  getAllLeaves,
  getApprovedLeaves,
  getDeclinedLeaves,
  getLeave,
  getLeaveStats,
  getMyLeaves,
  getMyLeavesStats,
  getWaitingForApprovalLeaves,
  updateLeave,
} from "../controllers/leave-controller";

const express = require("express");
const Router = express.Router();
Router.use(protect);
Router.get("/get-leave-stats", getLeaveStats);
Router.get("/get-my-leaves", getMyLeaves);
Router.get("/get-my-leaves-stats", getMyLeavesStats);
Router.get("/get-waiting-for-approval-leaves", getWaitingForApprovalLeaves);
Router.get("/get-approved-leaves", getApprovedLeaves);
Router.get("/get-declined-leaves", getDeclinedLeaves);

Router.route("/").post(createLeave).get(getAllLeaves);
Router.route("/:id").patch(updateLeave).delete(deleteLeave).get(getLeave);

module.exports = Router;
