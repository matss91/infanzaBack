const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  section:String
});

module.exports = model("Product", ProductSchema);
