"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NoticeSchema = new mongoose_1.Schema({
    notice: String,
    date: {
        type: Date,
        default: new Date(),
    },
    header: String,
});
const Notice = (0, mongoose_1.model)("Notice", NoticeSchema);
exports.default = Notice;
