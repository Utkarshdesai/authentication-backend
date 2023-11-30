const user = require('../model/user')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
require("dotenv").config()

const login = async(req, res)=> {
  
   //fetch login details from request 
    const {email , password} = req.body ; 

    //check user fill all the details
    if( !email || !password) 
    {
        return res.status(200).json({
            sucess: true ,
            message:"please fill the login details carefully"
        })
    }
  
    // check user is exist or not
     const checkuser = await user.findOne({email}) 

     //if user is not register
     if(!checkuser)
     {
        return res.status(401).json({
            sucess: true ,
            message:"register first and then login"
        })
     }
 
     //create payload
     const payload = {
        email: checkuser.email ,
        id : checkuser._id, 
        role : checkuser.role ,
        
     }


     //validate password
     if( await bcrypt.compare(password , checkuser.password) )   
     {

        //create JWT token 
        const token = JWT.sign(payload, process.env.JWT_SECRET ,{expiresIn : "2h" ,})
        console.log(token)

         const options = {
             expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
             httpOnly:true,
         }

        checkuser.token = token ,
        checkuser.password = undefined 

        //send cookie in brower
         res.cookie("userCookie", token ,options ).status(200).json({
             success:true,
             token,
             checkuser,  
             message:'User Logged in successfully',
         });

        
    }
     

    else 
    {
        res.status(200).json({
            sucess: true ,
            message:"Password not match" ,
           
             
           
         })
    }

 
}

module.exports = login