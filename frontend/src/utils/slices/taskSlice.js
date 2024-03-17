import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name:"task",
    initialState:{
        task:[],
    },
    reducers:{
        addTask: (state,action) => {
            state.task.push = action.payload;
        },
        deleteTaskById: (state,action) => {
            state.task.pop();
        }
    }
});

export const {addTask,deleteTaskById} = taskSlice.actions;
export default taskSlice.reducer;