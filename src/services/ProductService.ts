import ProductRepository from "../repositories/ProductRepository";

const ProductService = () => {
    const GetAllProducts = async () => {
        const products = await ProductRepository.getAllProducts();
        return products;
    }
    const GetProductById = async (id: number) => {
        const product = await ProductRepository.getProductById(id);
        return product;
    }
    const CreateProduct=async(data:{ sellerId: number, title: string, description: string, type: string })=>{
        const product=await ProductRepository.createProduct(data);
        return product;
    }
    const UpdateProduct=async(id:number,data:{ sellerId: number, title: string, description: string, type: string })=>{
        const updatedProduct=await ProductRepository.updateProductById(id,data)
        return updatedProduct;
    }
    const DeleteProduct=async(id:number)=>{
        await ProductRepository.deleteProductById(id);
    }
    return {
        GetAllProducts,
        GetProductById,
        CreateProduct,
        UpdateProduct,
        DeleteProduct
    }
}

export default ProductService();