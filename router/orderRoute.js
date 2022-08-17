const express = require('express');
const { newOrder, getAllOrders } = require('../controler/orderControler');
const router = express.Router()


router.post("/new/:id" , newOrder)
router.get("/" , getAllOrders)



module.exports = router