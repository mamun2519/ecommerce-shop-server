const User = require("../modal/userModal");
const sendToken = require("../utilits/sendJWToken");
const cloudinary = require('cloudinary')
const userFetureApi = require("../utilits/userFetureApi");
const AdminFetureApi = require("../utilits/adminFetureApi");
exports.getAllUser = async (req, res, next) => {
  try{
    const parPageDataShow = 9;
  const searchAndPagination = new userFetureApi(User.find(), req.query)
  .search()
  .filter()
  .pagination(parPageDataShow);

  const user = await await searchAndPagination.query;
  res.status(200).json({
    success: true,
    user,
  });
  }
  catch(error){
    console.log(error);
  }
  
};

exports.getAllAdmin = async (req , res , next)=>{
  try{
    const parPageDataShow = 9;
  const searchAndPagination = new  AdminFetureApi(User.find(), req.query)
  .search()
  .filter().pagination(parPageDataShow);

  const user =  await searchAndPagination.query;
  res.status(200).json({
    success: true,
    user,
  });
  }
  catch(error){
    console.log(error)
  }
  

}

exports.getUserDetiles = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });

  }
  catch(error){
    console.log(error);
  }
  
};

exports.createUser = async (req, res, next) => {

  try{
    const { name, email, avatar } = req.body;

    let user = await User.findOne({email});
  
    if (user) {
      sendToken(user, 200, res);
    } 
    else {
      // picture uplode with cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const cover = await cloudinary.v2.uploader.upload(req.body.cover, {
      folder: "cover",
      width: 150,
      crop: "scale",
    });
  //  cover picture uplode 
      const addeduser = await User.create({
        name,
        email,
        avatar: {
          public_id:  myCloud.public_id,
          url: myCloud.secure_url,
        },
        cover: {
          public_id:  cover.public_id,
          url: cover.secure_url,
        },
      });
      // console.log(addeduser)
  
      sendToken(addeduser, 200, res);
    }
  }
  catch(eror){
    console.log(eror)

  }
  
  
 
};

exports.updateUserProfile = async (req, res, next) => {
 
  try{
    const id = req.params.id;
    const updateUser = {
      username: req.body.username,
      jobtitle: req.body.jobtitle,
      bio: req.body.bio,
      profession: req.body.profession,
      alternativEmail: req.body.alternativEmail,
      univercity: req.body.univercity,
      birthday: req.body.birthday,
    };
   
    if (req.body.avatar !== "") {
      const user = await User.findById(id);
      const imageId = user.avatar.public_id;
  
           await cloudinary.v2.uploader.destroy(imageId);
  
          const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
  
          updateUser.avatar = {
            public_id: myCloud.public_id ,
            url: myCloud.secure_url
          };
    }
    if (req.body.cover !== "") {
      const user = await User.findById(id);
      const coverId = user.avatar.public_id;
  
           await cloudinary.v2.uploader.destroy(coverId);
  
          const myCloud = await cloudinary.v2.uploader.upload(req.body.cover, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
  
          updateUser.cover = {
            public_id: myCloud.public_id ,
            url: myCloud.secure_url
          };
    }
  
    const updated = await User.findByIdAndUpdate(id, updateUser, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      user: updated,
    });

  }
  catch(e){
    console.log(e);

  }
 
 
};

exports.deleteUser = async (req, res, next) => {
  try{
    
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(403).json({
      success: false,
      message: "user Not found",
    });
  }
  await user.remove();
  res.status(403).json({
    success: true,
    message: "User Delete SuccessFull",
  });
  }
  catch(error){
    console.log(error)
  }
};

exports.createAdmin = async (req, res, next) => {
  try{
    const email = req.params.email;
  const adminRequester = req.decoded.email;
  const requestAdmin = await User.findOne({ email: adminRequester });
  if (requestAdmin.role == "admin") {
    const roleAction = req.query.roleAction;
    if (roleAction == "admin") {
      const makeAdmin = await User.updateOne(
        { email },
        {
          $set: { role: "admin" },
        }
      );
      res.status(200).json({
        success: true,
        admin: makeAdmin,
      });
    } else if (roleAction === "user") {
      const makeUser = await User.updateOne(
        { email },
        {
          $set: { role: "user" },
        }
      );
      res.status(200).json({
        success: true,
        admin: makeUser,
      });
    }
  } else {
    res.status(403).send({ message: "forbiden Accescc" });
  }

  }
  catch(error){
    console.log(error);
  }
  
};

exports.cheackAdmin = async (req, res, next) => {
  try{
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const isAdmin = user.role === "admin";
      res.status(200).json({
        success: true,
        admin: isAdmin,
      });
    }
  }
  catch(error){
    console.log(error)
  }
 
};
