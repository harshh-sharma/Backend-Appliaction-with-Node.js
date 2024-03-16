import { Router } from "express";
import { register,login,logout,getUser } from "../controller/userController.js";
import isAuthenticated from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",isAuthenticated,logout);
userRouter.get("/me",isAuthenticated,getUser);

export default userRouter;