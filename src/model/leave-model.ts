import { Types, Schema, model } from "mongoose";

interface Ileave {
  type: String;
  employee: Types.ObjectId;
  postDate: Date;
  status: String;
  from: Date;
  to: Date;
}
const LeaveSchema = new Schema<Ileave>({
  type: {
    type: String,
    required: true,
    enum: {
      values: ["holiday", "sick-leave", "vacation", "emergency"],
    },
  },
  employee: {
    type: Schema.Types.ObjectId,
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
      values: ["waiting-for-approval", "approved"],
      message: "a status can only be approved or waiting",
    },
    default: "waiting-for-approval",
  },
});

const Leave = model<Ileave>("Leave", LeaveSchema);

export default Leave;
