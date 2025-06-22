import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import globalErrorHandler from "./controller/appError.controller";
import AppError from "./utils/appError";
import boardRouter from "./routes/board.routes";
import taskRouter from "./routes/task.routes";
import { initDb } from "./config/initDb";




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

// Body parser
app.use(express.json({
    limit: "10kb"
}));

// Routes
app.use("/dbInit", initDb);
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/tasks", taskRouter);

// unhandled route 
app.use(/.*/, (req, res, next) => {
    next(new AppError(`Can't find the ${req.originalUrl} on this server!`, 404))
})

// Global Error handler
app.use(globalErrorHandler);
export default app;