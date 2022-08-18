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
  res.status(200).json({
    success: true,
    orders

  })
}

exports.getSingleOrder = async (req , res , next) =>{
  const id = req.params.id
  console.log(typeof id);
  const order = await Order.findById(id).populate("user" ,  "name email")
  if(!order){
    res.status(404).json({
      success: false,
      "message": "Order Not found!"
    });

  }
  res.status(200).json({
    success: true,
    order,
  });
}

exports.orderDelete = async (req , res , next) =>{
  const order = await Order.findById(req.params.id)
  if(!order){
    res.status(404).json({
      success: false,
      "message": "Order Not found!"
    });}

    order.remove()
    res.status(200).json({
      success: true,
      "message": "Order Delete Successfull"
    })
}

exports.orderUpdate = async (req , res, next) =>{
  
}