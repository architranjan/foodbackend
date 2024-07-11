const express = require('express');
const app = express();
const connectDb = require('./db');
const cors = require('cors');

require('dotenv').config

const port = process.env.PORT || 5000;


// const corsOption = {
//     origin:"http://localhost:3000",
//     methods:"GET , POST , PUT , DELETE , PATCH",
//     credentials:true,
// };

app.use(cors());

connectDb();
app.use(express.json());

app.use('/api/createuser' , require('./Routes/createuser'));
app.use('/api/login' , require('./Routes/Login'));
app.use('/api/display' , require('./Routes/display'));
app.use('/api/orderdata' , require('./Routes/orderdata'))
app.use('/api/myorder' , require('./Routes/myorder'))

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port , ()=>{
    console.log('server running.....')
})
