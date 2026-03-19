import mongoose from "mongoose"


export const connectDB = async()=>{
    try {

        await mongoose.connect(process.env.MONGO_URI);
        //we name the database by writing the name just before the question mark in the link, like notes_db here
        //but if we put the string like this only it is not dsecure anyone can see the id and password, to my daatabase, hence we use a .env file
        console.log("MONGODB CONNECTED");
    } catch (error) {
        console.log("Error connecting to MONGODB", error);
        process.exit(1); //1 means exit with failiure 
        
    }
};