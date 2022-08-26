const express = require('express');
const { newOrder, getAllOrders, getSingleOrder, orderDelete, orderUpdate, myOrder, discountPromoCode } = require('../controler/orderControler');
const router = express.Router()


router.post("/new/:id" , newOrder)
router.get("/" , getAllOrders)
router.get("/:id" , getSingleOrder)
router.delete("/:id" , orderDelete)
router.put("/:id" , orderUpdate)
router.get("/myOrder/:id" , myOrder)
router.post("/promo" , discountPromoCode)


module.exports = router