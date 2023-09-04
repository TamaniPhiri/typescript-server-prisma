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
    return{
        getProducts
    }
}

export default ProductController();