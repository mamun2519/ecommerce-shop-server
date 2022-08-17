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
            //   user: req.user._id,
            user: req.params.id
          })

          res.status(200).json({
            success: true,
            order

          })

}