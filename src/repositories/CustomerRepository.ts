import { prisma } from "../config/client";

const CustomerRepository = () => {
    const registerCustomer = async (data: { name: string, email: string, password: string }) => {
        return await prisma.customer.create({
            data
        })
    }
    const loginCustomer = async (email: string, password: string) => {
        return await prisma.customer.findFirst({
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
    return {
        registerCustomer,
        loginCustomer,
        updateCustomer,
        deleteCustomer
    }
}

export default CustomerRepository();