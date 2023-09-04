import { prisma } from "../config/client";

const ProductRepository = () => {
    const getAllProducts = async () => {
        return await prisma.products.findMany();
    }
    const getProductById = async (id: number) => {
        return await prisma.products.findUnique({
            where: {
                id
            }
        })
    }
    const createProduct = async (data: { sellerId: number, title: string, description: string, type: string }) => {
        return await prisma.products.create({
            data
        })
    }
    const updateProductById = async (id: number, data: { sellerId: number, title: string, description: string, type: string }) => {
        return await prisma.products.update({
            where: {
                id
            },
            data
        })
    }
    const deleteProductById=async(id:number)=>{
        return await prisma.products.delete({
            where:{
                id
            }
        })
    }
    return {
        getAllProducts,
        getProductById,
        createProduct,
        updateProductById,
        deleteProductById
    }
}

module.exports = ProductRepository();