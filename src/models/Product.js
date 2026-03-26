const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  url_mercadolibre:String,
  section:String
});

module.exports = model("Product", ProductSchema);
