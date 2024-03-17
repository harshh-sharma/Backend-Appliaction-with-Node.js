import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, userAuthenticated } from "../utils/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();


  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log("ava",avatar);
    const formData = new FormData;
    formData.append("avatar",avatar);
    formData.append("name",name);
    formData.append("email",email);
    formData.append("password",password);

    await axios.post("http://localhost:3000/api/v1/user/register",formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }).then((res) => {
      console.log("response",res);
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
        dispatch(addUser(res.data.user));
        dispatch(userAuthenticated(true));
        toast.success(res.data.message);
        // Navigate
    }).catch((err => {
      console.log("registering error",err);
      toast(err.response.data.message);
    }))
  }

  const isAuthenticated = useSelector((store) => store.user.authenticated);
  if(isAuthenticated){
    return <Navigate to={"/taskpage"} />
  }

  return (
    <>
    <div className="bg-gray-700 w-full min-h-screen flex justify-center items-center flex-col rounded-xl">
      <div className="w-[400px] h-auto bg-orange-500 flex flex-col px-5 py-10 rounded-lg">
      <h2 className="text-3xl text-gray-800 text-center font-bold my-1">Register</h2>
        <label htmlFor="avatar">Avatar</label>
        <input type="file" name="avatar" id="" className="" onChange={avatarHandler}  />
        <label htmlFor="name">Name</label>
        <input type="text" placeholder="Enter your name" className="pl-2 py-2" value={name} onChange={(e) => setName(e.target.value)}/>
        <label htmlFor="name">Email</label>
        <input type="text" placeholder="Enter your Email" className="pl-2 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="name">Password</label>
        <input type="text" placeholder="Enter your password" className="pl-2 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={submitHandler} className="pl-2 py-2 mt-5 border-2 border-black rounded-sm">Submit</button>
      </div>
    </div>
    <ToastContainer/>
  </>
  );
};

export default Register;

{
  /* <div className="w-[500px] h-[400px] bg-gray-500">
<form>
  
</form>
</div> */
}
