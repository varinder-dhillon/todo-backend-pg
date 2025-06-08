import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app = express();

// Global middleware

// Security headers
app.use(helmet());
// Request logs
if(process.env.NODE_ENV === 'development') app.use(morgan("dev"))

// Request rate limitter
const limitter = rateLimit({
    windowMs: 1000*60*10,
    limit: 100,
    message: "Too many requests from this IP, Please try again in 10 Minutes!"
})
app.use("/api", limitter);

// Routes


// Global Error handler

export default app;