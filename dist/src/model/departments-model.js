"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    manager: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
DepartmentSchema.virtual("developers", {
    ref: "User",
    localField: "_id",
    foreignField: "department",
});
const Department = (0, mongoose_1.model)("Department", DepartmentSchema);
exports.default = Department;
