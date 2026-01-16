require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
express.json()
app.use(cors());
app.use(express.json());          // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/register", require("./routes/auth.register"));
app.use("/api/products", require("./routes/product.routes"));

module.exports = app;
