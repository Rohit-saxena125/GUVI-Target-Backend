const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
require("./db/conn");
app.post('/api',(req,res)=>{
    res.send('Hello World');
    });
app.get('/api',(req,res)=>{
    res.send('Hello World');
    });
// app.use(express.static('public'));

app.listen(port,()=>console.log(`Listening on port ${port}`));