const express = require('express');
const router = express.Router();
const User = require('../models/User');

const {body , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/' , 
    
    [body('email').isEmail(),
    body('password' , 'min length should be 5').isLength({min:5})]
    
    
    ,async (req,res)=>{
         
        const err = validationResult(req);

        if(!err.isEmpty()){
            return res.status(400).json({err : err.array()})
        }

        const salt = await bcrypt.genSalt(10);
        let securepass = await bcrypt.hash(req.body.password , salt);
           
           try{
               await User.create({
                    name:req.body.name,
                    password:securepass,
                    email:req.body.email,
                    location:req.body.location
                })

                res.json({success:true});
           }

           catch(error){
                 console.log(error);
                 res.json({success:false});
           }
})

module.exports = router;