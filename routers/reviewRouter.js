import express from "express";
import { updateReview } from "../controllers/reviewsControllers.js";

const reviewRouter = express.Router();

// Index:

// Show:

//Create:

//Update:
reviewRouter.put("/:id", updateReview);

//Delete:

export default reviewRouter;