"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "please use a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    passwordConfirm: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    birthday: {
        type: Date,
        required: true,
    },
    allowedLeaves: {
        type: Number,
        default: 20,
    },
    leavesTaken: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Department",
    },
    role: {
        type: String,
        default: "staff",
        enum: {
            values: ["staff", "manager", "admin"],
            message: "the value is passed is not a valid",
        },
    },
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});
UserSchema.pre(/^find/, async function (next) {
    this.populate("department");
    next();
});
UserSchema.methods.correctPassword = async (candidatePassword, password) => {
    return await bcrypt.compare(candidatePassword, password);
};
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
