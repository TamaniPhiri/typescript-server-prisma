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
    return {
        GetAllProducts,
        GetProductById
    }
}

export default ProductService;