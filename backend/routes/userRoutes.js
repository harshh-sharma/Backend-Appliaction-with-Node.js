import { Router } from "express";
import { register,login,logout,getUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",logout);
userRouter.get("/user",getUser);

export default userRouter;