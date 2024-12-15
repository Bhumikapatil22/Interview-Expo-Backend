import express from 'express';
import dbConnect from '../config/database.js'
import dotenv from 'dotenv';
import ExpoRoutes from '../routes/ExpoRoutes.js'
// In your server.js or app.js
import cors from 'cors';



dotenv.config();
const app=express();
const corsOptions = {
    origin: ['https://interview-expo.vercel.app'], // Frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies and credentials
  };
  
  app.use(cors(corsOptions));
  

dbConnect();

// Middleware for parsing JSON requests
app.use(express.json());

// Mount feedback routes
app.use("/api/v1",ExpoRoutes)//mounting

  
app.get("/",(req,res)=>{
    res.send("Interview Expo");
})

const PORT=process.env.PORT||4000;





app.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT}`);
})

