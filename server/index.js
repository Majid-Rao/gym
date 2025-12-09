import express from 'express'
import 'dotenv/config.js'
import connectdb from './db/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import chatbotRoutes from './routes/chatbotRoutes.js'

import multer from 'multer';
const app = express();
const port = process.env.PORT || 3000;
connectdb()
.then(()=>{
    app.listen(port,()=>{
        console.log("Server is run at:",port);
    })
})
.catch((err)=>{
console.log("mongo making error :",err);
})
app.use(cors(
    {
  origin: process.env.CLIENT_URL,
  credentials: true,
    }
))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded());
app.use(express.static("./uploads"));
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("hello");
})
//routes
app.use('/api/auth', authRouter);
app.use('/api', aiRoutes);
app.use('/api', chatbotRoutes);
