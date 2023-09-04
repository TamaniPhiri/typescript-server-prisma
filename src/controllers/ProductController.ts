import ProductService from "../services/ProductService";
import { Request, Response } from 'express';

const ProductController = () => {
    const getProducts = async (req: Request, res: Response) => {
        try {
            const products = await ProductService.GetAllProducts();
            if (!products) {
                return res.status(400).json("No products found")
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json(error)
            console.log(error)
        }
    }
    const getProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json("Enter a valid ID")
            }
            const productId = parseInt(id)
            const product = await ProductService.GetProductById(productId);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json(error);
            console.log(error);
        }
    }
    const createProduct = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json("No valid data")
            }
            const product = await ProductService.CreateProduct(data);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json(error);
            console.log(error);
        }
    }
    const updateProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json("Enter a valid ID")
            }
            const data = req.body;
            if (!data) {
                return res.status(400).json("No valid data")
            }
            const productId = parseInt(id)
            const product = await ProductService.UpdateProduct(productId, data);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json(error);
            console.log(error);
        }
    }
    const deleteProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json("Enter a valid ID")
            }
            const productId = parseInt(id)
            await ProductService.DeleteProduct(productId)
        } catch (error) {

        }
    }
    return {
        getProducts,
        createProduct,
        getProduct,
        updateProduct,
        deleteProduct
    }
}

export default ProductController();