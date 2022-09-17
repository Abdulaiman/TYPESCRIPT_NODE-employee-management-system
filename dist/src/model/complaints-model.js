"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ComplaintsSchema = new mongoose_1.Schema({
    header: String,
    postDate: {
        type: Date,
        default: new Date(),
    },
    complaint: String,
    employee: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    anonymous: {
        type: String,
        default: "false",
    },
});
const Complaint = (0, mongoose_1.model)("Complaints", ComplaintsSchema);
exports.default = Complaint;
