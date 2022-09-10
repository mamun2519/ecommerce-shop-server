const app = require('./app')
const database = require('./database/database')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors({
      origin: "https://fashion-ecommerce-92924.web.app",
      methods: ["get" , "post"],
      credentials: true
     
      
}))
const port = process.env.PORT || 5000

// server configration 

database()
cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
// surver run 
app.listen(port , ()=>{
      console.log("server is run start" , port)
})

