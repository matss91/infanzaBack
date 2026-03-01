const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");

// 🌍 Público - ver productos
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔐 Admin - crear producto
router.post("/",auth, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// ✏️ Admin - editar
router.put("/:id",auth, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// ❌ Admin - eliminar
router.delete("/:id",auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Producto eliminado" });
});
// GET producto por ID
router.get('/:id', async(req, res) => {

const producto = await Product.findById(req.params.id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  res.json(producto);
});
module.exports = router;