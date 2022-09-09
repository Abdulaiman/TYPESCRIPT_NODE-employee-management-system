import { login, signUp } from "../controllers/auth-controller";
import { protect } from "../controllers/auth-controller";
const express = require("express");
const Router = express.Router();

Router.post("/sign-up", signUp);
Router.post("/login", login);
Router.use(protect);
export {};
module.exports = Router;
