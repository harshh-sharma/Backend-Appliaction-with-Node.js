import { catchError } from "../middlewares/catchAsyncError.js";
import {Task} from "../models/task.model.js";
import { User } from "../models/userSchema.model.js";

const createTask = catchError(async(req,res,next) => {
    const {title,description} = req.body;
    const createdBy = req.user._id;
    if(!title || !description){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        });
    }
    
    const task = await Task.create({title,description,createdBy});
    if(!task){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
    res.status(200).json({
        success:true,
        message:"Task created successfully",
        task
    })
});
const updateTask = catchError(async(req,res,next) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            success:false,
            message:"task id is required"
        });
    }
    
    const task = await Task.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    if(!task){
        return res.status(400).json({
            success:false,
            message:"Invalid task id"
        });
    }

    res.status(200).json({
        success:true,
        message:"Task successfully updated",
        task
    })
});
const deleteTask = catchError(async(req,res,next) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            success:false,
            message:"id is required to delete task"
        });
    }

    const task = await Task.findByIdAndDelete(id);
    if(!task){
        return res.status(400).json({
            success:false,
            message:"Invalid task id"
        });
    }

    res.status(200).json({
        success:true,
        message:"Task deleted successfully",
        task
    })
});
const getMyTask = catchError(async(req,res,next) => {
    const userId = req.user._id;
    if(!userId){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }

    const getAllTask = await Task.find({createdBy:userId});
    if(!getAllTask){
        return res.status(400).json({
            success:false,
            message:"There is no task"
        })
    }
    
    res.status(200).json({
        success:true,
        message:"successfully find all the task related to user",
        getAllTask
    })
});
const getSingleTask = catchError(async(req,res,next) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success:false,
            message:"Task id is required"
        });
    }

    const task = await Task.findById(id);
    if(!task){
        return res.status(400).json({
            success:false,
            message:"Invalid task id"
        });
    }

    res.status(200).json({
        success:true,
        message:"Task succesfully find",
        task
    })
});

export {
    createTask,
    updateTask,
    getMyTask,
    getSingleTask,
    deleteTask
}