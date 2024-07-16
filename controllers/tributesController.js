import tributeModel from "../models/tributeModel.js";

export let CreateUpdaterTributeController = async (req, res, next) => {
  try {
    const allData = req.body;
    const { profileId } = req.body;
    if (!req.body.title) {
      return res
        .status(400)
        .send({ status: false, msg: "Title id is required" });
    }

    if (!req.body.userId) {
      return res
        .status(400)
        .send({ status: false, msg: "user id should not be empty" });
    }

    if (profileId) {
      var qrExists = await tributeModel.findById(profileId);
    }

    if (qrExists) {
      let updateProfile = await tributeModel.findByIdAndUpdate(
        { _id: profileId },
        {
          ...allData,
        }
      );
      return res
        .status(200)
        .send({ status: true, msg: "Tribute updated successfuly" });
    } else {
      let newProfile = await tributeModel.create({ ...allData });
      return res
        .status(200)
        .send({ status: true, msg: "Tribute created successfuly" });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: "Something went wrong",
      error,
    });
  }
};

export let getSingleTribute = async (req, res, next) => {
  try {
    const { tributeId } = req.body;
    const userId = req.userId;
    if (!tributeId) {
      return res
        .status(400)
        .send({ status: false, msg: "tribute id is required" });
    }
    if (!userId) {
      return res.status(401).send({ status: false, msg: "Unautherized!" });
    }

    const singleTribute = await tributeModel.findOne({ _id: tributeId });

    if (singleTribute) {
      return res
        .status(200)
        .send({ status: true, msg: "success", data: singleTribute });
    } else {
      return res.status(404).send({ status: false, msg: "tribute not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "internal server error", error });
  }
};

export let getTributesByProfileId = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { profileId } = req.body;
    if (!userId) {
      res.status(401).send({ status: false, msg: "Unautherized!" });
    }

    const allTributes = await tributeModel.find({ profileId });

    if (allTributes) {
      res.status(200).send({ status: true, msg: "success", data: allTributes });
    } else {
      res.status(404).send({ status: false, msg: "Tributes not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: false, msg: "internal server error", error });
  }
};

export let deleteTribute = async (req, res, next) => {
  try {
    const { tributeId, profileId } = req.body;
    const userId = req.userId;

    if (!tributeId) {
      return res
        .status(400)
        .send({ status: false, msg: "tribute id is required" });
    }

    if (!userId) {
      return res.status(401).send({ status: false, msg: "Unautherized!" });
    }

    const singleTribute = await tributeModel.findOne({ _id: tributeId });

    if (!singleTribute) {
      return res.status(404).send({ status: false, msg: "Tribute not found" });
    }

    const deletedQr = await tributeModel.findByIdAndDelete(tributeId);

    if (deletedQr) {
      console.log("test");
      const allTributes = await tributeModel.find({ profileId });
      return res.status(200).send({
        status: true,
        msg: "Qr deleted successfuly",
        data: allTributes,
      });
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

export const addComment = async (req, res) => {
  const { tributeId } = req.body;
  const { comment, firstName, lastName } = req.body;

  if (!comment || !firstName || !lastName) {
    return res.status(400).json({
      message: "Comment, first name, and last name should not be empty",
    });
  }

  try {
    const tribute = await tributeModel.findById(tributeId);

    if (!tribute) {
      return res.status(404).json({ message: "Tribute not found" });
    }

    const newComment = {
      comment,
      firstName,
      lastName,
      timeStamp,
    };

    tribute.comments.push(newComment);

    await tributeModel.findByIdAndUpdate(
      { _id: tributeId },
      {
        ...tribute,
      }
    );

    return res.status(200).send({
      status: true,
      msg: "comment added successfuly",
      data: tribute.comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};
