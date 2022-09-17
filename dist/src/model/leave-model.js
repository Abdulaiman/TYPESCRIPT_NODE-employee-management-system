"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LeaveSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: {
            values: ["holiday", "sick-leave", "vacation", "emergency"],
        },
    },
    employee: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    postDate: {
        type: Date,
        default: new Date(),
    },
    from: {
        type: Date,
    },
    to: {
        type: Date,
    },
    status: {
        type: String,
        enum: {
            values: ["waiting-for-approval", "approved", "declined"],
            message: "a status can only be approved or waiting or declined",
        },
        default: "waiting-for-approval",
    },
    declineMessage: String,
});
const Leave = (0, mongoose_1.model)("Leave", LeaveSchema);
exports.default = Leave;
