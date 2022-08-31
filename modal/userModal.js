const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userShema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minLength: [4, "Name should have more than 4 characters"],
          },
          email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
          },
          avatar: {
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
          role: {
            type: String,
            default: "user",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          username:{
            type: String,
            default: 'No Text'
          },
          jobtitle:{
            type: String,
            default: 'No Text'
          },
          bio:{
            type: String,
            default: 'No Text'
          },
          email:{
            type: String,
            default: 'No Text'
          },
          profession:{
            type: String,
            default: 'No Text'
          },
          birthday:{
            type: String,
            default: 'No Text'
          },
          cover:{
            public_id: {
              type: String,
              default: 'No Text'
            },
            url: {
              type: String,
              default: 'No Text'
            },
          },
          
})

userShema.methods.getJWTtoken = function (){
  return jwt.sign({ email: this.email }, process.env.SCRECT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

const userModel = new mongoose.model('User' , userShema)


module.exports = userModel