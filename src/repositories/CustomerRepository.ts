import { prisma } from "../config/client";
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../config/config";

const CustomerRepository = () => {
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
    return {
        updateCustomer,
        deleteCustomer,
    }
}

export default CustomerRepository();