import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

dotenv.config();


export const isAdmin=(req,res,next)=>{
    try {

        if(req.user.role!=="Admin")
        {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin"
            });
        }
    next();
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}

export const authenticateToken = (req, res, next) => {
    // Get token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = user; // Attach user data to the request
        next(); // Proceed to the next middleware or route handler
    });
};

