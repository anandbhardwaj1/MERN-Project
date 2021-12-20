const express= require("express");
const router=express.Router();
const User=require("../models/userSchema");

router.post('/signin', (req, res) => {
    
    const {email,password}=req.body;
    if(!email||!password)
    {
        return res.status(422).json({error:"All fields are required!"});
    }
    User.findOne({email:email})
    .then((userexist)=>{
        if(userexist.password===password)
         res.send(userexist);
      else
      return res.status(422).json({message:"invalid credentials!"});
     
    }).catch((err)=>{
       return res.status(422).json({message:"invalid credentials!"});
      
    })
}
);

router.post('/update',async (req, res) => {
    
    const {email,age,phone}=req.body;
    
 const user=await   User.findOneAndUpdate(email,{age,phone},{
        new:true
    })
    if(user)
    res.status(200).json({message:"success"});
    });





router.post('/register', (req, res) => {
    
    const {name,email,password}=req.body;
    if(!name||!email||!password)
    {
        return res.status(422).json({error:"All fields are required!"});
    }
    User.findOne({email:email})
    .then((userexist)=>{
        if(userexist)
        return res.status(422).json({error:"Email Already Registered"});
      const user=new User({name:name,email:email,password:password});
      user.save().then(()=>{
          res.status(201).json({message:"User created successfully!"})
      }
      ).catch(err =>{
          console.log(err);
      })
     
    }).catch((err)=>{
        console.log(err);
    })
}
);


module.exports=router;