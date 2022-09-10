import { protect } from "../controllers/auth-controller";
import {
  createComplaints,
  deleteComplaint,
  getAllComplaints,
  getComplaint,
  updateComplaint,
} from "../controllers/complaints-controller";

const express = require("express");
const Router = express.Router();
Router.use(protect);
Router.route("/").post(createComplaints).get(getAllComplaints);
Router.route("/:id")
  .patch(updateComplaint)
  .get(getComplaint)
  .delete(deleteComplaint);

module.exports = Router;
