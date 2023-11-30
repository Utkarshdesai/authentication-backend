const JWT = require('jsonwebtoken')
require('dotenv').config() 

const auth = (req ,res ,next ) => {

  
    //different ways to fetch token 
    // 1.cookies - secured way 
    // 2.body - not much secured
    // 3.header - this is most secure way 

    console.log('cookies' ,  req.cookies.ausCookie )
    console.log('body' , req.body.token)
    console.log('header ' , req.header("Authorization"))


    //acees token req body 
    const token =  req.cookies.userCookie 
                  || req.body.token 
                  ||  req.header("Authorization").replace("Bearer ", "");
        

   
    try {
        if(!token || token === undefined) {
            return res.status(401).json({
                sucess:false,
                message:"token missing"
            })
        }


   //decode the token to get desire properties
    try {
    const decode = JWT.verify(token, process.env.JWT_SECRET) 
    
    req.checkuser = decode ;
    console.log(decode)
      
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            sucess:false,
            message:"invalid token"
        })
        
    }

    next()

   
    } catch (error) {
      
       return res.status(401).json({
            sucess: false ,
            message:"Something went wrong, while verifying the token"
        })


    
    }
    
   
}

//check for student
const isstudent = (req,res,next)=>{
    try {
        if(req.checkuser.role !== "student")
        {
            return res.status(401).json({
                message:"this is protected route for student"
            })
        }

        next()

    } catch (error) {
       return res.status(500).json({
            message:"user role is not matching "
        })
    }
   

}

//check for admin
const isadmin = (req,res,next)=>
{
    try {

        if(req.checkuser.role !== "admin")
        {
           return res.status(200).json({
                message:"this is protected route for admin"
            })
        }  
        
        next()

        
    } catch (error) {
       return res.status(500).json({
            message:"user role is not matching"
        })  
    }
    
}

module.exports = {
    auth , isstudent , isadmin
}