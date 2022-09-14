const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductDetels,
  addProductReview,
} = require("../controler/productControler");
const verifayToken = require("../utilits/verifayToken");
const router = express.Router();

router.post("/add", verifayToken, createProduct);
router.get("/get", verifayToken, getProduct);
router.get("/get/:id", getProductDetels);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.post("/review/:id", verifayToken, addProductReview);

module.exports = router;
