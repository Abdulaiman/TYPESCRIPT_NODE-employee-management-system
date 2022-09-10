import {
  createNotice,
  deleteNotice,
  getAllNotice,
  getNotice,
  updateNotice,
} from "../controllers/notice-controller";

const express = require("express");
const Router = express.Router();

Router.route("/").post(createNotice).get(getAllNotice);
Router.route("/:id").patch(updateNotice).get(getNotice).delete(deleteNotice);

export {};
module.exports = Router;
