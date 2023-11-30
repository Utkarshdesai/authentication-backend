const express = require('express') ;
const app = express() 

//acess PORT from env file
require("dotenv").config()
const PORT = process.env.PORT || 4000

//cookie-parser middleware
const cookie = require('cookie-parser')
app.use(cookie())

//middleware to parse request body 
app.use(express.json()) 

//connect to database 
const connectdb = require('./config.js/db')
connectdb()

//mount the route 
const authroute = require('./route/auth');
const cookieParser = require('cookie-parser');
app.use('/home/v1' ,authroute)

//listen to the port
app.listen(PORT , ()=> {
    console.log(`server is started at ${PORT}`)
})

//default route 
app.get('/' ,(req,res) => {
    res.send("<h1> welcome to homepage </h1>")
})