import React from 'react';
import { useSelector } from 'react-redux';
import {Link, Navigate} from "react-router-dom";

const AuthHeader = () => {
    const isAuthenticated = useSelector(store => store.user.authenticated);
    if(isAuthenticated){
        return <Navigate to={"/taskpage"} />
    }

  return (
    <div className='w-full h-14 flex justify-between px-10 gap-2 bg-gray-300 items-center'>
        <div>
            <h2 className='text-xl font-bold'>Task Manager</h2>
        </div>
        <div className='flex gap-2'>
            <Link to={"/register"}><button className='bg-gray-900 text-white cursor-pointer text-lg px-4 py-2 rounded-md'>Register</button></Link>
            <Link to={"/login"}><button className='bg-gray-900 text-white cursor-pointer text-lg px-4 py-2 rounded-md'>Login</button></Link>
        </div>
    </div>
  )
}

export default AuthHeader