const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongooose = require("mongoose");
const userSchema = new mongooose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String
  },
  phone: {
    type: Number,
  }
});
const User = new mongooose.model("USER", userSchema);
const port = process.env.PORT || 9000;
require("./db/conn");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.post('/login',(req,res,next)=>{
    const {email,password} = req.body;
    User.findOne({email:email},(err,user)=>{
        if(err){
            res.send(err);
        }
        if(user){
            if(user.password === password){
                res.send({message:"Login Successfull"});
            }
            else{
                res.send({message:"Invalid Password"});
            }
        }
        else{
            res.send({message:"Invalid Email"});
        }
    });

}
);
app.post("/signup",(req,res)=>{
    const {username,email,password,confirmpassword} = req.body;
    User.findOne({email:email},(err,user)=>{
        if(err){
            res.send(err);
        }
        if(user){
            res.send({message:"User Already Exists"});
        }
        else{
            const user = new User({
                username,
                email,
                password,
                confirmpassword
            });
            user.save().then(()=>{
                res.send({message:"User Created"});
                res.redirect('/login')
            }).catch((err)=>{
                res.send(err);
            });
       }
    });
});
app.post('/additionalDetails',(req,res)=>{
    const {email,age,dob,gender,phone} = req.body;
    User.findOne({email:email},(err,user)=>{
        if(err){
            res.send(err);
        }
        if(user){
            user.age = age;
            user.dob = dob;
            user.gender = gender;
            user.phone = phone;
            user.save().then(()=>{
                res.send({message:"Details Added"});
            }
            ).catch((err)=>{
                res.send(err);
            }
            );
        }
        else{
            res.send({message:"User Not Found"});
        }
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});