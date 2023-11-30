const express = require('express')
const router = express.Router() ;

const register = require('../controller/registercontroller')
const login = require('../controller/logincontroller')
const {isstudent ,isadmin , auth} =require('../middleware/authorization')

router.post('/signup' , register)
router.post('/login' , login)


//dummy route for test 

router.get ('/dummy' , auth , (req ,res) => {
    res.status(200).json({
        sucess:true ,
        message: "dummy route for test"
    })
})


//protected route
router.get('/student' , auth , isstudent ,(req ,res)=> 
{
      res.status(200).json({
        sucess:true ,
        message: "welcome to protected route for student"
      })
} )
router.get('/admin' , auth ,isadmin , (req,res)=> {

    res.status(200).json({
        sucess:true ,
        message: "welcome to protected route for admin"
      })

})


module.exports = router