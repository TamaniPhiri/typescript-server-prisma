import ProductRepository from "../repositories/ProductRepository";

const ProductService = () => {
    const GetAllProducts = async () => {
        const products = await ProductRepository.getAllProducts();
        if (products.length <= 0) {
            throw new Error("No products found");
        }
        return products;
    }
    const GetProductById = async (id: number) => {
        const product = await ProductRepository.getProductById(id);
        if (!product) {
            throw new Error("No product found");
        }
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
        GetProductById
    }
}

export default ProductService;