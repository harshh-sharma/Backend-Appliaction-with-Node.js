import { Schema } from "mongoose";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[5,"Name contains atleast 5 character"],
        maxLength:[30,"Name contains only 30 character"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is already registered"],
        validator:[validator.isEmail,"Invalid email,Please provide valid email"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide phone number"]
    },
    password:{
        type:String,
        minLength:[8,"Password contain atleast 8 character"],
        maxLength:[16,"Password not contain more then 16 character"],
        select:false
    },
    avatar:{
        public_id: {
            type:String,
            required:true
        },
        url: {
            type:String,
            required:true
        },
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

});

userSchema.pre("save",async function (){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWTToken = async function(){
    return jwt.sign(
        {_id:this._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:process.env.JWT_EXPIRES}
    )
}

export const User = mongoose.model("User",userSchema);