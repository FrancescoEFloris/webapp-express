import express from "express";
import { updateReview, showReview, deleteReview } from "../controllers/reviewsControllers.js";

const reviewRouter = express.Router();

// Index:

// Show:
reviewRouter.get("/:id", showReview);
//Create:

//Update:
reviewRouter.put("/:id", updateReview);

//Delete:
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;