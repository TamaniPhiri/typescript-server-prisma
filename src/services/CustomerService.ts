import CustomerRepository from "../repositories/CustomerRepository";
import bcrypt from 'bcrypt';

const CustomerService = () => {
    const RegisterCustomer = async (data: { name: string, email: string, password: string }) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const customerData = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        };

        const customer = await CustomerRepository.registerCustomer(customerData);
        return {
            name: customer?.name,
            email: customer?.email,
            id: customer?.id
        };
    }
    const LoginCustomer = async (email: string, password: string) => {
        const customer = await CustomerRepository.loginCustomer(email, password);
        if (!customer) {
            return null;
        }
        const passwordMatch = await bcrypt.compare(password, customer.password);
        if (!passwordMatch) {
            return null;
        }
        const token = CustomerRepository.generateToken(customer.id);
        return {
            name: customer?.name,
            email: customer?.email,
            id: customer?.id,
            token
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