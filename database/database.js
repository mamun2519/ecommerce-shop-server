const mongoose = require("mongoose");

const database = () => {
  const uri = `mongodb+srv://mamun:dYsxJN9aKyuPGLkX@mamun.rd1yf.mongodb.net/?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log("mongoose was cannect");
    })
    .catch((error) => {
      console.log("this is error", error);
    });
};
module.exports = database;
