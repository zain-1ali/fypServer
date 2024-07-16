import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: { type: String, default: "" },
  name: { type: String, default: "" },
  userId: { type: String, default: "" },
  timeStamp: { type: String, default: "" },
});

const ImageMediaSchema = new Schema({
  comments: [CommentSchema],
  imageDes: { type: String, default: "" },
  imageTitle: { type: String, default: "" },
  mediaImage: { type: String, default: "" },
});

const VideoMediaSchema = new Schema({
  videoDes: { type: String, default: "" },
  videoLink: { type: String, default: "" },
  videoTitle: { type: String, default: "" },
  timeStamp: { type: String, default: "" },
});

const VoiceMediaSchema = new Schema({
  mediaVoice: { type: String, default: "" },
  timeStamp: { type: String, default: "" },
  voiceDes: { type: String, default: "" },
  voiceTitle: { type: String, default: "" },
});

const TimelineSchema = new Schema({
  timeStamp: { type: String, default: "" },

  timelineDate: { type: String, default: "" },

  timelineImage: { type: String, default: "" },

  timelineTitle: { type: String, default: "" },
});

const ProfileSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  title: { type: String, default: "" },
  relationship: { type: String, default: "" },
  veteran: {
    type: Boolean,
    default: false,
  },
  headingText: { type: String, default: "" },
  includeHeadline: {
    type: Boolean,
    default: false,
  },
  linkObituary: { type: String, default: "" },
  userProfile: { type: String, default: "" },
  bioInformation: { type: String, default: "" },
  birthDate: { type: String, default: "" },
  deathDate: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  quoteSection: { type: String, default: "" },
  createdDate: { type: String, default: "" },
  status: { type: String, default: "" },
  postPrivate: {
    type: Boolean,
    default: false,
  },
  tagId: { type: String, default: "" },
  cemeteryName: { type: String, default: "" },
  cemeteryPlot: { type: String, default: "" },
  cemeteryCity: { type: String, default: "" },
  cemeteryState: { type: String, default: "" },
  cemeteryLocation: { type: String, default: "" },
  donationsUrl: { type: String, default: "" },
  imageMedia: [ImageMediaSchema],
  videoMedia: [VideoMediaSchema],
  voiceMedia: [VoiceMediaSchema],
  timeline: [TimelineSchema],
});

export default mongoose.model("Profile", ProfileSchema);
