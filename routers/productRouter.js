import express from 'express';
import { indexProduct, showProduct } from '../controllers/productsControllers.js';
import { IndexReviewsProduct } from '../controllers/reviewsControllers.js';
import validateId from '../middlewares/validateId.js';

const productRouter = express.Router();

//index
productRouter.get("/", indexProduct);

//show
productRouter.get("/:id", [validateId, showProduct])

// Product reviews
// GET /products/:id/reviews
productRouter.get("/:id/reviews", [validateId, IndexReviewsProduct]);

export default productRouter;