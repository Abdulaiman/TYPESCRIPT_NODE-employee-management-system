import { protect } from "../controllers/auth-controller";
import {
  createLeave,
  deleteLeave,
  getAllLeaves,
  getApprovedLeaves,
  getLeave,
  getLeaveStats,
  getWaitingForApprovalLeaves,
  updateLeave,
} from "../controllers/leave-controller";

const express = require("express");
const Router = express.Router();
Router.use(protect);
Router.get("/get-leave-stats", getLeaveStats);
Router.get("/get-waiting-for-approval-leaves", getWaitingForApprovalLeaves);
Router.get("/get-approved-leaves", getApprovedLeaves);

Router.route("/").post(createLeave).get(getAllLeaves);
Router.route("/:id").patch(updateLeave).delete(deleteLeave).get(getLeave);

module.exports = Router;
