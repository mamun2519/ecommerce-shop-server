const express = require('express');
const { newOrder, getAllOrders, getSingleOrder, orderDelete } = require('../controler/orderControler');
const router = express.Router()


router.post("/new/:id" , newOrder)
router.get("/" , getAllOrders)
router.get("/:id" , getSingleOrder)
router.delete("/:id" , orderDelete)



module.exports = router