import { protect } from "../controllers/auth-controller";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
} from "../controllers/department-controller";

const express = require("express");
const Router = express.Router();

Router.use(protect);
Router.route("/").post(createDepartment).get(getAllDepartments);
Router.route("/:id")
  .get(getDepartment)
  .delete(deleteDepartment)
  .patch(updateDepartment);

module.exports = Router;

export {};
