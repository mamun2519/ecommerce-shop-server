const Order = require("../modal/orderModal");
const Product = require("../modal/productModal");
const stripe = require("stripe")(
  "sk_test_51L1nmNCGpaTt0RU81oq26j6Ta7gwb9pGlOOwxjeXAQgefsXMvmRxFUopKE2St6GDbDpxjUug0KxRyqzL6oKarPcR00lqLjh70r"
);
exports.newOrder = async (req, res, next) => {
  const d = new Date(); 
		const jastDate = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear(); 
		
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    subTotalPrice,
    discount,
    shippingPrice,
    totalPrice,
  } = req.body;
  console.log(req.body);
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    subTotalPrice,
    shippingPrice,
    totalPrice,
    discount,
    paidAt: jastDate ,
    user: req.params.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
};

exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");
  res.status(200).json({
    success: true,
    orders,
  });
};

exports.getSingleOrder = async (req, res, next) => {
  const id = req.params.id;
  console.log(typeof id);
  const order = await Order.findById(id).populate("user", "name email");
  if (!order) {
    res.status(404).json({
      success: false,
      message: "Order Not found!",
    });
  }
  res.status(200).json({
    success: true,
    order,
  });
};

exports.orderDelete = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404).json({
      success: false,
      message: "Order Not found!",
    });
  }

  order.remove();
  res.status(200).json({
    success: true,
    message: "Order Delete Successfull",
  });
};

exports.orderUpdate = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404).json({
      success: false,
      message: "Order Not found!",
    });
  }

  if (order.orderStatus === "Delivered") {
    res.status(400).json({
      success: false,
      message: "You Have All Ready Delivered This Order.",
    });
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

exports.myOrder = async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.find({ user: id }).populate("user", "name email");
  if (!order) {
    res.status(404).json({
      success: false,
      message: "Order Not found!",
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
};

exports.discountPromoCode = async (req, res, next) => {
  const price = parseInt(req.query.totalCost);
  const promoCode = parseInt(req.query.code);
  const screctCode = [4000, 5000, 6000];
  const codeMatch = screctCode.includes(promoCode);
  if (codeMatch) {
    const discountPrice = parseInt((price / 100) * 20);
    const totalPrice = price - discountPrice;
    res.status(200).json({
      success: true,
      discountPrice,
      totalPrice,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Sorry We dont discount",
    });
  }
};

exports.paymentGetWay = async (req, res, next) => {
  const service = req.body;
  const price = service.price;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecrets: paymentIntent.client_secret,
  });
};
