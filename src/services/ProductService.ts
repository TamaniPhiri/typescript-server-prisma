import ProductRepository from "../repositories/ProductRepository";

const ProductService=()=>{
    const GetAllProducts=async()=>{
        const products=await ProductRepository.getAllProducts();
        return products
    }
}

export default ProductService;