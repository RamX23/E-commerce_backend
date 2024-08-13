import path from 'path'
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import connctdb from './config/db.js'
import categoryRoutes from './routes/CategoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'
import cors from 'cors'
dotenv.config();
const Port=process.env.Port || 5000;

connctdb(); 


const app=express();
app.use(cors({
    origin: '*', // Replace with your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Adjust methods as needed
    allowedHeaders: ['Content-Type', 'Authorization'] // Adjust headers as needed
  }));
  
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use('/api/users',userRoutes);
app.use('/api/category',categoryRoutes)
app.use('/api/products',productRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/orders',orderRoutes)
app.use('/paypal',(req,res)=>{
    res.send({cliendId:process.env.PAYPAL_CLIENT_ID});
});

const __dirname=path.resolve();
app.use("/uploads",express.static(path.join(__dirname+"/uploads")));    



app.listen(Port, () => console.log(`Server is running on port: ${Port}`));