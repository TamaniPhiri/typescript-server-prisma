import { prisma } from "../config/client";
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../config/config";

const CustomerRepository = () => {
    const registerCustomer = async (data: { name: string, email: string, password: string }) => {
        return await prisma.customer.create({
            data
        })
    }
    const loginCustomer = async (email: string, password: string) => {
        return await prisma.customer.findUnique({
            where: {
                email,
                password
            }
        })
    }
    const updateCustomer = async (id: number, data: { name: string, email: string, password: string }) => {
        return await prisma.customer.update({
            where: {
                id
            },
            data
        })
    }
    const deleteCustomer = async (id: number) => {
        return await prisma.customer.delete({
            where: {
                id
            }
        })
    }
    const generateToken = (customerId: number) => {
        const secretKey = jwtSecret;
        const token = jwt.sign({ customerId }, secretKey, { expiresIn: '720h' });
        return token;
    };
    return {
        registerCustomer,
        loginCustomer,
        updateCustomer,
        deleteCustomer,
        generateToken
    }
}

export default CustomerRepository();