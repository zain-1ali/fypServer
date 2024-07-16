import mongoose from "mongoose";

let userModel = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },

  profileImage: {
    type: String,
    default: "",
  },
  coverImage: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  muteNotificiation: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userModel);
