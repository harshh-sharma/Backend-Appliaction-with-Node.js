import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:{},
        authenticated:false
    },
    reducers:{
        addUser: (state,action) => {
            state.user = action.payload;
        },
        removeUser: (state,action) => {
            state.user = {};
        },
        userAuthenticated:(state,action) => {
            state.authenticated = action.payload
        }
    }
});

export const {addUser,removeUser,userAuthenticated} = userSlice.actions;
export default userSlice.reducer;