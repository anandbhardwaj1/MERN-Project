const mongoose=require("mongoose");
const { stringify } = require("querystring");

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
         },
    email:{
        type:String,
        required:true,
        unique:true
            },
     password:{
         type:String,
         required:true
         },
         age:{
             type:Number,
             default:20
         },
         phone :{
             type:Number,
             default:123456789
         },
         gender:{
           type:String,
           enum:["male","female"],
           default:"male"
         }

})
const User=mongoose.model("USER",userSchema);

module.exports=User;