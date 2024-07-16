import userModel from "../models/userModel.js";

export let getSingleUser = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).send({ status: false, msg: "Unautherized!" });
    }

    const singleProfile = await userModel.findById(userId);

    if (singleProfile) {
      return res
        .status(200)
        .send({ status: true, msg: "success", data: singleProfile });
    } else {
      return res.status(404).send({ status: false, msg: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "internal server error", error });
  }
};

export let updateUser = async (req, res, next) => {
  try {
    const allData = req.body;

    const userId = req.userId;

    if (!userId) {
      return res.status(401).send({ status: false, msg: "Unautherized!" });
    }

    // if (!req.body.firstName || !req.body.lastName) {
    //   return res
    //     .status(401)
    //     .send({ status: false, msg: "Full name is required" });
    // }

    if (userId) {
      var userExists = await userModel.findById(userId);
    }

    if (userExists) {
      let updateUser = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          ...allData,
        }
      );
      return res
        .status(200)
        .send({ status: true, msg: "User updated successfuly" });
    }

    return res.status(404).send({ status: false, msg: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      msg: "Something went wrong",
      error,
    });
  }
};
