import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/taskSlice";

const appStore = configureStore({
    reducer:{
        user:userReducer,
        task:taskReducer
    }
});

export default appStore;