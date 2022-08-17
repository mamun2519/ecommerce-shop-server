const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductDetels,
} = require("../controler/productControler");
const router = express.Router();

router.post("/add", createProduct);
router.get("/get", getProduct);
router.get("/get/:id", getProductDetels);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
