import { Router } from "express";
import ProductController from "../controllers/ProductController";
import cookieJwtAuth from "../middleware/cookieJwtAuth";

const ProductRouter = Router();

ProductRouter.get('/', cookieJwtAuth, ProductController.getProducts);
ProductRouter.get('/:id', cookieJwtAuth, ProductController.getProduct);
ProductRouter.post('/', cookieJwtAuth, ProductController.createProduct);
ProductRouter.put('/:id', cookieJwtAuth, ProductController.updateProduct);
ProductRouter.delete('/:id', cookieJwtAuth, ProductController.deleteProduct);


export default ProductRouter;