"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth-controller");
const department_controller_1 = require("../controllers/department-controller");
const express = require("express");
const Router = express.Router();
Router.use(auth_controller_1.protect);
Router.route("/").post(department_controller_1.createDepartment).get(department_controller_1.getAllDepartments);
Router.route("/:id")
    .get(department_controller_1.getDepartment)
    .delete(department_controller_1.deleteDepartment)
    .patch(department_controller_1.updateDepartment);
module.exports = Router;
