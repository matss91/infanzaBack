require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

app.listen(4000, () => {
  console.log("Servidor corriendo en puerto 4000");
});