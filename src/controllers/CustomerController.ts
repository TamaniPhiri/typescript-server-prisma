import { Request, Response } from "express";
import CustomerService from "../services/CustomerService";
import CustomerRepository from "../repositories/CustomerRepository";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config";
import { prisma } from "../config/client";
import { log } from "console";

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
            console.log(error);
            res.status(400).json(error);
        }
    }
    const loginCustomer = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json("Enter valid credentials");
            }
            const customer = await prisma.customer.findUnique({
                where: {
                    email,
                    password
                }
            });
            if (!customer) {
                return res.status(400).json("User doesn't exist!");
            }
            const token = jwt.sign(customer, jwtSecret, { expiresIn: "72h" })
            res.status(200).json(customer)
            res.cookie("token", token, {
                httpOnly: true
            })
            console.log(token);
            
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
    return {
        registerCustomer,
        loginCustomer
    }
}

export default CustomerController();