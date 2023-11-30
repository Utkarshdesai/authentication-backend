const mongoose = require('mongoose')

const userSchema = new mongoose.Schema (
    
    
    {
       username: 
       {
         type:String , 
         maxlength: 15,
         required:true
       },

       email : 
       {
          type:String ,
          required: true,
        
       },

        password : 
       {

        type : String,
        required :true ,
        
       },

       role :{
        type: String,
        required:true,
       },


       createdAT : 
       {
          type : Date ,
          required:true,
          default : Date.now()
       }  
    }

)

module.exports = mongoose.model ('user' ,userSchema)