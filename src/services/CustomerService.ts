import CustomerRepository from "../repositories/CustomerRepository";

const CustomerService = () => {
    const RegisterCustomer = async (data: { name: string, email: string, password: string }) => {
        const customer = await CustomerRepository.registerCustomer(data);
        return customer;
    }
    const LoginCustomer = async (email: string, password: string) => {
        const customer = await CustomerRepository.loginCustomer(email, password);
        return customer?.name, customer?.email, customer?.id;
    }
    const UpdateCustomer=async(id:number,data: { name: string, email: string, password: string })=>{
        const customer=await CustomerRepository.updateCustomer(id,data);
        return customer;
    }
    return {
        RegisterCustomer,
        LoginCustomer
    }
}

export default CustomerService();