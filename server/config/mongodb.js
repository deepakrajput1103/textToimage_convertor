import mongoose from "mongoose"

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Database Connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}

// const connectDB = async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
//         console.log("Database Connected");
//     } catch (error) {
//         console.error("Database connection failed:", error.message);
//         process.exit(1); // Exit with failure
//     }
// };

export default connectDB;