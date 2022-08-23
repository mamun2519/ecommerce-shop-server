const Product = require("../modal/productModal.js");
const apiFetures = require("../utilits/apiFetures.js");

exports.createProduct = async (req, res, next) => {
  const products = req.body;
  const sendProudcts = await Product.create(products);
  res.status(200).json({
    message: "Product Added SuccessFull",
    product: sendProudcts,
  });
};

exports.getProduct = async (req, res, next) => {
  const parPageDataShow = 9;

  // search and filter funcanolity
  const searchAndPagination = new apiFetures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(parPageDataShow);
  const products = await searchAndPagination.query;
  res.json({
    success: true,
    products,
  });
};

exports.updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "product Not fount",
    });
  }

  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product Not found",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfull",
  });
};

exports.getProductDetels = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json({
    success: true,
    product,
  });
};
