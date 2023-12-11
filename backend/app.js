import express from "express";
import cors from 'cors'
import morgan from "morgan";
import connectDB from "./config/connection.js";
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'
import chatRoute from './routes/chatRoute.js'
import { errorHandler } from "./middlewares/errorMiddleware.js";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { createServer } from 'http'; 
import socket from "./utils/socket.js";
import rateLimit from "express-rate-limit";
import requestIp from 'request-ip'



const PORT = process.env.PORT || 3000


const app = express();
const httpServer = createServer(app);

socket(httpServer)


app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
app.use(express.json());
app.use(errorHandler);
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(cookieParser());

app.use(requestIp.mw());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5, 
  standardHeaders: true, 
  legacyHeaders: false, 
  keyGenerator: (req, res) => {
    return req.clientIp; 
  },
  handler: (req, res, ___, options) => {
    res.status(429).json({msg : `There are too many requests. You are only allowed ${
      options.max
    } requests per ${options.windowMs / 60000} minutes`})
  },
});

app.use(['/login', '/admin/login'], limiter);
app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/chat', chatRoute)
app.get("/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY})
);

connectDB();

httpServer.listen(PORT,()=>{
    console.log('Listening to Port..'.bgGreen.bold);
})

export default app;