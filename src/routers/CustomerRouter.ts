import CustomerController from "../controllers/CustomerController";
import { Router } from "express";

const CustomerRouter=Router();
CustomerRouter.post('/login',CustomerController.loginCustomer);
CustomerRouter.post('/register',CustomerController.registerCustomer)
export default CustomerRouter;