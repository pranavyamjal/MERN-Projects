import dotenv from "dotenv"
import connectDB from "./db/index.js"


// Load environment variables
dotenv.config({
    path: './env'
})


// Connect to MongoDB and start server
connectDB().then( ()=> {
    console.log("MongoDB connection successful");


    // Error handling for app

    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;
    })


    // Start server
    app.listen(process.env.PORT || 5000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.error("ERROR: MongoDB connection failed!", error);
    process.exit(1);
})