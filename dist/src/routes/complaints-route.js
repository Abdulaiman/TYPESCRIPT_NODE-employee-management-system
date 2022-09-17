"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth-controller");
const complaints_controller_1 = require("../controllers/complaints-controller");
const express = require("express");
const Router = express.Router();
Router.use(auth_controller_1.protect);
Router.route("/").post(complaints_controller_1.createComplaints).get(complaints_controller_1.getAllComplaints);
Router.route("/:id")
    .patch(complaints_controller_1.updateComplaint)
    .get(complaints_controller_1.getComplaint)
    .delete(complaints_controller_1.deleteComplaint);
module.exports = Router;
