import tagsModel from "../models/tagsModel";

export let CreateSingleTagController = async (req, res, next) => {
  try {
    if (!req.body.tagId) {
      return res.status(401).send({ status: false, msg: "Tag id is required" });
    }

    const tagExists = await tagsModel.findOne({ tagId: req.body.tagId });

    if (tagExists) {
      return res.status(401).send({ status: false, msg: "Tag already exists" });
    }
    let newTag = await tagsModel.create({
      tagId: req.body.tagId,
      status: false,
      userid: "",
    });
    return res
      .status(200)
      .send({ status: true, msg: "Tag created successfuly" });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: "Something went wrong",
      error,
    });
  }
};

export let deleteTag = async (req, res, next) => {
  try {
    const { idOfTag } = req.body;

    if (!idOfTag) {
      return res.status(401).send({ status: false, msg: "id is required" });
    }

    const singleTag = await tagsModel.findOne({ _id: idOfTag });

    if (!singleTag) {
      return res.status(404).send({ status: false, msg: "tag not found" });
    }

    const deletedTag = await tagsModel.findByIdAndDelete(idOfTag);

    return res
      .status(200)
      .send({ status: true, msg: "Tag deleted successfuly" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "internal server error", error });
  }
};
