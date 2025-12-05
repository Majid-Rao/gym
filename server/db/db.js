import mongoose from "mongoose";
import 'dotenv/config.js'
const connectdb = async () =>{
    try {
       const connectionIns = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`mongodb connected!,${connectionIns.connection.host}`);

    } catch (error) {
        console.log("mongodb error",error);
        
    }
}
export default connectdb;