import { connectDB } from "./config/database";
import app from "./app";
import dotenv from "dotenv";

// global initialization
dotenv.config();

const PORT = process.env.PORT || 8000;

const pgClient =  connectDB().then(res => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`)
    })
    console.log("DB Connected Successfully! :)");
}).catch(err => {
    console.log("Error in DB Connection ->", err.message);
});

export default pgClient;