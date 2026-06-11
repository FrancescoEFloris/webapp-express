import express from 'express';
import { indexCategories, indexCategoriesProducts } from '../controllers/categoriesControllers.js';
import validateId from '../middlewares/validateId.js';

const categoriesRouter = express.Router();

//index
categoriesRouter.get("/", indexCategories);

//indexProducts
categoriesRouter.get("/:id/products", [validateId, indexCategoriesProducts]);

export default categoriesRouter;