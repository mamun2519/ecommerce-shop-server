const Order = require('../modal/orderModal')

exports.newOrder = async (req , res , next) =>{
      const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          } = req.body;
          const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.params.id
          })

          res.status(200).json({
            success: true,
            order

          })
}

exports.getAllOrders = async (req , res , next) =>{
  const orders = await Order.find()
  console.log(orders);

  res.status(200).json({
    success: true,
    orders

  })
}