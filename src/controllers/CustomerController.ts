import { Request, Response } from "express";
import CustomerService from "../services/CustomerService";

const CustomerController = () => {
    const registerCustomer = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(200).json("Enter valid details")
            }
            const customer = await CustomerService.RegisterCustomer(data);
            res.status(200).json({ message: "User successfully created", user: customer });
        } catch (error) {
            res.status(400).json(error);
        }
    }
    return{
        registerCustomer
    }
}

export default CustomerController();