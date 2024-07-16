import mongoose from "mongoose";

let tagsModel = new mongoose.Schema({
  status: {
    type: Boolean,
    default: false,
  },
  tagId: {
    type: String,
    unique: true,
  },
  userid: { type: mongoose.Types.ObjectId, ref: "User", require: true },
});

export default mongoose.model("Tags", tagsModel);
