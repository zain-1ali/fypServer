import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: { type: String, default: "" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  timeStamp: { type: String, default: "" },
});

const tributeSchema = new Schema({
  comments: CommentSchema,

  description: { type: String, default: "" },

  image: { type: String, default: "" },

  likes: { type: Number, default: 0 },

  profileId: { type: String, default: "" },
  timeStamp: { type: String, default: "" },

  title: { type: String, default: "" },

  userId: { type: String, default: "" },
});

export default mongoose.model("Tributes", tributeSchema);
