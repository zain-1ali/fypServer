import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
// import ErrorHandler from "../utils/errorHandle.js";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send({
        status: false,
        msg: "Auth Failed",
      });
    }
    const token = authHeader.split(" ")[1];

    const payload = await Jwt.verify(token, "mySecret");
    // console.log(payload.userId);
    let userExist = await userModel.findById(payload.userId);

    if (!userExist) {
      return res.status(404).send({ status: false, msg: "User not found" });
    }
    req.userId = await payload.userId;
    next();
  } catch (error) {
    // next(new ErrorHandler("Auth Failed", 401));
    res.status(401).send({
      status: false,
      msg: "Auth Failed",
    });
    console.log(error);
  }
};

export default userAuth;
