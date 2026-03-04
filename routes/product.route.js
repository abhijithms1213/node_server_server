const express = require("express");
const router = express.Router();
const {
  findAllProducts,
  ProductfindByID,
  createProduct,
  UpdateSingleProduct,
  DeleteSingleProduct,
} = require("../controllers/product.controller.js");

// post api
router.post("/", createProduct);

// get api
router.get("/", findAllProducts);
router.get("/:id", ProductfindByID);

// update api
router.put("/:id", UpdateSingleProduct);

// delete api
router.delete("/:id", DeleteSingleProduct);

module.exports = router;