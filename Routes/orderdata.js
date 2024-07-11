const express = require('express');
const router = express.Router();
const Order = require('../models/Ordes')

router.post('/' , async(req,res)=>{
    let data = req.body.order_data

    
    await data.splice(0,0,{order_date:req.body.order_date})
    let email = await Order.findOne({'email': req.body.email})

    if(email===null){
        try{
          
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success : true})
            })
        }
        catch(error){
            console.log(error.message);
            res.send("server error");
        }
    }

    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data : data}}
            ).then(()=>{
                res.json({success:true})
            })
        }

        catch(error){
            res.send("server error");
        }
    }
})

module.exports = router;