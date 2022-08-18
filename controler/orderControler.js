const Order = require('../modal/orderModal')
const Product = require("../modal/productModal")
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
  const order = await Order.findById(req.params.id)
  if(!order){
    res.status(404).json({
      success: false,
      "message": "Order Not found!"
    });}

    if(order.orderStatus === "Delivered"){
      res.status(400).json({
        success: false,
        message: "You Have All Ready Delivered This Order."
      });}

      if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (o) => {
          await updateStock(o.product, o.quantity);
        });
        
      }
      order.orderStatus = req.body.status;

      if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()

      }
      await order.save({ validateBeforeSave: false })
      res.status(200).json({
        success: true,
      });

    }

    async function updateStock(id, quantity) {
      const product = await Product.findById(id);
    
      product.Stock -= quantity;
    
      await product.save({ validateBeforeSave: false });
    }
    



