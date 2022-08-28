const express = require('express');
const { newOrder, getAllOrders, getSingleOrder, orderDelete, orderUpdate, myOrder, discountPromoCode, paymentGetWay } = require('../controler/orderControler');
const router = express.Router()


router.post("/new/:id" , newOrder)
router.get("/" , getAllOrders)
router.get("/:id" , getSingleOrder)
router.delete("/:id" , orderDelete)
router.put("/:id" , orderUpdate)
router.get("/myOrder/:id" , myOrder)
router.post("/promo" , discountPromoCode)
router.post("/create-payment-intent" , paymentGetWay)


module.exports = router