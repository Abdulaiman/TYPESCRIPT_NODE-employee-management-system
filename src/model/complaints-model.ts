import { model, Schema, Types } from "mongoose";

interface Icomplaints {
  header: String;
  postDate: Date;
  complaint: String;
  employee: Types.ObjectId | String;
  anonymous: String;
}

const ComplaintsSchema = new Schema<Icomplaints>({
  header: String,
  postDate: {
    type: Date,
    default: new Date(),
  },
  complaint: String,
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  anonymous: {
    type: String,
    default: "false",
  },
});

const Complaint = model<Icomplaints>("Complaints", ComplaintsSchema);

export default Complaint;
