import bodyParser from "body-parser";
import express from "express";
import ProductRouter from "./src/routers/ProductRouter";

const app = express();

app.use(bodyParser.json());
app.use('/products',ProductRouter);


const port = process.env.PORT||8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});