const express = require('express');
const { newOrder } = require('../controler/orderControler');
const router = express.Router()


router.post("/new" , newOrder)



module.exports = router