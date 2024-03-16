import { User } from "../models/userSchema.model.js";
import { catchError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

const isAuthenticated = catchError(async(req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        res.status(400).json({
            success:false,
            message:"user are not authenticated"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded._id);
    next();
})

export default isAuthenticated;