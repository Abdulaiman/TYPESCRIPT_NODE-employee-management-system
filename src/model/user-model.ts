import { Schema, model, Types } from "mongoose";
const validator = require("validator");
const bcrypt = require("bcrypt");
export interface Iuser {
  firstName: String;
  lastName: String;
  birthday: String;
  gender: String;
  address: String;
  department: Types.ObjectId;
  city: String;
  country: String;
  mobileNumber: Number;
  email: String;
  password: String;
  passwordConfirm: String | undefined;
  role: String;
  isVerified: Boolean;
  leavesTaken: Number;
  allowedLeaves?: Number;
  correctPassword: (candidatePassword: String, password: String) => any;
}

const UserSchema = new Schema<Iuser>({
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
    validate: {
      validator: function (el: String): Boolean {
        return el === this.password;
      },
      message: "password and password confirm must be the same",
    },
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
    type: Schema.Types.ObjectId,
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
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async (
  candidatePassword: String,
  password: String
) => {
  return await bcrypt.compare(candidatePassword, password);
};

const User = model<Iuser>("User", UserSchema);

export {};
export default User;
