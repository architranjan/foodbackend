const express = require('express');
const router = express.Router();

router.post('/' , (req,res)=>{
       
        try{
             res.send([global.item , global.category])
        }

        catch(error){
             res.status(400).send("error");
        }
})

module.exports = router