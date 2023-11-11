import express from "express";
import cors from 'cors'
import morgan from "morgan";
import connectDB from "./config/connection.js";
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'
import { errorHandler } from "./middlewares/errorMiddleware.js";
import 'dotenv/config'
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000


const app = express();
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

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.get("/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY})
);

connectDB()
app.listen(PORT,()=>{
    console.log('Listening to Port..'.bgGreen.bold);
})

export default app;