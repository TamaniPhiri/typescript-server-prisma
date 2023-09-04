import { Router } from "express";
import ProductController from "../controllers/ProductController";
import cookieJwtAuth from "../middleware/cookieJwtAuth";

const ProductRouter=Router();

ProductRouter.get('/',cookieJwtAuth,ProductController.getProducts);
ProductRouter.get('/:id',ProductController.getProduct);
ProductRouter.post('/',ProductController.createProduct);
ProductRouter.put('/:id',ProductController.updateProduct);
ProductRouter.delete('/:id',ProductController.deleteProduct);


export default ProductRouter;