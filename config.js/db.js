const mongoose = require('mongoose') 
require("dotenv").config()

//function to connect database
const connectdb = () => {
   mongoose.connect( process.env.dburl , { 

   })
   .then( () => console.log("database connection established"))
   .catch( () => console.log("error while connecting database"))
}

module.exports = connectdb 