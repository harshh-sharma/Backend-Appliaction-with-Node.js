import { Router } from "express";
import { createTask,updateTask,deleteTask,getMyTask,getSingleTask } from "../controller/taskController.js";
import isAuthenticated from "../middlewares/authenticate.js"

const taskRouter = Router();

taskRouter.post("/create",isAuthenticated,createTask);
taskRouter.delete("/delete/:id",isAuthenticated,deleteTask);
taskRouter.put("/update/:id",isAuthenticated,updateTask);
taskRouter.get("/myTask",isAuthenticated,getMyTask);
taskRouter.get("/single/:id",isAuthenticated,getSingleTask);

export default taskRouter;