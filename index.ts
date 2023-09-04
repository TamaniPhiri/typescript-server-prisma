const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());


const port = process.env.PORT||8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});