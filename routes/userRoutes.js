import express from "express";
import { getSingleUser, updateUser } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";
// import { getSingleUser, updateUser } from "../controllers/userController.js";

// router Object
const router = express.Router();

// Register route
router.post("/update", userAuth, updateUser);
// Login route
router.get("/get", userAuth, getSingleUser);

export default router;
