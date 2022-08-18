const express = require('express');
const { newOrder, getAllOrders, getSingleOrder, orderDelete, orderUpdate } = require('../controler/orderControler');
const router = express.Router()


router.post("/new/:id" , newOrder)
router.get("/" , getAllOrders)
router.get("/:id" , getSingleOrder)
router.delete("/:id" , orderDelete)
router.put("/:id" , orderUpdate)



module.exports = router