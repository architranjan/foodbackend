const express = require('express');
const router = express.Router();
const Order = require('../models/Ordes')

router.post('/' , async(req,res)=>{
    try{
        let myData = await Order.findOne({'email' : req.body.email})
        res.json({orderData : myData})
    }

    catch(error){
        res.send("server Error")
    }
})

module.exports = router