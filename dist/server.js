"use strict";
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE?.replace("<password>", `${process.env.DATABASE_PASSWORD}`);
mongoose
    .connect(DB, { useNewUrlParser: true })
    .then(() => console.log("database connection successful"));
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`app listening on port ${port}`));
