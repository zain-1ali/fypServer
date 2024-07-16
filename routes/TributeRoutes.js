import express from "express";
import {
  addComment,
  CreateUpdaterTributeController,
  deleteTribute,
  getSingleTribute,
  getTributesByProfileId,
} from "../controllers/tributesController.js";

// router Object
const router = express.Router();

// Register route
router.post("/create", CreateUpdaterTributeController);
// Login route
router.post("/getSingle", getSingleTribute);
router.post("/getById", getTributesByProfileId);
router.post("/delete", deleteTribute);
router.post("/comment", addComment);

export default router;
