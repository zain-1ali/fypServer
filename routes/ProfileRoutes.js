import express from "express";
import userAuth from "../middlewares/auth.js";
import {
  AddMediaController,
  CreateUpdateProfileController,
  CreateUpdateTimelineController,
  deletePfofile,
  getPfofileByUserid,
  getSinglePfofile,
} from "../controllers/profileController.js";

// router Object
const router = express.Router();

router.post("/create", userAuth, CreateUpdateProfileController);
router.get("/getProfile", userAuth, getSinglePfofile);
router.get("/getProfiles", userAuth, getPfofileByUserid);
router.get("/delete", userAuth, deletePfofile);
router.get("/createTimeline", userAuth, CreateUpdateTimelineController);
router.get("/createMedia", userAuth, AddMediaController);

export default router;
