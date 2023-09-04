import bodyParser from "body-parser";
import express from "express";
import ProductRouter from "./src/routers/ProductRouter";
import CustomerRouter from "./src/routers/CustomerRouter";
import cookieParser from 'cookie-parser'

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/products',ProductRouter);
app.use('/customer',CustomerRouter);


const port = process.env.PORT||8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});