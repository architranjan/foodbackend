const express = require('express');
const router = express.Router();
const User = require('../models/User');
require('dotenv').config()

const {body , validationResult} = require('express-validator')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtsecret = process.env.SECRECT_KEY

router.post('/' , 
    

    [body('email').isEmail(),
        body('password' , 'min length should be 5').isLength({min:5})]
        



,async (req,res)=>{

             
    const err = validationResult(req);

    if(!err.isEmpty()){
        return res.status(400).json({err : err.array()})
    }
     
    let email = req.body.email
         
           try{
               let userdata = await User.findOne({email});

               if(!userdata){
                 return res.status(400).json({error : " Try different email"})
               }

               const pwdCompare = await bcrypt.compare(req.body.password , userdata.password)

               if(!pwdCompare){
                return res.status(400).json({error : " Try different password"})
               }
               const data = {
                   user:{
                     id:userdata.id
                   }
               }

               const authToken = jwt.sign(data , jwtsecret)
               return res.json({success:true , authToken:authToken});
               
           }

           catch(error){
                 console.log(error);
                 res.json({success:false});
           }
})

module.exports = router;