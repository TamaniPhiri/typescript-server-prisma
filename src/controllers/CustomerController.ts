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
                return res.status(400).json("Enter valid details")
            }
            const hashedPassword = await bcrypt.hashSync(password, 10);
            await prisma.customer.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });
            res.status(200).json({ message: "User successfully created" });
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

            // Find the customer by email
            const customer = await prisma.customer.findUnique({
                where: {
                    email,
                },
            });

            // Check if the customer exists
            if (!customer) {
                return res.status(400).json("User doesn't exist!");
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, customer.password);

            // Check if the password is incorrect
            if (!passwordMatch) {
                return res.status(400).json("Password incorrect");
            }

            // If everything is correct, generate a token and set a cookie
            const token = jwt.sign(customer, "a765s76g!@#$%7sa8f7sct", { expiresIn: "72h" });
            res.cookie("token", token, {
                httpOnly: true,
            });

            res.status(200).json("Login successful");
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    };
    const updateCustomer = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json("Enter valid ID!");
            }
            const customerId = parseInt(id)
            const data = req.body;
            if (!data) {
                return res.status(400).json("Enter valid data")
            }
            await CustomerService.UpdateCustomer(customerId, data);
            res.status(200).json("Update successful");
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
    const deleteCustomerById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json("Enter valid ID!");
            }
            const customerId = parseInt(id)
            await prisma.customer.delete({
                where: {
                    id: customerId
                }
            })
            return res.status(200).json("User deleted successfully")
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
    return {
        registerCustomer,
        loginCustomer,
        updateCustomer,
        deleteCustomerById
    }
}

export default CustomerController();