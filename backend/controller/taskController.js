import { catchError } from "../middlewares/catchAsyncError.js";
import {Task} from "../models/task.model.js";

const createTask = catchError((req,res,next) => {});
const updateTask = catchError((req,res,next) => {});
const deleteTask = catchError((req,res,next) => {});
const getMyTask = catchError((req,res,next) => {});
const getSingleTask = catchError((req,res,next) => {});

export {
    createTask,
    updateTask,
    getMyTask,
    getSingleTask,
    deleteTask
}