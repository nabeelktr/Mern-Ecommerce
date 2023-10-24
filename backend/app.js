import express from "express";
import cors from 'cors'
import morgan from "morgan";
import connectDB from "./config/connection.js";
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'
import { errorHandler } from "./middlewares/errorMiddleware.js";
import 'dotenv/config'

const PORT = process.env.PORT || 3000


const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.use('/',userRouter)
app.use('/admin',adminRouter)

connectDB()
app.listen(PORT,()=>{
    console.log('Listening to Port..'.bgGreen.bold);
})

export default app;