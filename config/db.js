import mongoose from "mongoose";

const connectdb=async()=>{
    try{
       await mongoose.connect(process.env.DB_URI)
       console.log("successfully connected to db!")
    }
    catch(err){
        console.error(`error occured while connecting to db: ${err.message}`); 
        process.exit(1);
    }
}

export default connectdb;