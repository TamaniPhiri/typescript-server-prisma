import { prisma } from "../config/client";

const CustomerRepository = () => {
    const registerCustomer = async (data: { name: string, email: string, password: string }) => {
        return await prisma.customer.create({
            data
        })
    }
    const loginCustomer = async (email: string,password:string) => {
        return await prisma.customer.findFirst({
            where: {
                email,
                password
            }
        })
    }
    return {
        registerCustomer,
        loginCustomer
    }
}

export default CustomerRepository();