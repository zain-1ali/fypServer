import tagsModel from "../models/tagsModel.js";
import ProfileSchema from "../models/profileModel.js";

export let CreateUpdateProfileController = async (req, res, next) => {
  try {
    const allData = req.body;
    const { profileId } = req.body;
    if (!req.body.tagId) {
      return res.status(200).send({ status: false, msg: "QR id is required" });
    }
    if (!req.body.firstName || !req.body.lastName) {
      return res
        .status(200)
        .send({ status: false, msg: "First name should not be empty" });
    }

    if (!req.userId) {
      return res
        .status(200)
        .send({ status: false, msg: "user id should not be empty" });
    }

    let tagExist = await tagsModel.findOne({ tagId: req.body.tagId });

    // if (!tagExist) {
    //   return res.status(200).send({ status: false, msg: "QR not found" });
    // }

    if (profileId) {
      var qrExists = await ProfileSchema.findById(profileId);
    }

    if (qrExists) {
      let updateProfile = await ProfileSchema.findByIdAndUpdate(
        { _id: profileId },
        {
          ...allData,
        }
      );
      return res
        .status(200)
        .send({ status: true, msg: "Qr updated successfuly" });
    } else {
      let newProfile = await ProfileSchema.create({ ...allData });
      emitEvent("newProfile", newProfile);
      res
        .status(200)
        .send({ status: true, msg: "Medallion created successfuly" });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: "Something went wrong",
      error,
    });
  }
};

export let getSinglePfofile = async (req, res, next) => {
  try {
    const { profileId } = req.body;
    const userId = req.userId;
    if (!profileId) {
      return res
        .status(500)
        .send({ status: false, msg: "internel server error" });
    }
    if (!userId) {
      return res.status(401).send({ status: false, msg: "Unautherized!" });
    }

    const singleProfile = await ProfileSchema.findOne({ _id: profileId });

    if (singleProfile) {
      return res
        .status(200)
        .send({ status: true, msg: "success", data: singleProfile });
    } else {
      return res.status(404).send({ status: false, msg: "Profile not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "internal server error", error });
  }
};

export let getPfofileByUserid = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).send({ status: false, msg: "Unautherized!" });
    }

    const allProfiles = await ProfileSchema.find({ userId: userId });

    if (allProfiles) {
      res.status(200).send({ status: true, msg: "success", data: allProfiles });
    } else {
      res.status(404).send({ status: false, msg: "Qrs not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: false, msg: "internal server error", error });
  }
};

export let deletePfofile = async (req, res, next) => {
  try {
    const { profileId } = req.body;
    const userId = req.userId;

    if (!profileId) {
      return res
        .status(500)
        .send({ status: false, msg: "Profile id is required" });
    }

    if (!userId) {
      return res.status(401).send({ status: false, msg: "Unautherized!" });
    }

    const singleQr = await ProfileSchema.findOne({ _id: qrId });

    if (!singleQr) {
      return res.status(404).send({ status: false, msg: "Qr not found" });
    }

    const deletedQr = await ProfileSchema.findByIdAndDelete(profileId);

    if (deletedQr) {
      console.log("test");
      if (deletedQr?.status) {
        await analyticsModel.findOneAndUpdate(
          { userId },
          {
            $inc: { activeQrs: -1 },
          }
        );
      } else {
        await analyticsModel.findOneAndUpdate(
          { userId },
          {
            $inc: { inactiveQrs: -1 },
          }
        );
      }

      const allQrs = await ProfileSchema.find({ userId: userId });
      return res
        .status(200)
        .send({ status: true, msg: "Qr deleted successfuly", data: allQrs });
    }

    return res
      .status(500)
      .send({ status: false, msg: "internal server error" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "internal server error", error });
  }
};

export let CreateUpdateTimelineController = async (req, res, next) => {
  try {
    const {
      profileId,
      timelineId,
      timeStamp,
      timelineDate,
      timelineImage,
      timelineTitle,
    } = req.body;
    if (!req.body.timelineTitle) {
      return res.status(400).send({ status: false, msg: "Title is required" });
    }

    if (!req.body.userId) {
      return res
        .status(400)
        .send({ status: false, msg: "user id should not be empty" });
    }

    if (!profileId) {
      return res
        .status(400)
        .send({ status: false, msg: "profile id should not be empty" });
    }

    const profileExists = await ProfileSchema.findById(profileId);

    if (!profileExists) {
      return res.status(404).send({ status: false, msg: "profile not found" });
    }

    const timelineIndex = profileExists.timeline.findIndex(
      (c) => c._id.toString() === timelineId
    );

    if (timelineIndex === -1) {
      const newTimeline = {
        timeStamp,
        timelineDate,
        timelineImage,
        timelineTitle,
      };
      profileExists.timeline.push(newTimeline);
      await ProfileSchema.findByIdAndUpdate(
        { _id: profileId },
        {
          ...profileExists,
        }
      );

      return res
        .status(200)
        .send({ status: true, msg: "timeline added successfuly" });
    }

    profileExists.timeline[timelineIndex] = {
      ...profileExists.timeline[timelineIndex]._doc,
      timeStamp,
      timelineDate,
      timelineImage,
      timelineTitle,
    };

    await ProfileSchema.findByIdAndUpdate(
      { _id: profileId },
      {
        ...profileExists,
      }
    );

    return res
      .status(200)
      .send({ status: true, msg: "timeline updated successfuly" });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: "Something went wrong",
      error,
    });
  }
};

export let AddMediaController = async (req, res, next) => {
  try {
    const { profileId, type } = req.body;

    if (!profileId) {
      return res
        .status(400)
        .send({ status: false, msg: "profile id should not be empty" });
    }

    const profileExists = await ProfileSchema.findById(profileId);

    if (!profileExists) {
      return res.status(404).send({ status: false, msg: "profile not found" });
    }

    if (type === "image") {
      const { imageDes, imageTitle, mediaImage } = req.body;

      if (imageDes && imageTitle && mediaImage) {
        return res
          .status(400)
          .send({ status: false, msg: "All fields are required" });
      }

      const newImageMedia = {
        imageDes,
        imageTitle,
        mediaImage,
      };
      profileExists.imageMedia.push(newImageMedia);
      await ProfileSchema.findByIdAndUpdate(
        { _id: profileId },
        {
          ...profileExists,
        }
      );
    } else if (type === "video") {
      const { videoDes, videoLink, videoTitle, timeStamp } = req.body;

      if (videoDes && videoLink && videoTitle && timeStamp) {
        return res
          .status(400)
          .send({ status: false, msg: "All information are required" });
      }

      const newVideoMedia = {
        videoDes,
        videoLink,
        videoTitle,
        timeStamp,
      };
      profileExists.videoMedia.push(newVideoMedia);
      await ProfileSchema.findByIdAndUpdate(
        { _id: profileId },
        {
          ...profileExists,
        }
      );
    } else if (type === "voice") {
      const { mediaVoice, voiceDes, voiceTitle, timeStamp } = req.body;

      if (mediaVoice && voiceDes && voiceTitle && timeStamp) {
        return res
          .status(400)
          .send({ status: false, msg: "All information is required" });
      }

      const newVoiceMedia = {
        mediaVoice,
        voiceDes,
        voiceTitle,
        timeStamp,
      };
      profileExists.voiceMedia.push(newVoiceMedia);
      await ProfileSchema.findByIdAndUpdate(
        { _id: profileId },
        {
          ...profileExists,
        }
      );
    }

    return res
      .status(200)
      .send({ status: true, msg: "Media saved successfuly" });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: "Something went wrong",
      error,
    });
  }
};
