import { Request, Response } from "express";
import CustomerService from "../services/CustomerService";
import jwt from "jsonwebtoken";
import { prisma } from "../config/client";
import bcrypt from 'bcrypt';

const CustomerController = () => {
    const registerCustomer = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(200).json("Enter valid details")
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const customer = await prisma.customer.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });
            res.status(200).json({ message: "User successfully created"});
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
            const passwordMatch = await bcrypt.compare(password, customer.password);
            if (!passwordMatch) {
                return null;
            }
            const token = jwt.sign(customer, "a765s76g!@#$%7sa8f7sct", { expiresIn: "72h" })
            res.cookie("token", token, {
                httpOnly: true
            })
            res.status(200).json("Login successful")
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