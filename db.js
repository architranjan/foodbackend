require('dotenv').config();
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL
const connectDb = async ()=>{
    try{
       await mongoose.connect(mongoURL);
        console.log('connected');
        let fetchdata =  mongoose.connection.db.collection("item");
        let data =  await fetchdata.find({}).toArray()

        let fetchdata2 =  mongoose.connection.db.collection("category");
        let category = await fetchdata2.find({}).toArray()
      

        global.item = data;
        global.category = category
    
    }

    catch(error){
        console.log(error);
    }
               
  
};

module.exports = connectDb