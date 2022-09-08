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
  }
});
const userSchema1 = new mongooose.Schema({
    id:{
        type:Number,
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
const User1 = new mongooose.model("USER1", userSchema1);
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
    const {age,dob,gender,phone} = req.body;
    User1.findOne({id:id},(err,user)=>{
        if(err){
            res.send(err);
        }
        if(user)
        {
            res.send({message:"User Already Exists"});
        }
        else
        {
            const user = new User1({
               id,
               age,
                dob,
                gender,
                phone
            });
            
            user.save().then(()=>{
                res.send({message:"Details Added"});
            }
            ).catch((err)=>{
                res.send(err);
            }
            );
        }
        id +=1;
    });
    
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});