"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notice_controller_1 = require("../controllers/notice-controller");
const express = require("express");
const Router = express.Router();
Router.route("/").post(notice_controller_1.createNotice).get(notice_controller_1.getAllNotice);
Router.route("/:id").patch(notice_controller_1.updateNotice).get(notice_controller_1.getNotice).delete(notice_controller_1.deleteNotice);
module.exports = Router;
