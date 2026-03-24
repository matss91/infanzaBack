require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mpRoutes=require("./routes/mercadopagocontrollers")
const app = express();
express.json()
app.use(cors());
app.use(express.json());          // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/products", require("./routes/product.routes"));

app.use('/mp', mpRoutes);

module.exports = app;
