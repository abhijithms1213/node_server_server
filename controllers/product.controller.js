const productSchema = require("../models/product.model.js");

const createProduct = async (req, res) => {
  try {
    const product = await productSchema.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const findAllProducts = async (req, res) => {
  try {
    const product = await productSchema.find({});
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const ProductfindByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const UpdateSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const updatedProduct = await productSchema.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const DeleteSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "not found" });
    }

    res.json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createProduct,
  ProductfindByID,
  UpdateSingleProduct,
  DeleteSingleProduct,
  findAllProducts,
};
