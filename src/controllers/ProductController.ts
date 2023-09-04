import ProductService from "../services/ProductService";
import { Request, Response } from 'express';

const ProductController=()=>{
    const getProducts=async(req:Request,res:Response)=>{
        try {
            const products=await ProductService.GetAllProducts();
            if(!products){
                return res.status(400).json("No products found")
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json(error)
            console.log(error)
        }
    }
    const getProduct=async(req:Request,res:Response)=>{
        try {
            const {id}=req.params;
            const product =await ProductService.GetProductById(id);
        } catch (error) {
            
        }
    }
    const createProduct=async(req:Request,res:Response)=>{
        const data=req.body;
        if(!data){
            return res.status(400).json("No valid data")
        }
        const product=await ProductService.CreateProduct(data);
        res.status(200).json(product);
    }
    return{
        getProducts,
        createProduct,

    }
}

export default ProductController();