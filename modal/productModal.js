const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, "Please Enter product Name"],
            trim: true,
          },
          description: {
            type: String,
            required: [true, "Please Enter product Description"],
          },
          price: {
            type: Number,
            required: [true, "Please Enter product Price"],
            maxLength: [8, "Price cannot exceed 8 characters"],
          },
          ratings: {
            type: Number,
            default: 0,
          },
          images: [
            {
              public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
            },
          ],
          category: {
            type: String,
            required: [true, "Please Enter Product Category"],
          },
          Stock: {
            type: Number,
            required: [true, "Please Enter product Stock"],
            maxLength: [4, "Stock cannot exceed 4 characters"],
            default: 1,
          },
          numOfReviews: {
            type: Number,
            default: 0,
          },
          brand: {
            type: String,
            required: true,
          },
          reviews: [
            {
              user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
              rating: {
                type: Number,
                required: true,
              },
              comment: {
                type: String,
                required: true,
              },
              name: {
                type: String,
                required: true,
              },
              profileUrl: {
                type: String,
                required: true,
              },
              time: {
                type: String,
                required: true,
              },
            },
          ],
          // product ta je uplode korse ta callet korar jonno
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
})


const productModal = new mongoose.model("Proudcts" , productShema)

module.exports = productModal