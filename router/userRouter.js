const express = require("express");
const {
  getAllUser,
  getUserDetiles,
  createUser,
  updateUserProfile,
  deleteUser,
  createAdmin,
  cheackAdmin,
  getAllAdmin,
} = require("../controler/userControler");
const verifayToken = require("../utilits/verifayToken");
const router = express.Router();

router.get("/all", verifayToken, getAllUser);
router.get("/single/:id", getUserDetiles);
router.post("/create", createUser);
router.put("/update/:id", updateUserProfile);
router.delete("/delete/:id", deleteUser);
router.put("/admin/:email", verifayToken, createAdmin);
router.get("/allAdmin",  getAllAdmin);
router.get("/chackAdmin/:email", verifayToken, cheackAdmin);

module.exports = router;
