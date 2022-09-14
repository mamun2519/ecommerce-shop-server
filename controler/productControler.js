const Product = require("../modal/productModal.js");
const apiFetures = require("../utilits/apiFetures.js");
const cloudinary = require('cloudinary')
exports.createProduct = async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
    folder: "products",
    width: 150,
    crop: "scale",
  });

  const {name ,  description , price , category , Stock , brand , user}= req.body;
  const sendProudcts = await Product.create({name ,  description , price , category , Stock , brand , user , images: {
    public_id:  myCloud.public_id,
    url: myCloud.secure_url,
  },});
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
  const product = await Product.findById(id).populate("user", "name email")
  res.json({
    success: true,
    product,
  });
};


exports.addProductReview = async (req , res , next) =>{

  try{
    const { rating, comment, user , profileUrl , time , name } = req.body;

    const review = {
      user: user,
      rating: Number(rating),
      comment,
      profileUrl,
      time,
      name
    };
    console.log(req.body);
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product) {
      res.status(500).json({
        success: false,
        message: "product Not fount",
      });
    }
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length;
    await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review Added successFull"
  });

  }
  catch(error){
    console.log(error)
  }
 
}