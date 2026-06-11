import express from "express";
import { updateReview, showReview, createReview, deleteReview, indexReviews } from "../controllers/reviewsControllers.js";
import validateReview from "../middlewares/validateReviews.js";
import validateId from "../middlewares/validateId.js";


const reviewRouter = express.Router();

// Index:
reviewRouter.get("/", indexReviews);
// Show:
reviewRouter.get("/:id", [validateId, showReview]);
//Create:
reviewRouter.post("/", [validateReview, createReview])
//Update:
reviewRouter.put("/:id", [validateId, updateReview]);

//Delete:
reviewRouter.delete('/:id', [validateId, deleteReview]);

export default reviewRouter;