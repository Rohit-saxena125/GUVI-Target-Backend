const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.connect("mongodb://localhost:27017/Details",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
).then(()=>{
    console.log("connection successful");
}).catch(()=>{
    console.log("No connection");
})