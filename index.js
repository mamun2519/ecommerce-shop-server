const app = require('./app')
const database = require('./database/database')

require('dotenv').config()
const port = process.env.PORT || 5000

// server configration 

database()

// surver run 
app.listen(port , ()=>{
      console.log("server is run start" , port)
})

