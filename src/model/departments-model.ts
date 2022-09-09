import { Schema, model, Types } from "mongoose";

interface Idepartment {
  name: String;
  manager?: Types.ObjectId;
}

const DepartmentSchema = new Schema<Idepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    manager: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DepartmentSchema.virtual("developers", {
  ref: "User",
  localField: "_id",
  foreignField: "department",
});

const Department = model<Idepartment>("Department", DepartmentSchema);
export default Department;
