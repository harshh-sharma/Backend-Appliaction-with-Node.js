import mongoose from "mongoose";

const connectToDB = async () => {
   try {
     const connection = await mongoose.connect(process.env.MONGO_URI,{
        dbName:"taskmanagementsystem"
     });
     if(connection){
         console.log(`Db connected successfully`);
     }
   } catch (error) {
    console.log("Db error",error.message);
   }
}

export default connectToDB;