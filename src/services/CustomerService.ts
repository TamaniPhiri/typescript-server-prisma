import CustomerRepository from "../repositories/CustomerRepository";

const CustomerService = () => {

    const UpdateCustomer = async (id: number, data: { name: string, email: string, password: string }) => {
        const customer = await CustomerRepository.updateCustomer(id, data);
        return customer;
    }
    const DeleteCustomer = async (id: number) => {
        await CustomerRepository.deleteCustomer(id);
    }
    return {
        UpdateCustomer,
        DeleteCustomer
    }
}

export default CustomerService();