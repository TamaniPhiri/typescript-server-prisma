import CustomerController from "../controllers/CustomerController";
import { Router } from "express";

const CustomerRouter = Router();
CustomerRouter.post('/login', CustomerController.loginCustomer);
CustomerRouter.post('/register', CustomerController.registerCustomer);
CustomerRouter.put('/update/:id', CustomerController.updateCustomer);
CustomerRouter.delete('/delete/:id', CustomerController.deleteCustomerById);
CustomerRouter.get('/logout',CustomerController.logoutCustomer);
export default CustomerRouter;