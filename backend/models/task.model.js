import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:["complete,incomplete"]
    },
    archived:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Task = mongoose.model("Task",taskSchema);