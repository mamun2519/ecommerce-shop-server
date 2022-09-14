const express = require('express');
const { newOrder, getAllOrders, getSingleOrder, orderDelete, orderUpdate, myOrder, discountPromoCode, paymentGetWay } = require('../controler/orderControler');
const verifayToken = require('../utilits/verifayToken');
const router = express.Router()


router.post("/new/:id" , verifayToken , newOrder)
router.get("/" , verifayToken ,  getAllOrders)
router.get("/:id" , getSingleOrder)
router.delete("/:id" ,  orderDelete)
router.put("/:id" , orderUpdate)
router.get("/myOrder/:id", verifayToken , myOrder)
router.post("/promo" , discountPromoCode)
router.post("/create-payment-intent", verifayToken, paymentGetWay)


module.exports = router