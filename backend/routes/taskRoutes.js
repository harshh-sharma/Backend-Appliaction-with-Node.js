import { Router } from "express";
import { createTask,updateTask,deleteTask,getMyTask,getSingleTask } from "../controller/taskController.js";

const taskRouter = Router();

taskRouter.post("/create",createTask);
taskRouter.delete("/delete/:id",deleteTask);
taskRouter.put("/update/:id",updateTask);
taskRouter.get("/myTask",getMyTask);
taskRouter.get("/single/:id",getSingleTask);

export default taskRouter;