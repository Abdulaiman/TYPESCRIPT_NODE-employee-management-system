import { createUser } from "../controllers/auth-controller";

const express = require("express");
const Router = express.Router();

Router.route("/").post(createUser);

export {};
module.exports = Router;
