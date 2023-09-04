import CustomerRepository from "../repositories/CustomerRepository";

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
    return {
        RegisterCustomer,
        LoginCustomer,
        UpdateCustomer,
        DeleteCustomer
    }
}

export default CustomerService();