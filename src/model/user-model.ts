import { Schema, model } from "mongoose";

interface Iuser {
  name: String;
  email: String;
  password: String;
  passwordConfirm: String;
  role: String;
}

const UserSchema = new Schema<Iuser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
});

const User = model<Iuser>("User", UserSchema);
export {};
export default User;
