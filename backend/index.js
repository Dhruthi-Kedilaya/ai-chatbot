import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDb.js';
import bodyParser from 'body-parser';
import messageRoutes from './routes/message.js';
import cors from 'cors';

const app=express();
dotenv.config();
const port=3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use("/api", messageRoutes);

app.listen(port,()=>{
  console.log(`Server is listening on port ${port}`);
  connectDB();
});
