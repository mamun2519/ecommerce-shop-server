const User = require("../modal/userModal");
const sendToken = require("../utilits/sendJWToken");
const cloudinary = require('cloudinary')
exports.getAllUser = async (req, res, next) => {
  const user = await User.find({});
  res.status(200).json({
    success: true,
    user,
  });
};

exports.getUserDetiles = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
};

exports.createUser = async (req, res, next) => {
  
  
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
};

exports.updateUserProfile = async (req, res, next) => {
  const id = req.params.id;
  const updateUser = {
    name: req.body.name,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(id);
    const imageId = user.avatar.public_id;

    //      await cloudinary.v2.uploader.destroy(imageId);

    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //       folder: "avatars",
    //       width: 150,
    //       crop: "scale",
    //     });

    //     updateUser.avatar = {
    //       public_id: myCloud.public_id ,
    //       url: myCloud.secure_url
    //     };
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
};

exports.deleteUser = async (req, res, next) => {
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
};

exports.createAdmin = async (req, res, next) => {
  const email = req.params.email;

  const adminRequester = req.decoded.email;

  const requestAdmin = await User.findOne({ email: adminRequester });
  if (requestAdmin.role == "admin") {
    const roleAction = req.query.roleAction;
    if (roleAction == "admin") {
      console.log();
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
};

exports.cheackAdmin = async (req, res, next) => {
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
};
