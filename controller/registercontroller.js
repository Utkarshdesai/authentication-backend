const bcrypt = require('bcryptjs')
const user = require('../model/user');

const registeruser = async (req, res) => 
{    
    //fetch user details from request 
    const {username ,email ,password, role} = req.body ;

    //check whether it is existed in database 
     const checkemail = await user.findOne({email})
     if(checkemail) 
     {
         return res.status(200).json({
            sucess:true,
            data:checkemail,
            message:"email is already exist"
        })
     }
                     
   // hashed password 
    let hashedpassword;
    try {
        hashedpassword = await bcrypt.hash( password , 10 )

        
    } catch (error) {
        return res.status(500).json( 
            {  
                status :false ,
                 data : 'internal server error'  ,
                 message : "unable to hashed password"
          }
       )  

    }
     
   // enter into database 
    const createuser = await user.create({username ,email , password:hashedpassword ,role}) 
    try {

        return res.status(200).json({
            sucess:true,
            data:createuser,
            message:"user is created and password is also hashed"
        })
   
        
     } catch (error) {
       return res.status(500).json( 
         {  
             status :false ,
              data : 'internal server error'  ,
              message : "unable to create entry in database"
       }
    )  
        
        
    }
        
}

module.exports = registeruser