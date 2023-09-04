import { prisma } from "../config/client";

const ProductRepository=()=>{
    const getAllProducts=async()=>{
        return await prisma.products.findMany();
    }
    const getProductById=async(id:number)=>{
        return await prisma.products.findUnique({
            where:{
                id
            }
        })
    }
    return{
        getAllProducts,
        getProductById
    }
}

module.exports=ProductRepository();