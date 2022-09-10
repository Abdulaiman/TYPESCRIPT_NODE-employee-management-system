import { Schema, model } from "mongoose";

interface Inotice {
  notice: String;
  date: Date;
  header: String;
}

const NoticeSchema = new Schema<Inotice>({
  notice: String,
  date: {
    type: Date,
    default: new Date(),
  },
  header: String,
});

const Notice = model<Inotice>("Notice", NoticeSchema);

export default Notice;
