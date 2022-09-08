import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE?.replace(
  "<password>",
  `${process.env.DATABASE_PASSWORD}`
);
mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("database connection successful"));

app.listen(8000, () => console.log("app listening on port 8000"));
export {};
