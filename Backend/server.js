const express =require("express");
const mongoose =require("mongoose");
require('dotenv').config()
const port=process.env.REACT_APP_PORT;
const DB= process.env.REACT_APP_URI;
const app=express();
app.use(express.json());
var cors = require('cors')
const User=require("./models/userSchema");

app.options('*', cors())  
app.use(cors())
app.use(require("./routes/Auth"));
mongoose.connect(DB,{useNewUrlParser:true,
   
    useUnifiedTopology:true
}).then(()=>
{
    console.log("Connected to Db");
}).catch((err)=>
{
    console.log(err);
})





app.listen(port, function() {
    console.log('Server running at'+ ':' + port );
  });