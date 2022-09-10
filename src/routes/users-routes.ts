import { login, signUp } from "../controllers/auth-controller";
import { protect } from "../controllers/auth-controller";
import { getMe, updateMe } from "../controllers/user-controller";
const express = require("express");
const Router = express.Router();

Router.post("/sign-up", signUp);
Router.post("/login", login);
Router.use(protect);
Router.get("/me", getMe);
Router.patch("/update-me", updateMe);
export {};
module.exports = Router;
