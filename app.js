const express = require('express');
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
// middelware 
app.use(cookieParser())
app.use(express.json())
app.use(cors())

// all router


// router hendeler 
const product = require('./router/productRouter.js')
const user = require('./router/userRouter')
app.use('/product' , product)
app.use("/user" , user)


app.use('/' , (req , res)=>{
      res.send("hellw world")
})


module.exports = app