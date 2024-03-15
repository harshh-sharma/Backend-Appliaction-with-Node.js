import { catchError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/userSchema.model.js";
import cloudinary from "cloudinary";

const register = catchError(async(req,res,next) => {
    if(!req.files || !Object.keys(req.files) === 0){
        return next(new ErrorHandler("User avatar is required!!",400));
    }
    const {avatar} = req.files;
    const allowedFormats = ["image/png","image/jpeg","imgage/webp"];
    if(!allowedFormats.includes(avatar.mimetype)){
        return next(new ErrorHandler("Please,provide avatar in png,jpeg,webp formats",400));
    }

    const {name,email,phone,password} = req.body;
    if(!name || !email || !phone || !password){
        return next(new ErrorHandler("All fields are rqeuired",400))
    }

    const isUserExit = await User.findOne({email});
    if(isUserExit){
        return next(new ErrorHandler("user already exists",400));
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(avatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error ",cloudinaryResponse.error || "Unknown cloudinary error")
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        avatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    if(!user){
        next(new ErrorHandler("Something went wrong while registering user",500))
    }
    res.status(200).json({
        success:false,
        message:"User registered successfully",
        data:user
    })
});
const login = catchError(async(req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email and password are required",400));
    }
    
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Email and password is invaid",400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Email and password is invalid",400));
    }
    res.status(200).json({
        success:false,
        message:"user successfully login",
        data:user
    })
});
const logout = catchError((req,res,next) => {});
const getUser = catchError((req,res,next) => {});


export {
    register,
    login,
    logout,
    getUser
}