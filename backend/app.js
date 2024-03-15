import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import {errorMiddleware} from "./middlewares/error.js"
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    crendentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}));

app.use(errorMiddleware);

// userRoutes
app.use("/api/v1/user",userRouter);

// taskRoutes
app.use("/api/v1/task",taskRouter);

export default app;