import { catchError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/userSchema.model.js";
import cloudinary from "cloudinary";
import sendJwtToken from "../utlis/jwtToken.js";

const register = catchError(async(req,res,next) => {
    if(!req.files || !Object.keys(req.files) === 0){
        return res.status(400).json({
            success:false,
            message:"User avatar is required!!"
        })
    }
    const {avatar} = req.files;
    console.log(avatar);
    const allowedFormats = ["image/png","image/jpeg","imgage/webp"];
    if(!allowedFormats.includes(avatar.mimetype)){
        return res.status(400).json({
            success:false,
            message:"Please,provide avatar in png,jpeg,webp formats"
        })
    }

    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are rqeuired"
        })
    }

    const isUserExit = await User.findOne({email});
    if(isUserExit){
        return res.status(400).json({
            success:false,
            message:"user already exists"
        })
        
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(avatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error ",cloudinaryResponse.error || "Unknown cloudinary error")
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    if(!user){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while registering user"
        })
    }

    sendJwtToken("User registered successfully",200,user,res);
    // res.status(200).json({
    //     success:false,
    //     message:"User registered successfully",
    //     data:user
    // })
});
const login = catchError(async(req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email and password are required"
        })
    }
    
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Email and password is invaid"
        })
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return res.status(400).json({
            success:false,
            message:"Email and password is invaid"
        })
    }
    
    sendJwtToken("user successfully login",200,user,res);
    // res.status(200).json({
    //     success:false,
    //     message:"user successfully login",
    //     data:user
    // })
});
const logout = catchError((req,res,next) => {
    res.status(200).cookie("token","",{expires:new Date(Date.now()),
    httpOnly:true,}).json({
        success:true,
        message:"user successfully logged out"
    })
});
const getUser = catchError((req,res,next) => {
    const user = req.user;
    if(!user){
        return res.status(500).json({
            success:false,
            message:"server internal error"
        })
    }
    res.status(200).json({
        success:true,
        user
    });
});


export {
    register,
    login,
    logout,
    getUser
}