import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import { removeUser, userAuthenticated } from "../utils/slices/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTask } from "../utils/slices/taskSlice";


const Header = () => {
  const dispatch = useDispatch();

  const [task,setTask] = useState([]);
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const fetchData = async() => {
      try {
        const {data} = await axios.get("http://localhost:3000/api/v1/task/mytask");
        setIsAuthenticated(true);
        dispatch(userAuthenticated(true));
        dispatch(addTask(data));
      } catch (error) {
        // toast.error(error.response.data.message);
        dispatch(userAuthenticated(false));
        setIsAuthenticated(false);
      }
  }

  const handleLogout = async(e) => {
      e.preventDefault();
      console.log("logout done");
      try {
        const {data} = await axios.get("http://localhost:3000/api/v1/user/logout");
        toast.success(data.message);
        console.log(data);
        dispatch(userAuthenticated(false));
        dispatch(removeUser());
        console.log("yes logout");
      } catch (error) {
        console.log("error",error);
      }
  }

  const autheticate = useSelector(store => store.user.authenticated);
  console.log(autheticate);
  if(!autheticate){
    console.log("yes");
    <Navigate to={"/"}/>
  }

  useEffect(() => {
    fetchData();
  },[isAuthenticated]);
  return (
    <>
    <form ></form>
    <div className="flex w-full bg-gray-500 justify-between px-16 h-14 items-center">
      <div className="text-white text-lg">TaskSystem</div>
      <div className="flex list-none gap-5 text-white text-lg">
        <li className="px-3 py-1">Home</li>
        <li className="px-3 py-1">Filter</li>
        <select name="cars" id="cars" className="bg-gray-500">
            <option value="volvo">Tasks</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        <li className="px-3 py-1">Profile</li>
        <button onClick={handleLogout} className="px-3 py-1 border-2 border-white rounded-md">Logout</button>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Header;
