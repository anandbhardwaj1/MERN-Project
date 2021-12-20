const express =require("express");
const mongoose =require("mongoose");
require('dotenv').config()
const port=process.env.PORT||3001;
const DB= process.env.MONGODB_URI;
const app=express();
app.use(express.json());
var cors = require('cors')
const User=require("./models/userSchema");

app.options('*', cors())  
app.use(cors())
app.use(require("./routes/Auth"));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();

  });

mongoose.connect(DB,{useNewUrlParser:true,
   
    useUnifiedTopology:true
}).then(()=>
{
    console.log("Connected to Db");
}).catch((err)=>
{
    console.log(err);
})

if(process.env.NODE_ENV==='production')
{
    app.use(express.static("Frontend/build"));
}



app.listen(port, function() {
    console.log('Server running at'+ ':' + port );
  });
