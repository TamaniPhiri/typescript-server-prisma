import { prisma } from "../config/client";
import CustomerRepository from "../repositories/CustomerRepository";
import { generateRefreshToken } from "../utils/jwtUtils";

const CustomerService = () => {
    const RegisterCustomer = async (data: { name: string, email: string, password: string }) => {
        const customer = await CustomerRepository.registerCustomer(data);
        return {
            name: customer?.name,
            email: customer?.email,
            id: customer?.id
        };
    }
    const LoginCustomer = async (email: string, password: string) => {
        const customer = await CustomerRepository.loginCustomer(email, password);
        return {
            name: customer?.name,
            email: customer?.email,
            id: customer?.id
        };
    }
    const UpdateCustomer = async (id: number, data: { name: string, email: string, password: string }) => {
        const customer = await CustomerRepository.updateCustomer(id, data);
        return customer;
    }
    const DeleteCustomer = async (id: number) => {
        await CustomerRepository.deleteCustomer(id);
    }
    generateRefreshToken: async (customerId: number) => {
        try {
            const refreshToken = generateRefreshToken({ customerId });
            await prisma.refreshtoken.create({
                data: {
                    customerId,
                    token: refreshToken
                }
            })
            return refreshToken
        } catch (error) {
            throw new Error('Error generating refresh token');
            console.log(error);
        }
    }
    return {
        RegisterCustomer,
        LoginCustomer,
        UpdateCustomer,
        DeleteCustomer
    }
}

export default CustomerService();