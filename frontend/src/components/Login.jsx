import React, { useState } from 'react';
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, userAuthenticated } from '../utils/slices/userSlice';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();


  const submitHandler = async(e) => {
    e.preventDefault();
      try {
        const {data} = await axios.post("http://localhost:3000/api/v1/user/login",{email,password},{
          headers:{"content-Type":"application/json"}
        });
        dispatch(userAuthenticated(true));
        dispatch(addUser(data));
        toast.success(data.message);
      } catch (error) {
        console.log("Login error",error);
        toast.error(error.response.data.message);
        dispatch(userAuthenticated(false));
      }
  }

  const isAuthenticated = useSelector(store => store.user.authenticated);
  console.log(isAuthenticated);
  if(isAuthenticated){
    return <Navigate to={"/taskpage"}/>
  }

  return (
    <>
    <div className="bg-gray-700 w-full min-h-screen flex justify-center items-center flex-col rounded-xl">
      <div className="w-[400px] h-auto bg-orange-500 flex flex-col px-5 py-10 rounded-lg">
      <h2 className="text-3xl text-gray-800 text-center font-bold my-1">Login</h2>
        <label htmlFor="name">Email</label>
        <input type="text" placeholder="Enter your Email" className="pl-2 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="name">Password</label>
        <input type="text" placeholder="Enter your password" className="pl-2 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={submitHandler} className="pl-2 py-2 mt-5 border-2 border-black rounded-sm">Submit</button>
      </div>
    </div>
    <ToastContainer/>
  </>
  )
}

export default Login