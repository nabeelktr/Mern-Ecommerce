import express from "express";
import cors from 'cors'
import connectDB from "./config/connection";
import userRouter from './routes/userRoute'

connectDB()
const PORT = process.env.PORT || 3000

app.use('/',userRouter)

const app = express();
app.use(cors())
app.use(express.json())

app.listen(PORT,()=>{
    console.log('Listening to Port..'.bgGreen.bold);
})

export default app;